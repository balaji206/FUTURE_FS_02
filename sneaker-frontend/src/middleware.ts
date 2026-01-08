import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('clearance_token')?.value;
  const role = request.cookies.get('user_role')?.value;
  const { pathname } = request.nextUrl;

  // 1. DYNAMIC REDIRECT FOR LOGGED-IN USERS
  // If a user tries to access ANY login page while already logged in
  const authPages = ['/login', '/signup', '/admin/login'];
  
  if (token && authPages.includes(pathname)) {
    // Prevent a Buyer from going to Admin Login or a Seller from going to Signup
    if (role === 'admin') return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    if (role === 'seller') return NextResponse.redirect(new URL('/profile/inventory', request.url));
    if (role === 'buyer') return NextResponse.redirect(new URL('/', request.url));
  }

  // 2. ALLOW GUESTS to see public pages only
  const publicPaths = ['/login', '/signup', '/admin/login', '/unauthorized'];
  if (!token && publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // 3. GLOBAL AUTH PROTECT: If no token, kick to standard login
  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 4. SECTOR CLEARANCE (Role-Based Access)

  // ADMIN LOCK: Only role 'admin' can access anything starting with /admin
  if (pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  // MERCHANT LOCK: Only role 'seller' can access inventory
  if (pathname.startsWith('/profile/inventory') && role !== 'seller') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  // OPERATIVE LOCK: Sellers cannot access Buyer-only sectors (Cart/Checkout)
  const buyerSectors = ['/cart', '/checkout'];
  if (buyerSectors.some(path => pathname.startsWith(path)) && role !== 'buyer') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/admin/login' || pathname === '/signin') {
    return NextResponse.next()
  }
  
  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const hasUserAuthCookie = request.cookies.has('rb_session')
  const hasAdminAuthCookie = request.cookies.has('admin_session')

  if (pathname.startsWith('/admin') && !hasAdminAuthCookie) {
    console.log('🔐 Admin has no admin_session cookie, redirecting to login')
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  if (pathname.startsWith('/dashboard') && !hasUserAuthCookie) {
    console.log('🔐 User has no rb_session cookie, redirecting to login')
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

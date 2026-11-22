import { NextRequest, NextResponse } from 'next/server';
import { VISITED_KEY } from '@/lib/constants';

// Returning visitors skip the welcome screen with a server redirect instead
// of loading the page and its JS first. The cookie is set by the welcome page.
export function middleware(request: NextRequest) {
  if (request.cookies.has(VISITED_KEY)) {
    return NextResponse.redirect(new URL('/products', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/',
};

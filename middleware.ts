// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {

    if( req.nextUrl.pathname.startsWith('/api/entries/')) {
        // Doing this just search for the substring '/api/entries/' and replaces it with a void string
        // The result of this is just the ID of the Entry
        const id = req.nextUrl.pathname.replace('/api/entries/', '');

        // This is a Regular Expression configured in order to validate the MongoID 
        const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

        // If is not a valid ID
        if( !checkMongoIDRegExp.test(id) ) {
            // Clone the complete url
            const url = req.nextUrl.clone();
            // Change the pathname
            url.pathname = '/api/bad-request'
            // Change the query parameters
            url.search = `?message=${ id } is not a valid MongoID`;
            // Rewrite the new url to a bad-request
            return NextResponse.rewrite(url)
        }
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    // matcher: '/about/:path*',
    matcher: ['/api/entries/:path*']
}
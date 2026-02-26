import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const token = request.cookies.get("token");

	if (token && request.nextUrl.pathname === "/login") {

		console.log("middleware rodou", "token:",token, "path:",request.nextUrl.pathname);
		return NextResponse.redirect(new URL("/", request.url));
	}
	console.log("middleware rodou", "token:",token, "path:",request.nextUrl.pathname);
	return NextResponse.next();
}

export const config = {
	matcher: ["/login", "/signup"],
};

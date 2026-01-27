import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Disable draft mode - POST only to prevent CSRF via GET requests
export async function POST(request: NextRequest) {
  // Verify request comes from same origin
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  // Allow if origin matches host, or if no origin (same-origin requests)
  if (origin && host && !origin.includes(host.split(":")[0])) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const draft = await draftMode();
  draft.disable();

  return NextResponse.json({ disabled: true });
}

// GET method not allowed for state-changing operations
export async function GET() {
  return NextResponse.json(
    { error: "Use POST method" },
    { status: 405 }
  );
}

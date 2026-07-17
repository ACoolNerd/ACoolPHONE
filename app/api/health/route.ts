import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "ACoolPHONE",
    version: "0.2.0",
    maturity: "foundation",
    timestamp: new Date().toISOString(),
  });
}

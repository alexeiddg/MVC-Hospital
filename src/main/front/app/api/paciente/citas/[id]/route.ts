import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const id = params.id;
    
    // Log for debugging
    console.log(`Fetching from: ${process.env.BACKEND_URL}/api/paciente/citas/${id}`);
    
    // Make sure BACKEND_URL is defined
    if (!process.env.BACKEND_URL) {
      throw new Error("BACKEND_URL is not defined in environment variables");
    }
    
    const res = await fetch(`${process.env.BACKEND_URL}/api/paciente/citas/${id}`);
    
    if (!res.ok) {
      throw new Error(`Backend returned status: ${res.status}`);
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("API route error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
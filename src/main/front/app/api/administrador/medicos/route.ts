// app/api/administrador/medicos/route.js
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log(`Making request to: ${process.env.BACKEND_URL}/api/administrador/medicos`);
    
    // Check if BACKEND_URL is defined
    if (!process.env.BACKEND_URL) {
      console.error("BACKEND_URL is not defined in environment variables");
      return NextResponse.json({ error: "Backend URL not configured" }, { status: 500 });
    }
    
    const res = await fetch(`${process.env.BACKEND_URL}/api/administrador/medicos`);
    
    // Log response status
    console.log(`Backend response status: ${res.status}`);
    
    if (!res.ok) {
      // Try to get error details
      let errorText = "";
      try {
        errorText = await res.text();
      } catch (e) {
        errorText = "Could not extract error message";
      }
      
      console.error(`Error from backend (${res.status}): ${errorText}`);
      return NextResponse.json({ 
        error: `Backend returned status: ${res.status}`, 
        details: errorText 
      }, { status: res.status });
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in medicos API route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
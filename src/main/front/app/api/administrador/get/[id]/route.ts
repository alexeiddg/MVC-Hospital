import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const id = params.id;
    
    const res = await fetch(`${process.env.BACKEND_URL}/api/administrador/get/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!res.ok) {
      throw new Error(`Error fetching administrator: ${res.status}`);
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in get administrador by id API route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
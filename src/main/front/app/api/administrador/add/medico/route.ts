import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    
    const res = await fetch(`${process.env.BACKEND_URL}/api/administrador/add/medico`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!res.ok) {
      throw new Error(`Error adding doctor: ${res.status}`);
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in add medico API route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
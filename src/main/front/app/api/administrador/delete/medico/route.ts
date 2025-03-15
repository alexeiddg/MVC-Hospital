import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const id = params.id;
    
    const res = await fetch(`${process.env.BACKEND_URL}/api/administrador/delete/medico/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!res.ok) {
      throw new Error(`Error deleting doctor: ${res.status}`);
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error in delete medico API route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
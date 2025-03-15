import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch(`${process.env.BACKEND_URL}/api/paciente/getall`);
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

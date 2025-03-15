import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await fetch(`${process.env.BACKEND_URL}/api/paciente/delete/${params.id}`, { method: "DELETE" });
        return NextResponse.json({ message: "Paciente deleted" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

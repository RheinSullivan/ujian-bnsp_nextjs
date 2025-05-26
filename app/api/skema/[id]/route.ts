import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();

    const updatedSkema = await prisma.skema.update({
      where: { Kd_skema: id },
      data: {
        Nm_skema: body.Nm_skema,
        Jenis: body.Jenis,
        Jml_unit: Number(body.Jml_unit),
      },
    });

    return NextResponse.json(updatedSkema);
  } catch (error) {
    return NextResponse.json({ error: "Gagal memperbarui skema" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const relatedData = await prisma.peserta.findFirst({
      where: { Kd_skema: id },
    });

    if (relatedData) {
      return NextResponse.json({ error: "Skema ini masih digunakan oleh peserta, tidak bisa dihapus." }, { status: 400 });
    }

    const deletedSkema = await prisma.skema.delete({
      where: { Kd_skema: id },
    });

    return NextResponse.json(deletedSkema);
  } catch (error) {
    return NextResponse.json({ error: "Gagal menghapus skema" }, { status: 500 });
  }
}

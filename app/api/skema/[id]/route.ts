import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
  const id = params.id;

  const body = await request.json();

  const skema = await prisma.skema.update({
    where: {
      Kd_skema: id,
    },
    data: {
      Nm_skema: body.Nm_skema,
      Jenis: body.Jenis,
      Jml_unit: Number(body.Jml_unit),
    },
  });
  return NextResponse.json(skema);
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  const id = params.id;

  const relatedDataCount = await prisma.peserta.count({
    where: {
      Kd_skema: id,
    },
  });

  if (relatedDataCount > 0) {
    return NextResponse.json({ error: "Skema ini masih digunakan oleh peserta, tidak bisa dihapus." }, { status: 400 });
  }

  const deletedSkema = await prisma.skema.delete({
    where: {
      Kd_skema: id,
    },
  });

  return NextResponse.json(deletedSkema);
};

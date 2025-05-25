import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async () => {
  const peserta = await prisma.peserta.findMany({
    include: { skema: true },
    orderBy: { Id_peserta: "asc" },
  });
  return NextResponse.json(peserta);
};

export const POST = async (request: Request) => {
  const body = await request.json();

  const peserta = await prisma.peserta.create({
    data: {
      Nm_peserta: body.Nm_peserta,
      Foto_peserta: body.Foto_peserta || null,
      Kd_skema: body.Kd_skema,
      Jekel: body.Jekel,
      Alamat: body.Alamat,
      No_hp: body.No_hp,
    },
  });
  return NextResponse.json(peserta, { status: 201 });
};

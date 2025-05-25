import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
  const body = await request.json();
  const peserta = await prisma.peserta.update({
    where: {
      Id_peserta: Number(params.id),
    },
    data: {
      Nm_peserta: body.Nm_peserta,
      Foto_peserta: body.Foto_peserta || null,
      Kd_skema: body.Kd_skema,
      Jekel: body.Jekel,
      Alamat: body.Alamat,
      No_hp: body.No_hp,
    },
  });
  return NextResponse.json(peserta);
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  const peserta = await prisma.peserta.delete({
    where: {
      Id_peserta: Number(params.id),
    },
  });
  return NextResponse.json(peserta);
};

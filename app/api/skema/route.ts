import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async () => {
  const skema = await prisma.skema.findMany({ orderBy: { Kd_skema: "asc" } });
  return NextResponse.json(skema);
};

export const POST = async (request: Request) => {
  const body = await request.json();

  const skema = await prisma.skema.create({
    data: {
      Kd_skema: body.Kd_skema,
      Nm_skema: body.Nm_skema,
      Jenis: body.Jenis,
      Jml_unit: Number(body.Jml_unit),
    },
  });
  return NextResponse.json(skema, { status: 201 });
};

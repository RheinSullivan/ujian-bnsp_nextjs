import { PrismaClient } from "@prisma/client";
import PesertaClient from "./PesertaClient";

const prisma = new PrismaClient();

const getPeserta = async (search?: string) => {
  const where = search
    ? {
        Nm_peserta: {
          contains: search.toLowerCase(),
        },
      }
    : {};

  return await prisma.peserta.findMany({
    where: {
      ...where,
    },
    include: { skema: true },
    orderBy: { Id_peserta: "asc" },
  });
};

const getSkema = async () => {
  return await prisma.skema.findMany({ orderBy: { Kd_skema: "asc" } });
};

const PesertaPage = async ({ searchParams }: { searchParams?: { n?: string } }) => {
  const peserta = await getPeserta(searchParams?.n);
  const skema = await getSkema();

  return <PesertaClient peserta={peserta} skema={skema} search={searchParams?.n || ""} />;
};

export default PesertaPage;

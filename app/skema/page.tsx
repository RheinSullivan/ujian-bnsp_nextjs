import { PrismaClient } from "@prisma/client";
import SkemaClient from "./SkemaClient";

const prisma = new PrismaClient();

const getSkema = async (search: string) => {
  try {
    return await prisma.skema.findMany({
      where: {
        OR: [{ Kd_skema: { contains: search } }, { Nm_skema: { contains: search } }, { Jenis: { contains: search } }],
      },
      orderBy: { Kd_skema: "asc" },
    });
  } catch (error) {
    console.error("Gagal mengambil data skema:", error);
    return [];
  }
};

export const dynamic = "force-dynamic";

// ✅ Gunakan props { searchParams }
const SkemaPage = async ({ searchParams }: { searchParams: { [key: string]: string } }) => {
  const search = searchParams.s ?? "";
  const skema = await getSkema(search);

  return <SkemaClient skema={skema} search={search} />;
};

export default SkemaPage;

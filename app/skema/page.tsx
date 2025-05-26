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

export default async function SkemaPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const search = Array.isArray(searchParams.s) ? searchParams.s[0] : searchParams.s || "";
  const skema = await getSkema(search);

  return <SkemaClient skema={skema} search={search} />;
}

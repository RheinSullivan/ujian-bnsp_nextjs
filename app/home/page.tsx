"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Peserta {
  Id_peserta: number;
  Nm_peserta: string;
  Jekel: string;
  No_hp: string;
  skema: { Nm_skema: string } | null;
}

export default function Home() {
  const [data, setData] = useState<Peserta[]>([]);
  const [query, setQuery] = useState("");

  const fetchData = async () => {
    const res = await fetch("/api/peserta");
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = data.filter((item) => item.Nm_peserta.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <input type="text" placeholder="Cari Nama Peserta..." className="input input-bordered w-full max-w-xs" onChange={(e) => setQuery(e.target.value)} />
        <Link href="/peserta/form">
          <button className="btn btn-primary ml-4">Form Pendaftaran</button>
        </Link>
      </div>
      <table className="table w-full text-sm">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Skema</th>
            <th>Jenis Kelamin</th>
            <th>No HP</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p, i) => (
            <tr key={p.Id_peserta}>
              <td>{i + 1}</td>
              <td>{p.Nm_peserta}</td>
              <td>{p.skema?.Nm_skema ?? "-"}</td>
              <td>{p.Jekel}</td>
              <td>{p.No_hp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

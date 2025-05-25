"use client";
import { useState, SyntheticEvent, useRef } from "react";
import type { Peserta, Skema } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoMdCreate, IoMdClose } from "react-icons/io";

interface UpdatePesertaProps {
  peserta: Peserta & { skema?: Skema };
  skema: Skema[];
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const UpdatePeserta = ({ peserta, skema, showModal, setShowModal }: UpdatePesertaProps) => {
  const [Nm_peserta, setNmPeserta] = useState(peserta.Nm_peserta);
  const [Foto_peserta, setFotoPeserta] = useState<File | null>(null);
  const [Kd_skema, setKdSkema] = useState(peserta.Kd_skema);
  const [Jekel, setJekel] = useState(peserta.Jekel);
  const [Alamat, setAlamat] = useState(peserta.Alamat);
  const [No_hp, setNoHp] = useState(peserta.No_hp);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let fotoFileName = peserta.Foto_peserta;

    if (Foto_peserta) {
      const formData = new FormData();
      formData.append("file", Foto_peserta);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        fotoFileName = data.filename;
      } else {
        alert("Gagal upload foto");
        setIsLoading(false);
        return;
      }
    }

    try {
      await axios.patch(`/api/peserta/${peserta.Id_peserta}`, {
        Nm_peserta,
        Foto_peserta: fotoFileName,
        Kd_skema,
        Jekel,
        Alamat,
        No_hp,
      });
      alert("Peserta berhasil diupdate!");
      router.refresh();
      setShowModal(false);
    } catch (error) {
      alert("Gagal mengupdate peserta");
    } finally {
      setIsLoading(false);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[3px] flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative flex flex-col gap-5">
        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 p-1 rounded-full text-white bg-red-600 text-xl">
          <IoMdClose />
        </button>

        <h2 className="text-xl font-semibold mb-5">Edit Data Peserta</h2>

        <form ref={formRef} onSubmit={onSubmit} className="grid grid-cols-2 gap-8 items-center">
          <input type="text" value={Nm_peserta} onChange={(e) => setNmPeserta(e.target.value)} required placeholder="Nama Lengkap" className="input input-bordered w-full bg-gray-200 rounded-md p-2" />
          <input type="file" accept="image/*" onChange={(e) => setFotoPeserta(e.target.files ? e.target.files[0] : null)} className="file-input file-input-bordered w-full" />
          <select value={Kd_skema} onChange={(e) => setKdSkema(e.target.value)} required className="select select-bordered w-full bg-gray-200 p-2 rounded-md">
            <option value="">Pilih Skema</option>
            {skema.map((s) => (
              <option key={s.Kd_skema} value={s.Kd_skema}>
                {s.Nm_skema}
              </option>
            ))}
          </select>
          <select value={Jekel} onChange={(e) => setJekel(e.target.value)} required className="select select-bordered w-full bg-gray-200 p-2 rounded-md">
            <option value="">Jenis Kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
          <input type="text" value={Alamat} onChange={(e) => setAlamat(e.target.value)} required placeholder="Alamat" className="input input-bordered w-full bg-gray-200 rounded-md p-2" />
          <input type="text" value={No_hp} onChange={(e) => setNoHp(e.target.value)} required placeholder="No HP" className="input input-bordered w-full bg-gray-200 rounded-md p-2" />
        </form>

        <div className="flex justify-center mt-5">
          <button onClick={() => formRef.current?.requestSubmit()} disabled={isLoading} className="bg-yellow-500 px-4 py-2 rounded-md text-white hover:bg-yellow-600 disabled:opacity-50">
            {isLoading ? "Menyimpan..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default UpdatePeserta;

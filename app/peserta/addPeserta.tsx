"use client";
import { useState, SyntheticEvent, useRef } from "react";
import type { Skema } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";

interface AddPesertaProps {
  skema: Skema[];
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const AddPeserta = ({ skema, showModal, setShowModal }: AddPesertaProps) => {
  const [Nm_peserta, setNmPeserta] = useState("");
  const [Foto_peserta, setFotoPeserta] = useState<File | null>(null);
  const [Kd_skema, setKdSkema] = useState("");
  const [Jekel, setJekel] = useState("");
  const [Alamat, setAlamat] = useState("");
  const [No_hp, setNoHp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let fotoFileName = null;

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
      await axios.post("/api/peserta", {
        Nm_peserta,
        Foto_peserta: fotoFileName,
        Kd_skema,
        Jekel,
        Alamat,
        No_hp,
      });

      alert("Peserta berhasil ditambahkan!");
      router.refresh();
      setShowModal(false);

      setNmPeserta("");
      setFotoPeserta(null);
      setKdSkema("");
      setJekel("");
      setAlamat("");
      setNoHp("");
    } catch (error) {
      alert("Gagal menambah peserta");
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

        <h2 className="text-xl font-semibold mb-5">Tambah Peserta</h2>

        {/* FORM */}
        <form ref={formRef} onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-8 items-center">
          <input type="text" placeholder="Nama Lengkap" value={Nm_peserta} onChange={(e) => setNmPeserta(e.target.value)} required className="input input-bordered w-full bg-gray-200 rounded-md p-2" />
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
          <input type="text" placeholder="Alamat" value={Alamat} onChange={(e) => setAlamat(e.target.value)} required className="input input-bordered w-full bg-gray-200 rounded-md p-2" />
          <input type="text" placeholder="No HP" value={No_hp} onChange={(e) => setNoHp(e.target.value)} required className="input input-bordered w-full bg-gray-200 rounded-md p-2" />
        </form>

        {/* BUTTON */}
        <div className="flex justify-center mt-5">
          <button onClick={() => formRef.current?.requestSubmit()} disabled={isLoading} className="bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-600 disabled:opacity-50">
            {isLoading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPeserta;

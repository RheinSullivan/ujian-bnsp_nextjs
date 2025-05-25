"use client";
import { useState, useRef, SyntheticEvent } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { useRouter } from "next/navigation";

interface AddSkemaProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const AddSkema = ({ showModal, setShowModal }: AddSkemaProps) => {
  const [Kd_skema, setKdSkema] = useState("");
  const [Nm_skema, setNmSkema] = useState("");
  const [Jenis, setJenis] = useState("");
  const [Jml_unit, setJmlUnit] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post("/api/skema", {
        Kd_skema,
        Nm_skema,
        Jenis,
        Jml_unit,
      });

      alert("Skema berhasil ditambahkan!");
      router.refresh();
      setShowModal(false);

      setKdSkema("");
      setNmSkema("");
      setJenis("");
      setJmlUnit(0);
    } catch (error) {
      alert("Gagal menambah skema");
    } finally {
      setIsLoading(false);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[3px] flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative flex flex-col gap-5">
        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 p-1 rounded-full text-white bg-red-600 text-xl">
          <IoMdClose />
        </button>

        <h2 className="text-xl font-semibold mb-5">Tambah Skema</h2>

        {/* FORM */}
        <form ref={formRef} onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-6">
          <input type="text" placeholder="Kode Skema" value={Kd_skema} onChange={(e) => setKdSkema(e.target.value)} required className="input input-bordered w-full bg-gray-200 rounded-md p-2" />
          <input type="text" placeholder="Nama Skema" value={Nm_skema} onChange={(e) => setNmSkema(e.target.value)} required className="input input-bordered w-full bg-gray-200 rounded-md p-2" />
          <input type="text" placeholder="Jenis" value={Jenis} onChange={(e) => setJenis(e.target.value)} required className="input input-bordered w-full bg-gray-200 rounded-md p-2" />
          <input type="number" placeholder="Jumlah Unit" value={Jml_unit} onChange={(e) => setJmlUnit(Number(e.target.value))} required className="input input-bordered w-full bg-gray-100 rounded-md p-2" />
        </form>

        {/* BUTTON */}
        <div className="flex justify-center mt-4">
          <button onClick={() => formRef.current?.requestSubmit()} disabled={isLoading} className="bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-600 disabled:opacity-50">
            {isLoading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSkema;

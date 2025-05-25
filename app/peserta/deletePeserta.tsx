"use client";
import { useState } from "react";
import type { Peserta } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";

interface DeletePesertaProps {
  peserta: Peserta;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const DeletePeserta = ({ peserta, showModal, setShowModal }: DeletePesertaProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/peserta/${peserta.Id_peserta}`);
      alert("Peserta berhasil dihapus!");
      router.refresh();
      setShowModal(false);
    } catch (error) {
      alert("Gagal menghapus peserta");
    } finally {
      setIsLoading(false);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[3px] flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative flex flex-col gap-5">
        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 p-1 rounded-full text-white bg-red-600 text-xl">
          <IoMdClose />
        </button>

        <h2 className="text-xl font-semibold text-center">Yakin ingin menghapus peserta ini?</h2>

        <div className="flex justify-center gap-4 mt-4">
          <button onClick={handleDelete} disabled={isLoading} className="bg-red-600 px-4 py-2 rounded-md text-white hover:bg-red-700 disabled:opacity-50">
            {isLoading ? "Menghapus..." : "Hapus"}
          </button>
          <button onClick={() => setShowModal(false)} className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePeserta;

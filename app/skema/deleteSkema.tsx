"use client";
import { useState } from "react";
import type { Skema } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";

interface DeleteSkemaProps {
  skema: Skema;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const DeleteSkema = ({ skema, showModal, setShowModal }: DeleteSkemaProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`/api/skema/${skema.Kd_skema}`);
      if (response.data.error) {
        alert(response.data.error);
      } else {
        alert("Skema berhasil dihapus!");
        router.refresh();
        setShowModal(false);
      }
    } catch (error: any) {
      alert("Gagal menghapus skema: " + (error.response?.data?.error || error.message));
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

        <h2 className="text-xl font-semibold text-center">Yakin ingin menghapus skema ini?</h2>

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

export default DeleteSkema;

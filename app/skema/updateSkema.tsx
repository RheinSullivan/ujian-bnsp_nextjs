// UpdateSkema.tsx
"use client";
import { useRef, useState } from "react";
import type { Skema } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";

interface UpdateSkemaProps {
  skema: Skema;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const UpdateSkema = ({ skema, showModal, setShowModal }: UpdateSkemaProps) => {
  const [form, setForm] = useState(skema);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await axios.patch(`/api/skema/${skema.Kd_skema}`, form);
      router.refresh();
      setShowModal(false);
    } catch (err) {
      console.error("Gagal update skema:", err);
      setError("Gagal menyimpan perubahan. Silakan coba lagi.");
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

        <h2 className="text-xl font-semibold mb-5">Edit Data Skema</h2>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded-md">{error}</div>}

        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="grid grid-cols-2 gap-8 items-center"
        >
          <input value={form.Nm_skema} onChange={(e) => setForm({ ...form, Nm_skema: e.target.value })} className="input input-bordered w-full bg-gray-200 rounded-md p-2" />
          <input value={form.Jenis} onChange={(e) => setForm({ ...form, Jenis: e.target.value })} className="input input-bordered w-full bg-gray-200 rounded-md p-2" />
          <input type="number" value={form.Jml_unit} onChange={(e) => setForm({ ...form, Jml_unit: Number(e.target.value) })} className="input input-bordered w-full bg-gray-200 rounded-md p-2" />
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

export default UpdateSkema;

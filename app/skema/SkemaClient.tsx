"use client";
import Link from "next/link";
import { IoPeople } from "react-icons/io5";
import { MdLibraryBooks } from "react-icons/md";
import AddSkema from "./addSkema";
import UpdateSkema from "./updateSkema";
import DeleteSkema from "./deleteSkema";
import { useState } from "react";
import { IoMdCreate, IoMdSearch, IoMdTrash } from "react-icons/io";
import { HiViewGridAdd } from "react-icons/hi";
import { Skema } from "@prisma/client";
import { useRouter } from "next/navigation";

const tableHeaders = [
  { label: "No", className: "text-center px-5 py-2" },
  { label: "Kode", className: "text-left px-5 py-2" },
  { label: "Nama", className: "text-left px-5 py-2" },
  { label: "Jenis", className: "text-left px-5 py-2" },
  { label: "Jumlah Unit", className: "text-center px-5 py-2" },
  { label: "Aksi", className: "text-center px-5 py-2 w-32" },
];

const SkemaClient = ({ skema, search }: { skema: Skema[]; search: string }) => {
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedSkema, setSelectedSkema] = useState<any | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [skemaToDelete, setSkemaToDelete] = useState<any | null>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("s") as string;
    router.replace(`/skema?s=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="p-10">
      <div className="flex flex-col">
        <nav className="mb-10 flex justify-between items-center">
          <div className="flex font-bold italic">
            <figcaption>
              <h1 className="text-3xl text-[#0077cc]">Ujian BNSP</h1>
              <p className="text-gray-500 text-sm">Moh. Rifki Ramadhan (UMC)</p>
            </figcaption>
          </div>
          <div className="flex items-center gap-10">
            <Link href="/peserta" className="flex items-center bg-sky-700 px-4 py-2 rounded-md text-white hover:scale-110 gap-3 transition-all duration-300">
              <IoPeople />
              Peserta
            </Link>
            <Link href="/skema" className="flex items-center bg-pink-700 px-4 py-2 rounded-md text-white hover:scale-110 gap-3 transition-all duration-300">
              <MdLibraryBooks />
              Skema
            </Link>
          </div>
        </nav>

        <div className="mb-7 flex justify-between items-center">
          <form onSubmit={handleSearch} className="flex justify-between gap-4 w-full max-w-xl">
            <input type="text" name="s" placeholder="Cari Daftar Skema" className="input input-bordered bg-gray-100 rounded-md py-2 px-4 w-full" defaultValue={search} />
            <button type="submit" className="py-2 px-4 bg-sky-600 rounded-md flex justify-between gap-2 items-center text-white">
              <IoMdSearch />
              Cari
            </button>
          </form>
          <button onClick={() => setShowAddModal(true)} className="bg-green-600 text-white px-4 py-2 rounded-md hover:scale-110 flex justify-between gap-2 items-center transition-all duration-300">
            <HiViewGridAdd />
            Tambah Skema
          </button>
        </div>

        {/* Modal CRUD */}
        <AddSkema showModal={showAddModal} setShowModal={setShowAddModal} />
        {selectedSkema && <UpdateSkema skema={selectedSkema} showModal={showUpdateModal} setShowModal={setShowUpdateModal} />}
        {skemaToDelete && <DeleteSkema skema={skemaToDelete} showModal={showDeleteModal} setShowModal={setShowDeleteModal} />}

        <table className="table w-full text-gray-800 rounded-md overflow-hidden">
          <thead>
            <tr className="text-white uppercase bg-gray-600 rounded-t-md">
              {tableHeaders.map((header, index) => (
                <th key={index} className={header.className}>
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {skema.map((s, i) => (
              <tr key={s.Kd_skema} className="odd:bg-gray-200 even:bg-gray-300">
                <td className="px-5 py-2 text-center">{i + 1}.</td>
                <td className="px-5 py-2">{s.Kd_skema}</td>
                <td className="px-5 py-2">{s.Nm_skema}</td>
                <td className="px-5 py-2">{s.Jenis}</td>
                <td className="px-5 py-2 text-center">{s.Jml_unit}</td>
                <td className="px-5 py-2 text-center">
                  <div className="flex justify-center items-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedSkema(s);
                        setShowUpdateModal(true);
                      }}
                      className="px-3 py-1 flex items-center text-white bg-yellow-500 hover:scale-110 transition-all duration-300 rounded-md gap-1"
                    >
                      <IoMdCreate /> Edit
                    </button>
                    <button
                      onClick={() => {
                        setSkemaToDelete(s);
                        setShowDeleteModal(true);
                      }}
                      className="px-3 py-1 flex items-center hover:scale-110  transition-all duration-300 text-white bg-red-500 rounded-md gap-1"
                    >
                      <IoMdTrash /> Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkemaClient;

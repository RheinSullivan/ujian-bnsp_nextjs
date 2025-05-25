"use client";
import Link from "next/link";
import AddPeserta from "./addPeserta";
import UpdatePeserta from "./updatePeserta";
import DeletePeserta from "./deletePeserta";
import { IoPeople } from "react-icons/io5";
import { MdLibraryBooks } from "react-icons/md";
import { IoMdCreate, IoMdPersonAdd, IoMdSearch, IoMdTrash } from "react-icons/io";
import { useState } from "react";

const tableHeaders = [
  { label: "No", className: "text-center w-10" },
  { label: "Nama Peserta", className: "text-left px-5" },
  { label: "Skema", className: "text-left" },
  { label: "Jekel", className: "text-center" },
  { label: "Alamat", className: "text-left" },
  { label: "No HP", className: "text-left" },
  { label: "Aksi", className: "text-center w-32" },
];

const PesertaClient = ({ peserta, skema, search }: { peserta: any[]; skema: any[]; search: string }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPeserta, setEditingPeserta] = useState<any | null>(null);
  const [deletingPeserta, setDeletingPeserta] = useState<any | null>(null);

  return (
    <div className="flex flex-col">
      {/* Navbar dan form pencarian */}
      <nav className="mb-10 flex justify-between items-center">
        <div className="flex font-bold italic">
          <figcaption>
            <h1 className="text-3xl text-[#0077cc]">Pelatian BNSP</h1>
            <p className="text-gray-300 text-sm">Badan Nasional Sertifikasi Profesi</p>
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
        <form method="GET" action="/peserta" className="flex justify-between gap-4 w-full max-w-xl">
          <input type="text" name="n" placeholder="Cari Nama Peserta" className="input input-bordered bg-gray-100 rounded-md py-2 px-4 w-full" defaultValue={search} />
          <button type="submit" className="py-2 px-4 bg-sky-600 rounded-md flex justify-between gap-2 items-center text-white">
            <IoMdSearch />
            Cari
          </button>
        </form>
        <button onClick={() => setShowAddModal(true)} className="px-4 py-2 rounded-md bg-green-600 flex justify-between gap-2 text-white hover:scale-110 items-center transition-all duration-300">
          <IoMdPersonAdd /> Tambah Peserta
        </button>
      </div>

      {/* Modal Tambah Peserta */}
      <AddPeserta skema={skema} showModal={showAddModal} setShowModal={setShowAddModal} />

      <table className="table w-full text-gray-800 rounded-md overflow-hidden">
        <thead>
          <tr className="text-white uppercase bg-gray-600">
            {tableHeaders.map((header, index) => (
              <th key={index} className={`py-2 px-5 ${header.className}`}>
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {peserta.map((p, i) => (
            <tr key={p.Id_peserta} className="odd:bg-gray-200 even:bg-gray-300">
              <td className="text-center px-5 py-2">{i + 1}.</td>
              <td className="flex items-center gap-3 px-5 py-2">
                {p.Foto_peserta ? <img src={`/uploads/${p.Foto_peserta}`} alt={p.Nm_peserta} className="w-12 h-12 object-cover rounded" /> : <span>-</span>}
                {p.Nm_peserta}
              </td>
              <td className="py-2 px-5">{p.skema?.Nm_skema}</td>
              <td className="text-center px-5 py-2">{p.Jekel}</td>
              <td className="py-2 px-5">{p.Alamat}</td>
              <td className="py-2 px-5">{p.No_hp}</td>
              <td className="py-2 px-5 text-center">
                <div className="flex justify-center items-center gap-3">
                  <button onClick={() => setEditingPeserta(p)} className="px-3 py-1 flex items-center text-white bg-yellow-500 hover:scale-110  transition-all duration-300 rounded-md gap-1">
                    <IoMdCreate /> Edit
                  </button>
                  <button onClick={() => setDeletingPeserta(p)} className="px-3 py-1 flex items-center hover:scale-110  transition-all duration-300 text-white bg-red-500 rounded-md gap-1">
                    <IoMdTrash /> Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Edit Peserta */}
      {editingPeserta && (
        <UpdatePeserta
          peserta={editingPeserta}
          skema={skema}
          showModal={!!editingPeserta}
          setShowModal={(val) => {
            if (!val) setEditingPeserta(null);
          }}
        />
      )}

      {/* Modal Delete Peserta */}
      {deletingPeserta && (
        <DeletePeserta
          peserta={deletingPeserta}
          showModal={!!deletingPeserta}
          setShowModal={(val) => {
            if (!val) setDeletingPeserta(null);
          }}
        />
      )}
    </div>
  );
};

export default PesertaClient;

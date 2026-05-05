import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";
import { MdAdd, MdCheck, MdClose, MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import {
  useCreateBrandMutation,
  useDeleteBrandMutation,
  useGetBrandsQuery,
  useUpdateBrandMutation,
} from "../../../features/api/apiSlice";
const BrandList = () => {
  const { data: brands, isLoading, isError } = useGetBrandsQuery();
  const [createBrand] = useCreateBrandMutation();
  const [updateBrand] = useUpdateBrandMutation();
  const [deleteBrand] = useDeleteBrandMutation();

const [isModalOpen, setIsModalOpen] = useState(false);
const [editingBrand, setEditingBrand] = useState(null);
const [formData, setFormData] = useState({ name: "" });

const handleOpenModal = (brand = null) => {
  if (brand) {
    setEditingBrand(brand);
    setFormData({ name: brand.name });
  } else {
    setEditingBrand(null);
    setFormData({ name: "" });
  }
  setIsModalOpen(true);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (editingBrand) {
      await updateBrand({ id: editingBrand.id, ...formData }).unwrap();
      toast.success("Brand updated successfully");
    } else {
      await createBrand(formData).unwrap();
      toast.success("Brand created successfully");
    }
    setIsModalOpen(false);
  } catch (err) {
    toast.error(err?.data?.message || "Something went wrong");
  }
};

const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this brand?")) {
    try {
      await deleteBrand(id).unwrap();
      toast.success("Brand deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete brand");
    }
  }
};

if (isLoading) {
  return (
    <div className="flex items-center justify-center h-[400px]">
      <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

return (
  <div className="space-y-8 font-['Plus_Jakarta_Sans'] animate-fadeIn">
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-8 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-gray-50/50">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            Brands
          </h2>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Manage your product brand partners
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg active:scale-95"
        >
          <MdAdd size={24} /> Add New Brand
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-indigo-600">
            <tr className="text-white text-[11px] uppercase font-black tracking-[0.2em] border-b border-gray-50">
              <th className="px-10 py-6">Brand Identity</th>
              <th className="px-10 py-6">Intelligence Statistics</th>
              <th className="px-10 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <AnimatePresence>
              {brands?.map((brand, idx) => (
                <motion.tr
                  key={brand.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-gray-50/50 transition-all duration-300"
                >
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner border border-indigo-100/50">
                        {brand.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {brand.name}
                        </p>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                          Brand Partner
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[11px] font-black rounded-full border border-emerald-100 uppercase tracking-wide">
                      {brand._count?.products || 0} Products
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => handleOpenModal(brand)}
                        className="p-3 text-indigo-600 bg-indigo-50/50 hover:bg-indigo-600 hover:text-white rounded-2xl transition-all border border-indigo-100 shadow-sm"
                        title="Edit Brand"
                      >
                        <MdEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(brand.id)}
                        className="p-3 text-rose-600 bg-rose-50/50 hover:bg-rose-600 hover:text-white rounded-2xl transition-all border border-rose-100 shadow-sm"
                        title="Delete Brand"
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
            {(!brands || brands.length === 0) && (
              <tr>
                <td colSpan="3" className="px-10 py-24 text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-gray-200">
                    <MdInventory size={40} className="opacity-20" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900">
                    No Brands Found
                  </h3>
                  <p className="text-gray-400 font-bold mt-1">
                    Start by adding your first brand partner
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

    {/* Modal */}
    {isModalOpen &&
      createPortal(
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-[3rem] w-full max-w-md overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)] border border-gray-100/50"
            >
              <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                <div>
                  <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.25em] mb-1">
                    Brand Architecture
                  </p>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tighter">
                    {editingBrand ? "Modify Entity" : "Create Brand"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-12 h-12 flex items-center justify-center bg-white hover:bg-rose-50 text-gray-400 hover:text-rose-500 rounded-2xl transition-all shadow-sm border border-gray-100 active:scale-90"
                >
                  <MdClose size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-12 space-y-10">
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] ml-1">
                    Brand Name
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Samsung, Apple, Sony..."
                      required
                      autoFocus
                      className="w-full px-8 py-5 rounded-[1.5rem] border-none bg-gray-50 focus:bg-white ring-1 ring-gray-100 focus:ring-4 focus:ring-indigo-600/10 transition-all text-base font-black text-gray-900 placeholder:text-gray-300 shadow-inner"
                    />
                  </div>
                </div>
                <div className="pt-2 flex gap-5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-8 py-5 rounded-[1.5rem] font-black text-gray-400 hover:bg-gray-50 transition-all uppercase tracking-widest text-[10px]"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 text-white px-8 py-5 rounded-[1.5rem] font-black flex items-center justify-center gap-3 hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-200 transition-all active:scale-95 uppercase tracking-[0.2em] text-[10px]"
                  >
                    <MdCheck size={20} />{" "}
                    {editingBrand ? "Update" : "Establish"}
                  </button>
                </div>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>,
        document.body,
      )}
  </div>
  );
};

export default BrandList;

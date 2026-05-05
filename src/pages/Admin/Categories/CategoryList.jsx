import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";
import { MdAdd, MdCheck, MdClose, MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../../features/api/apiSlice";

const CategoryList = () => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "" });

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name });
    } else {
      setEditingCategory(null);
      setFormData({ name: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await updateCategory({ id: editingCategory.id, ...formData }).unwrap();
        toast.success("Category updated successfully");
      } else {
        await createCategory(formData).unwrap();
        toast.success("Category created successfully");
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id).unwrap();
        toast.success("Category deleted successfully");
      } catch (err) {
        toast.error(err?.data?.message || "Failed to delete category");
      }
    }
  };

  if (isLoading)
    return <div className="p-10 text-center">Loading categories...</div>;
  if (isError)
    return (
      <div className="p-10 text-center text-red-500">
        Error loading categories.
      </div>
    );

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Categories</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your product classifications
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg active:scale-95"
        >
          <MdAdd size={20} /> Add New Category
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-indigo-600">
            <tr className="text-white text-[11px] font-black uppercase tracking-[0.2em] border-b border-gray-100">
              <th className="px-10 py-6">Category Identity</th>
              <th className="px-10 py-6">Reference Slug</th>
              <th className="px-10 py-6">Intelligence Count</th>
              <th className="px-10 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {categories?.map((category) => (
              <tr
                key={category.id}
                className="group hover:bg-gray-50 transition-all duration-300"
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-lg">
                      {category.name.charAt(0)}
                    </div>
                    <span className="font-bold text-gray-800 group-hover:text-black transition-colors">
                      {category.name}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                    {category.slug}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-100">
                    {category._count?.products || 0} Products
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-2 transition-all">
                    <button
                      onClick={() => handleOpenModal(category)}
                      className="p-2.5 text-indigo-600 bg-indigo-50/50 hover:bg-indigo-600 hover:text-white rounded-xl transition-all border border-indigo-100 shadow-sm"
                      title="Edit Category"
                    >
                      <MdEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2.5 text-rose-600 bg-rose-50/50 hover:bg-rose-600 hover:text-white rounded-xl transition-all border border-rose-100 shadow-sm"
                      title="Delete Category"
                    >
                      <MdDelete size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {(!categories || categories.length === 0) && (
              <tr>
                <td
                  colSpan="4"
                  className="px-8 py-20 text-center text-gray-400 font-medium"
                >
                  No categories found. Start by creating one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modern Modal */}
      {isModalOpen && createPortal(
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
                    Taxonomy Architecture
                  </p>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tighter">
                    {editingCategory ? "Modify Entity" : "Create Category"}
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
                    Category Name
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Electronics, Fashion..."
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
                    <MdCheck size={20} /> {editingCategory ? "Update" : "Establish"}
                  </button>
                </div>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>,
        document.body
      )}
    </div>
  );
};

export default CategoryList;

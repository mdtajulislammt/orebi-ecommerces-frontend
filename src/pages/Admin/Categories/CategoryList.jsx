import React, { useState } from 'react';
import { MdEdit, MdDelete, MdAdd, MdClose, MdCheck } from 'react-icons/md';
import { 
  useGetCategoriesQuery, 
  useCreateCategoryMutation, 
  useUpdateCategoryMutation, 
  useDeleteCategoryMutation 
} from '../../../features/api/apiSlice';
import { toast } from 'react-toastify';

const CategoryList = () => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '' });

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name });
    } else {
      setEditingCategory(null);
      setFormData({ name: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await updateCategory({ id: editingCategory.id, ...formData }).unwrap();
        toast.success('Category updated successfully');
      } else {
        await createCategory(formData).unwrap();
        toast.success('Category created successfully');
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err?.data?.message || 'Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id).unwrap();
        toast.success('Category deleted successfully');
      } catch (err) {
        toast.error(err?.data?.message || 'Failed to delete category');
      }
    }
  };

  if (isLoading) return <div className="p-10 text-center">Loading categories...</div>;
  if (isError) return <div className="p-10 text-center text-red-500">Error loading categories.</div>;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Categories</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your product classifications</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg active:scale-95"
        >
          <MdAdd size={20} /> Add New Category
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-xs uppercase tracking-widest border-b border-gray-100">
              <th className="px-8 py-5 font-bold">Category Name</th>
              <th className="px-8 py-5 font-bold">Slug</th>
              <th className="px-8 py-5 font-bold">Products</th>
              <th className="px-8 py-5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {categories?.map((category) => (
              <tr key={category.id} className="group hover:bg-gray-50 transition-all duration-300">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-lg">
                      {category.name.charAt(0)}
                    </div>
                    <span className="font-bold text-gray-800 group-hover:text-black transition-colors">{category.name}</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded-md">{category.slug}</span>
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
                <td colSpan="4" className="px-8 py-20 text-center text-gray-400 font-medium">
                  No categories found. Start by creating one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modern Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-black text-gray-900">
                {editingCategory ? 'Edit Category' : 'Create New Category'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-all text-gray-500"
              >
                <MdClose size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Category Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Electronics, Fashion..."
                  required
                  autoFocus
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-black focus:outline-none transition-all bg-gray-50/50 focus:bg-white text-lg font-medium"
                />
              </div>
              <div className="pt-4 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-black text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-xl active:scale-95"
                >
                  <MdCheck size={20} /> {editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;

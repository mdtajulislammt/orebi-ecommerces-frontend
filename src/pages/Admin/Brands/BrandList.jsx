import React, { useState } from 'react';
import { MdEdit, MdDelete, MdAdd, MdClose, MdCheck } from 'react-icons/md';
import { 
  useGetBrandsQuery, 
  useCreateBrandMutation, 
  useUpdateBrandMutation, 
  useDeleteBrandMutation 
} from '../../../features/api/apiSlice';
import { toast } from 'react-toastify';

const BrandList = () => {
  const { data: brands, isLoading, isError } = useGetBrandsQuery();
  const [createBrand] = useCreateBrandMutation();
  const [updateBrand] = useUpdateBrandMutation();
  const [deleteBrand] = useDeleteBrandMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [formData, setFormData] = useState({ name: '' });

  const handleOpenModal = (brand = null) => {
    if (brand) {
      setEditingBrand(brand);
      setFormData({ name: brand.name });
    } else {
      setEditingBrand(null);
      setFormData({ name: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBrand) {
        await updateBrand({ id: editingBrand.id, ...formData }).unwrap();
        toast.success('Brand updated successfully');
      } else {
        await createBrand(formData).unwrap();
        toast.success('Brand created successfully');
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err?.data?.message || 'Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      try {
        await deleteBrand(id).unwrap();
        toast.success('Brand deleted successfully');
      } catch (err) {
        toast.error(err?.data?.message || 'Failed to delete brand');
      }
    }
  };

  if (isLoading) return <div className="p-10 text-center">Loading brands...</div>;
  if (isError) return <div className="p-10 text-center text-red-500">Error loading brands.</div>;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Brands</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your product brands</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg active:scale-95"
        >
          <MdAdd size={20} /> Add New Brand
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-xs uppercase tracking-widest border-b border-gray-100">
              <th className="px-8 py-5 font-bold">Brand Logo</th>
              <th className="px-8 py-5 font-bold">Brand Name</th>
              <th className="px-8 py-5 font-bold">Products</th>
              <th className="px-8 py-5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {brands?.map((brand) => (
              <tr key={brand.id} className="group hover:bg-gray-50 transition-all duration-300">
                <td className="px-8 py-5">
                  <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center font-black text-xl border border-gray-200 group-hover:bg-white transition-all">
                    {brand.name.charAt(0)}
                  </div>
                </td>
                <td className="px-8 py-5">
                   <div className="flex flex-col">
                      <span className="font-bold text-gray-800 group-hover:text-black transition-colors">{brand.name}</span>
                      <span className="text-[10px] text-gray-400 font-mono">ID: {brand.id}</span>
                   </div>
                </td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full border border-blue-100">
                    {brand._count?.products || 0} Products
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button 
                      onClick={() => handleOpenModal(brand)}
                      className="p-2.5 text-yellow-600 hover:bg-yellow-50 rounded-xl transition-all border border-transparent hover:border-yellow-100"
                      title="Edit Brand"
                    >
                      <MdEdit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(brand.id)}
                      className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                      title="Delete Brand"
                    >
                      <MdDelete size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {(!brands || brands.length === 0) && (
              <tr>
                <td colSpan="4" className="px-8 py-20 text-center text-gray-400 font-medium">
                  No brands found. Add one to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modern Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-black text-gray-900">
                {editingBrand ? 'Edit Brand' : 'Create New Brand'}
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
                <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Brand Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Apple, Samsung, Nike..."
                  required
                  autoFocus
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-black focus:outline-none transition-all bg-gray-50/50 focus:bg-white text-lg font-medium shadow-inner"
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
                  <MdCheck size={20} /> {editingBrand ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandList;

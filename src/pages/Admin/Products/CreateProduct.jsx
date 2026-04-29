import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdSave } from 'react-icons/md';

const CreateProduct = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-black transition-all"
        >
          <MdArrowBack /> Back to List
        </button>
        <h2 className="text-2xl font-bold">Create New Product</h2>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Product Name</label>
              <input 
                type="text" 
                placeholder="Enter product name"
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Category</label>
              <select className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5">
                <option>Select Category</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home & Garden</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Price ($)</label>
              <input 
                type="number" 
                placeholder="0.00"
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Stock Quantity</label>
              <input 
                type="number" 
                placeholder="0"
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Brand</label>
              <select className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5">
                <option>Select Brand</option>
                <option>Apple</option>
                <option>Samsung</option>
                <option>Nike</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Description</label>
            <textarea 
              rows="4"
              placeholder="Describe your product..."
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Product Images</label>
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center text-gray-400 hover:border-black/20 transition-all cursor-pointer">
              Click or drag images here to upload
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-lg"
            >
              <MdSave /> Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;

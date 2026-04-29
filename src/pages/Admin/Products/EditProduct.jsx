import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdArrowBack, MdSave } from 'react-icons/md';

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-black transition-all"
        >
          <MdArrowBack /> Back to List
        </button>
        <h2 className="text-2xl font-bold">Edit Product #{id}</h2>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Product Name</label>
              <input 
                type="text" 
                defaultValue="Sample Product Name"
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Category</label>
              <select className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5" defaultValue="Electronics">
                <option>Select Category</option>
                <option value="Electronics">Electronics</option>
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
                defaultValue="129.99"
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Stock Quantity</label>
              <input 
                type="number" 
                defaultValue="45"
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Brand</label>
              <select className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5" defaultValue="Apple">
                <option>Select Brand</option>
                <option value="Apple">Apple</option>
                <option>Samsung</option>
                <option>Nike</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Description</label>
            <textarea 
              rows="4"
              defaultValue="This is a sample product description that would be loaded from the database."
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Product Images</label>
            <div className="grid grid-cols-4 gap-4">
              <div className="aspect-square bg-gray-100 rounded-xl border border-gray-200"></div>
              <div className="aspect-square border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 cursor-pointer">
                + Add
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-lg"
            >
              <MdSave /> Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;

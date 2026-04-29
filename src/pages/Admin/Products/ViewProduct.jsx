import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { MdArrowBack, MdEdit } from 'react-icons/md';

const ViewProduct = () => {
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
        <div className="flex gap-4">
           <Link 
            to={`/admin/products/edit/${id}`}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all"
          >
            <MdEdit /> Edit Product
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-300">
            Image Placeholder
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Sample Product Name</h1>
              <p className="text-gray-500 mt-1">Product ID: {id}</p>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-gray-50 p-4 rounded-xl flex-1">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Price</p>
                <p className="text-2xl font-bold text-black mt-1">$129.99</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl flex-1">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Stock</p>
                <p className="text-2xl font-bold text-green-600 mt-1">45 Units</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Category</p>
                <p className="font-medium mt-1">Electronics</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Brand</p>
                <p className="font-medium mt-1">Apple</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8">
          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-4">Description</p>
          <p className="text-gray-600 leading-relaxed">
            This is a sample product description. It provides detailed information about the product's features, 
            specifications, and benefits. The design is clean and focuses on readability.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;

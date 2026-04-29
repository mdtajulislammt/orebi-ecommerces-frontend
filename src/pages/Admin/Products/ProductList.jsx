import React from 'react';
import { Link } from 'react-router-dom';
import { MdEdit, MdDelete, MdVisibility, MdAdd } from 'react-icons/md';

const ProductList = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-bold">Products List</h2>
        <Link 
          to="/admin/products/create"
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-all"
        >
          <MdAdd /> Add New Product
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 font-semibold">Product</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Stock</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Placeholder rows */}
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
                    <span className="font-medium">Product Name {i}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">Category Name</td>
                <td className="px-6 py-4 font-bold">$129.99</td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                    In Stock
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Link to={`/admin/products/view/${i}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <MdVisibility />
                    </Link>
                    <Link to={`/admin/products/edit/${i}`} className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg">
                      <MdEdit />
                    </Link>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <MdDelete />
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

export default ProductList;

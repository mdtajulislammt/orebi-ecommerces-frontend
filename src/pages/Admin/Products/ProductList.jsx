import { MdAdd, MdDelete, MdEdit, MdVisibility } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteProductMutation, useGetProductsQuery } from '../../../features/api/apiSlice';

const ProductList = () => {
  const { data, isLoading, isError } = useGetProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id).unwrap();
        toast.success('Product deleted successfully');
      } catch (err) {
        toast.error(err?.data?.message || 'Failed to delete product');
      }
    }
  };

  // Backend image handling (Production logic)
  const getImageUrl = (url) => {
    if (!url) return null;
    // Jodi backend theke full URL ase, direct setai use korbe
    return url;
  };

  if (isLoading) return <div className="flex justify-center py-20 animate-pulse">Loading...</div>;
  if (isError) return <div className="text-red-500 text-center py-10 font-bold">Error loading products!</div>;

  const products = data?.data || [];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Products List</h2>
          <p className="text-sm text-gray-500">Total {data?.meta?.total || 0} products</p>
        </div>
        <Link to="/admin/products/create" className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <MdAdd /> Add New Product
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Price & Rating</th>
              <th className="px-6 py-4">Stock Status</th>
              <th className="px-6 py-4">Variants</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => {
              // Parsing Colors/Sizes since they come as ['Black,Silver']
              const colorList = product.colors?.[0]?.split(',') || [];
              const sizeList = product.sizes?.[0]?.split(',') || [];

              return (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={getImageUrl(product.thumbnail)} 
                        alt={product.name} 
                        className="w-12 h-12 rounded-lg object-cover bg-gray-100 border"
                      />
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800">{product.name}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{product.id}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold">${product.price}</span>
                      <span className="text-xs text-yellow-600">★ {product.avg_rating} ({product.total_reviews})</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                      product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.stock} Units
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-[150px]">
                      {colorList.map(c => <span key={c} className="px-1.5 py-0.5 bg-gray-100 text-[10px] rounded">{c}</span>)}
                      {sizeList.map(s => <span key={s} className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[10px] rounded font-bold">{s}</span>)}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <Link to={`/admin/products/view/${product.slug}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><MdVisibility /></Link>
                      <Link to={`/admin/products/edit/${product.slug}`} className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg"><MdEdit /></Link>
                      <button onClick={() => handleDelete(product.id)} disabled={isDeleting} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><MdDelete /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
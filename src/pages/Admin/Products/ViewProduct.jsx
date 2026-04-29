import { MdArrowBack, MdEdit } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetProductQuery } from '../../../features/api/apiSlice';

const ViewProduct = () => {
  const navigate = useNavigate();
  const { id: identifier } = useParams();
  const { data, isLoading, isError } = useGetProductQuery(identifier);

  const getImageUrl = (url) => {
    if (!url) return null;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';
    
    try {
      // If the URL is already absolute, we extract the path
      const urlObj = new URL(url);
      let path = urlObj.pathname;
      
      // Clean up redundant segments (like /public/)
      if (path.startsWith('/public/')) {
        path = path.replace('/public/', '/');
      }
      
      return `${backendUrl}${path}`;
    } catch (e) {
      // If it's a relative path, just prepend backendUrl
      let path = url;
      if (path.startsWith('/public/')) {
        path = path.replace('/public/', '/');
      }
      return `${backendUrl}${path.startsWith('/') ? '' : '/'}${path}`;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        Product not found or failed to load.
      </div>
    );
  }

  const product = data.data;

  console.log("Product view data>>: ",product)

  // Helper to handle comma-separated values in arrays
  const formatArrayData = (arr) => {
    if (!arr || !Array.isArray(arr)) return [];
    return arr.flatMap(item => item.split(','));
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-6 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-black transition-all"
        >
          <MdArrowBack /> Back to List
        </button>
        <div className="flex gap-4">
           <Link 
            to={`/admin/products/edit/${product.id}`}
            className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-all shadow-md"
          >
            <MdEdit /> Edit Product
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 relative group">
              {product.thumbnail ? (
                <img 
                  src={getImageUrl(product.thumbnail)} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    console.log("Thumbnail Load Error. Trying fallback path...");
                    // If it failed with the fix, try the original URL
                    if (e.target.src !== product.thumbnail) {
                      e.target.src = product.thumbnail;
                    } else {
                      e.target.src = 'https://via.placeholder.com/600x600?text=Image+Not+Found';
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                  No Thumbnail
                </div>
              )}
            </div>
            
            {/* Gallery Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images?.map((img, idx) => (
                <div key={idx} className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:border-black/20 transition-all cursor-pointer">
                  <img 
                    src={getImageUrl(img)} 
                    alt={`Gallery ${idx}`} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      if (e.target.src !== img) {
                        e.target.src = img;
                      } else {
                        e.target.src = 'https://via.placeholder.com/150x150?text=No+Img';
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {product.category?.name || 'Uncategorized'}
              </span>
              <h1 className="text-4xl font-black text-gray-900 mt-4 leading-tight">{product.name}</h1>
              <p className="text-gray-400 font-mono text-sm mt-2">Slug: {product.slug}</p>
            </div>
            
            <div className="flex items-center gap-8 border-y border-gray-100 py-6">
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Price</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-3xl font-black text-black">${product.price}</p>
                  {product.discount_price && (
                    <p className="text-lg text-gray-400 line-through">${parseFloat(product.price) + parseFloat(product.discount_price)}</p>
                  )}
                </div>
              </div>
              <div className="h-10 w-[1px] bg-gray-100"></div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Stock Status</p>
                <p className={`text-xl font-bold mt-1 ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {product.stock > 0 ? `${product.stock} Units Available` : 'Out of Stock'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Brand</p>
                <p className="font-bold text-gray-800 mt-1">{product.brand?.name || 'No Brand'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Colors</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formatArrayData(product.colors).map((c, i) => (
                    <span key={i} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium border border-gray-200">
                      {c}
                    </span>
                  ))}
                  {(!product.colors || product.colors.length === 0) && <span className="text-sm text-gray-400">None</span>}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Sizes</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formatArrayData(product.sizes).map((s, i) => (
                    <span key={i} className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium border border-blue-100">
                      {s}
                    </span>
                  ))}
                  {(!product.sizes || product.sizes.length === 0) && <span className="text-sm text-gray-400">None</span>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-12">
          <h3 className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-6">Product Description</h3>
          <div className="prose prose-blue max-w-none">
            <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;

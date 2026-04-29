import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { MdArrowBack, MdSave, MdCloudUpload, MdAdd, MdClose } from 'react-icons/md';
import { 
  useGetProductQuery, 
  useUpdateProductMutation, 
  useGetCategoriesQuery, 
  useGetBrandsQuery 
} from '../../../features/api/apiSlice';
import { toast } from 'react-toastify';

const EditProduct = () => {
  const navigate = useNavigate();
  const { id: identifier } = useParams(); // URL uses id or slug
  const { data: productData, isLoading: isFetching } = useGetProductQuery(identifier);
  const { data: categories } = useGetCategoriesQuery();
  const { data: brands } = useGetBrandsQuery();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discount_price: '',
    stock: '',
    category_id: '',
    brand_id: '',
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);
  const [colors, setColors] = useState(['']);
  const [sizes, setSizes] = useState(['']);
  
  const [existingThumbnail, setExistingThumbnail] = useState(null);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    if (productData?.data) {
      const p = productData.data;
      setFormData({
        name: p.name || '',
        description: p.description || '',
        price: p.price || '',
        discount_price: p.discount_price || '',
        stock: p.stock || '',
        category_id: p.category_id || '',
        brand_id: p.brand_id || '',
      });
      
      // Extract colors and sizes (handle comma strings if needed)
      const colorList = p.colors?.[0]?.split(',') || p.colors || [''];
      const sizeList = p.sizes?.[0]?.split(',') || p.sizes || [''];
      setColors(colorList);
      setSizes(sizeList);
      
      setExistingThumbnail(p.thumbnail);
      setExistingImages(p.images || []);
    }
  }, [productData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleImagesChange = (e) => {
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const handleArrayChange = (index, value, type) => {
    if (type === 'color') {
      const newColors = [...colors];
      newColors[index] = value;
      setColors(newColors);
    } else {
      const newSizes = [...sizes];
      newSizes[index] = value;
      setSizes(newSizes);
    }
  };

  const addArrayItem = (type) => {
    if (type === 'color') setColors([...colors, '']);
    else setSizes([...sizes, '']);
  };

  const removeArrayItem = (index, type) => {
    if (type === 'color') setColors(colors.filter((_, i) => i !== index));
    else setSizes(sizes.filter((_, i) => i !== index));
  };

  const getImageUrl = (url) => {
    if (!url) return null;
    return url.replace('/public/', '/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key]);
      }
    });

    if (thumbnail) data.append('thumbnail', thumbnail);
    images.forEach(img => data.append('images', img));
    
    colors.filter(c => c !== '').forEach(c => data.append('colors', c));
    sizes.filter(s => s !== '').forEach(s => data.append('sizes', s));
    
    // Add existing images to keep
    existingImages.forEach(img => data.append('existing_images', img));

    try {
      await updateProduct({ id: productData.data.id, data }).unwrap();
      toast.success('Product updated successfully!');
      navigate('/admin/products');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update product');
    }
  };

  if (isFetching) return <div className="flex justify-center py-20">Loading product data...</div>;

  return (
    <div className="max-w-6xl mx-auto pb-12 px-4">
      <div className="mb-8 flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-all text-gray-500"
          >
            <MdArrowBack size={24} />
          </button>
          <div>
            <h2 className="text-xl font-black text-gray-900">Edit Product</h2>
            <p className="text-xs text-gray-400 font-mono">Editing: {productData?.data?.name}</p>
          </div>
        </div>
        <div className="flex gap-2">
           <Link 
            to={`/admin/products/view/${productData?.data?.slug}`}
            className="px-4 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          >
            View Live
          </Link>
        </div>
      </div>

      {/* Current State Preview Card */}
      <div className="mb-8 bg-blue-50/50 border border-blue-100 p-6 rounded-3xl flex flex-col md:flex-row gap-6 items-center">
        <div className="w-24 h-24 bg-white rounded-2xl overflow-hidden border border-blue-200 flex-shrink-0">
          <img src={getImageUrl(productData?.data?.thumbnail)} alt="Current" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-1">Current Status</h3>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
             <div className="flex flex-col">
                <span className="text-xs text-blue-600/60 font-bold">Price</span>
                <span className="font-black text-lg text-blue-900">${productData?.data?.price}</span>
             </div>
             <div className="h-8 w-[1px] bg-blue-200"></div>
             <div className="flex flex-col">
                <span className="text-xs text-blue-600/60 font-bold">Stock</span>
                <span className="font-black text-lg text-blue-900">{productData?.data?.stock} Units</span>
             </div>
             <div className="h-8 w-[1px] bg-blue-200"></div>
             <div className="flex flex-col">
                <span className="text-xs text-blue-600/60 font-bold">Category</span>
                <span className="font-black text-lg text-blue-900">{productData?.data?.category?.name || 'N/A'}</span>
             </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Product Name *</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Description *</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Regular Price *</label>
                  <input 
                    type="number" 
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Discount Price</label>
                  <input 
                    type="number" 
                    name="discount_price"
                    value={formData.discount_price}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Stock Quantity *</label>
                  <input 
                    type="number" 
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                  />
                </div>
              </div>
            </div>

            {/* Media Upload */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <h3 className="font-bold text-lg">Product Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Thumbnail Image</label>
                  <div className="relative group border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center hover:border-black/20 transition-all">
                    {thumbnail ? (
                      <div className="relative aspect-square">
                        <img src={URL.createObjectURL(thumbnail)} alt="New Thumbnail" className="w-full h-full object-cover rounded-xl" />
                        <button type="button" onClick={() => setThumbnail(null)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"><MdClose /></button>
                      </div>
                    ) : existingThumbnail ? (
                      <div className="relative aspect-square">
                        <img src={getImageUrl(existingThumbnail)} alt="Current Thumbnail" className="w-full h-full object-cover rounded-xl" />
                        <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center cursor-pointer rounded-xl text-white font-bold text-sm">
                          Change Image
                          <input type="file" className="hidden" accept="image/*" onChange={handleThumbnailChange} />
                        </label>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center py-8 cursor-pointer">
                        <MdCloudUpload className="text-4xl text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Upload Thumbnail</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleThumbnailChange} />
                      </label>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Gallery Images</label>
                  <div className="grid grid-cols-2 gap-4">
                    {existingImages.map((img, idx) => (
                      <div key={idx} className="relative aspect-square group">
                        <img src={getImageUrl(img)} alt="Existing Gallery" className="w-full h-full object-cover rounded-xl" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center rounded-xl">
                          <button 
                            type="button" 
                            onClick={() => setExistingImages(existingImages.filter((_, i) => i !== idx))}
                            className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-all"
                            title="Remove Image"
                          >
                            <MdClose size={18} />
                          </button>
                        </div>
                        <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/60 text-[8px] text-white rounded font-bold uppercase">Keep</span>
                      </div>
                    ))}
                    {images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square">
                        <img src={URL.createObjectURL(img)} alt="New Gallery" className="w-full h-full object-cover rounded-xl" />
                        <button type="button" onClick={() => setImages(images.filter((_, i) => i !== idx))} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"><MdClose /></button>
                      </div>
                    ))}
                    <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-black/20 transition-all">
                      <MdAdd className="text-2xl text-gray-400" />
                      <input type="file" className="hidden" multiple accept="image/*" onChange={handleImagesChange} />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Category *</label>
                <select name="category_id" value={formData.category_id} onChange={handleChange} required className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5">
                  <option value="">Select Category</option>
                  {categories?.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Brand *</label>
                <select name="brand_id" value={formData.brand_id} onChange={handleChange} required className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5">
                  <option value="">Select Brand</option>
                  {brands?.map(brand => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
                </select>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-700">Colors</label>
                  <button type="button" onClick={() => addArrayItem('color')} className="text-blue-600 text-sm font-bold flex items-center gap-1"><MdAdd /> Add</button>
                </div>
                {colors.map((color, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input type="text" value={color} onChange={(e) => handleArrayChange(idx, e.target.value, 'color')} className="flex-1 p-2 rounded-lg border border-gray-200 focus:outline-none" />
                    {colors.length > 1 && <button type="button" onClick={() => removeArrayItem(idx, 'color')} className="text-red-500 p-2"><MdClose /></button>}
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-700">Sizes</label>
                  <button type="button" onClick={() => addArrayItem('size')} className="text-blue-600 text-sm font-bold flex items-center gap-1"><MdAdd /> Add</button>
                </div>
                {sizes.map((size, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input type="text" value={size} onChange={(e) => handleArrayChange(idx, e.target.value, 'size')} className="flex-1 p-2 rounded-lg border border-gray-200 focus:outline-none" />
                    {sizes.length > 1 && <button type="button" onClick={() => removeArrayItem(idx, 'size')} className="text-red-500 p-2"><MdClose /></button>}
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" disabled={isUpdating} className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-lg disabled:bg-gray-400">
              {isUpdating ? 'Updating...' : <><MdSave /> Update Product</>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;

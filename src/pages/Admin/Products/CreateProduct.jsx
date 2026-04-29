import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdSave, MdCloudUpload, MdAdd, MdClose } from 'react-icons/md';
import { 
  useCreateProductMutation, 
  useGetCategoriesQuery, 
  useGetBrandsQuery 
} from '../../../features/api/apiSlice';
import { toast } from 'react-toastify';

const CreateProduct = () => {
  const navigate = useNavigate();
  const { data: categories } = useGetCategoriesQuery();
  const { data: brands } = useGetBrandsQuery();
  const [createProduct, { isLoading }] = useCreateProductMutation();

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
    if (type === 'color') {
      setColors(colors.filter((_, i) => i !== index));
    } else {
      setSizes(sizes.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (thumbnail) data.append('thumbnail', thumbnail);
    images.forEach(img => data.append('images', img));
    colors.filter(c => c !== '').forEach(c => data.append('colors', c));
    sizes.filter(s => s !== '').forEach(s => data.append('sizes', s));

    try {
      await createProduct(data).unwrap();
      toast.success('Product created successfully!');
      navigate('/admin/products');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to create product');
    }
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
        <h2 className="text-2xl font-bold">Create New Product</h2>
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
                  placeholder="e.g. Premium Wireless Headphones"
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
                  placeholder="Detailed product description..."
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
                    placeholder="0.00"
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
                    placeholder="0.00"
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
                    placeholder="0"
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
                  <label className="text-sm font-semibold text-gray-700">Thumbnail Image *</label>
                  <div className="relative group border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center hover:border-black/20 transition-all">
                    {thumbnail ? (
                      <div className="relative aspect-square">
                        <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail" className="w-full h-full object-cover rounded-xl" />
                        <button 
                          type="button"
                          onClick={() => setThumbnail(null)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
                        >
                          <MdClose />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center py-8 cursor-pointer">
                        <MdCloudUpload className="text-4xl text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Upload Thumbnail</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleThumbnailChange} required />
                      </label>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Gallery Images *</label>
                  <div className="grid grid-cols-2 gap-4">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square">
                        <img src={URL.createObjectURL(img)} alt="Gallery" className="w-full h-full object-cover rounded-xl" />
                        <button 
                          type="button"
                          onClick={() => setImages(images.filter((_, i) => i !== idx))}
                          className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
                        >
                          <MdClose />
                        </button>
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

          {/* Sidebar / Options */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Category *</label>
                <select 
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                >
                  <option value="">Select Category</option>
                  {categories?.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Brand *</label>
                <select 
                  name="brand_id"
                  value={formData.brand_id}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                >
                  <option value="">Select Brand</option>
                  {brands?.map(brand => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Colors & Sizes */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-700">Available Colors</label>
                  <button type="button" onClick={() => addArrayItem('color')} className="text-blue-600 text-sm font-bold flex items-center gap-1">
                    <MdAdd /> Add
                  </button>
                </div>
                {colors.map((color, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input 
                      type="text" 
                      value={color}
                      onChange={(e) => handleArrayChange(idx, e.target.value, 'color')}
                      placeholder="e.g. Red"
                      className="flex-1 p-2 rounded-lg border border-gray-200 focus:outline-none"
                    />
                    {colors.length > 1 && (
                      <button type="button" onClick={() => removeArrayItem(idx, 'color')} className="text-red-500 p-2">
                        <MdClose />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-700">Available Sizes</label>
                  <button type="button" onClick={() => addArrayItem('size')} className="text-blue-600 text-sm font-bold flex items-center gap-1">
                    <MdAdd /> Add
                  </button>
                </div>
                {sizes.map((size, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input 
                      type="text" 
                      value={size}
                      onChange={(e) => handleArrayChange(idx, e.target.value, 'size')}
                      placeholder="e.g. XL"
                      className="flex-1 p-2 rounded-lg border border-gray-200 focus:outline-none"
                    />
                    {sizes.length > 1 && (
                      <button type="button" onClick={() => removeArrayItem(idx, 'size')} className="text-red-500 p-2">
                        <MdClose />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-lg disabled:bg-gray-400"
            >
              {isLoading ? 'Creating...' : <><MdSave /> Create Product</>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const [product, setProduct] = useState({
    title: 'Loading...',
    description: 'Loading...',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: 'Loading...',
    category: 'Loading...',
    images: [],
  });
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
  const [thumbnail, setThumbnail] = useState('');
  const [qty, setQty] = useState(1);

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setThumbnail(data.images.length > 0 ? data.images[0] : '');
        setPriceAfterDiscount(data.price - data.price * data.discountPercentage / 100);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
      <div className='flex flex-col gap-6 lg:w-2/4'>
        <img src={thumbnail} alt="" className='w-full h-full aspect-square object-cover rounded-xl' />
        <div className='flex flex-row justify-between h-24'>
          {product.images.length > 0 && product.images.map((image, index) => (
            <img src={image} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setThumbnail(product.images[index])} />
          ))}
        </div>
      </div>
      {/* ABOUT */}
      <div className='flex flex-col gap-4 lg:w-2/4'>
        <div>
          <span className=' text-violet-600 font-semibold'>{product.category}</span>
          <h1 className='text-3xl font-bold'>{product.title}</h1>
        </div>

        <p className='text-gray-700'> {product.description} </p>
        <div>
          {product.discountPercentage > 0 ? (
            <>
              <div className='text-4xl font-bold text-black-600'>{priceAfterDiscount.toFixed(2)}</div>
              <div className='text-gray-400 line-through'>{product.price.toFixed(2)}</div>
              <div className='text-green-500'>Save {(100 - (priceAfterDiscount / product.price) * 100).toFixed(0)}%</div>
            </>
          ) : (
            <div className='text-2xl'>{product.price.toFixed(2)}</div>
          )}
        </div>
        <div className='flex items-center gap-2'>
          <button className='bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl' onClick={() => setQty((prev) => prev + 1)}>-</button>
          <span className='py-4 px-6 rounded-lg'>{qty}</span>
          <button className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl' onClick={() => setQty((prev) => prev + 1)}>+</button>
        </div>
        <div className='flex justify-between'>
          <button className=' bg-gray-300 py-3 px-10 rounded-full text-white font-semibold flex items-center justify-center gap-2'>ABOUT</button>
          <button className='bg-gray-300 py-3 px-10 rounded-full text-white font-semibold flex items-center justify-center gap-2'>DESCRIPTION</button>
          <button className='bg-gray-300 py-3 px-10 rounded-full text-white font-semibold flex items-center justify-center gap-2'>REVIEWS</button>
          <button className='bg-gray-300 py-3 px-10 rounded-full text-white font-semibold flex items-center justify-center gap-2'>SIMILAR</button>
        </div>
        <button className='bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl flex items-center justify-center gap-2'>
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  )
}

export default ProductPage;
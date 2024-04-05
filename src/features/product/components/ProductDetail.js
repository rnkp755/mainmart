import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Rating } from '@mui/material';
import CartIcon from './icons';
import CarouselControlsInside from './Carousel';


const ProductPage = () => {
  const [product, setProduct] = useState({
    title: 'Loading...',
    description: 'Loading...',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    reviews: [{}],
    stock: 0,
    brand: 'Loading...',
    category: 'Loading...',
    images: [],
  });

  const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
  const [thumbnail, setThumbnail] = useState('');
  const [qty, setQty] = useState(1);
  const [recommendedProducts, setRecommendedProducts] = useState([])
  const { id } = useParams();


  useEffect(() => {
    const fetchProductDetailsAndRecommendations = async () => {
      try {
        // Fetch product details
        const response = await fetch(`http://localhost:8080/products/${id}`);
        const productData = await response.json();

        // Update product state
        setProduct(productData);
        setThumbnail(productData.images?.length > 0 ? productData.images[0] : '');
        setPriceAfterDiscount(productData.price - productData.price * productData.discountPercentage / 100);

        // Here we use productData directly instead of the product state
        if (productData.category && productData.category !== "Loading...") {
          const url = `http://localhost:8080/products?category=${productData.category}&_sort=-rating,discountPercentage,price`
          const recommendedResponse = await fetch(url);
          const recommendedData = await recommendedResponse.json();
          setRecommendedProducts(recommendedData);
        }

        // Add temporary reviews
        addTemporaryReviews();
      } catch (error) {
        console.log(error);
      }
    }
    fetchProductDetailsAndRecommendations();
  }, [id]);


  // Adding temporary reviews
  const addTemporaryReviews = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      reviews: [
        {
          id: 1,
          avatar:
            'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          user: 'John Doe',
          joinedOn: 'August 2014',
          rating: 4.5,
          reviewTitle: 'Thinking to buy another one!',
          reviewDate: 'March 3, 2017',
          reviewMsg:
            'This is my third Invicta Pro Diver. They are just fantastic value for money. This one arrived yesterday and the first thing I did was set the time, popped on an identical strap from another Invicta and went in the shower with it to test the waterproofing.... No problems. It is obviously not the same build quality as those very expensive watches. But that is like comparing a Citroën to a Ferrari. This watch was well under £100! An absolute bargain.',
        },
        {
          id: 2,
          avatar:
            'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          user: 'Alice Doe',
          joinedOn: 'August 2014',
          rating: 3,
          reviewTitle: 'Thinking to buy another one!',
          reviewDate: 'March 3, 2017',
          reviewMsg:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur earum, porro, totam, doloribus maxime maiores culpa facere aliquid accusamus iste nobis natus magni? Labore, iste. Voluptatem, earum magnam! Qui, dolor?',
        },
        {
          id: 3,
          avatar:
            'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          user: 'Bob Doe',
          joinedOn: 'August 2014',
          rating: 4.7,
          reviewTitle: 'Thinking to buy another one!',
          reviewDate: 'March 3, 2017',
          reviewMsg:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae mollitia quaerat aperiam aliquid aut tenetur temporibus? Dicta, autem commodi. Quia totam ut, inventore explicabo omnis harum aut id laudantium cupiditate!',
        },
      ],
    }));
  };

  const aboutScrollRef = useRef(null);
  const reviewScrollRef = useRef(null);
  const recommendationScrollRef = useRef(null);

  const scrollToAbout = () => {
    if (aboutScrollRef.current) {
      aboutScrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToReview = () => {
    if (reviewScrollRef.current) {
      reviewScrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const scrollToRecommendation = () => {
    if (recommendationScrollRef.current) {
      recommendationScrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
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
            <div className='flex flex-row'>
              <Rating name="read-only" value={product.rating} readOnly precision={0.5} />
              <span className="text-sm font-medium text-gray-900 mx-2 my-0.5">{`${product.rating} out of 5`}</span>
            </div>
          </div>

          <p className='text-gray-700'> {product.description} </p>
          <div>
            {product.discountPercentage > 0 ? (
              <>
                <div className='text-4xl font-bold text-black-600'>{`${priceAfterDiscount.toFixed(2)} INR`}</div>
                <div className='text-gray-400 line-through'>{product.price.toFixed(2)}</div>
                <div className='text-green-500'>Save {(100 - (priceAfterDiscount / product.price) * 100).toFixed(0)}%</div>
              </>
            ) : (
              <div className='text-2xl'>{product.price.toFixed(2)}</div>
            )}
          </div>
          <div className='flex items-center gap-2'>
            <button className='bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl' onClick={() => setQty((prev) => prev > 1 ? prev - 1 : prev)}>-</button>
            <span className='py-4 px-6 rounded-lg'>{qty}</span>
            <button className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl' onClick={() => setQty((prev) => prev + 1)}>+</button>
          </div>
          <div className='flex justify-between'>
            <button className=' bg-orange-500 py-3 px-7 rounded-full text-white font-semibold flex items-center justify-center gap-2' onClick={scrollToAbout}>ABOUT</button>
            <button className='bg-violet-500 py-3 px-7 rounded-full text-white font-semibold flex items-center justify-center gap-2' onClick={scrollToRecommendation}>RECOMMENDATION</button>
            <button className='bg-orange-500 py-3 px-7 rounded-full text-white font-semibold flex items-center justify-center gap-2' onClick={scrollToReview}>REVIEWS</button>
            <button className='bg-violet-500 py-3 px-7 rounded-full text-white font-semibold flex items-center justify-center gap-2'>SIMILAR</button>
          </div>
          <div className='flex flex-row justify-evenly'>
            <button className='bg-pink-800 text-white font-semibold py-3 px-16 rounded-xl flex items-center justify-center gap-2'>
              <span>Buy Now</span>
            </button>
            <button className='bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl flex items-center justify-center gap-2'>
              <span>Add to Cart</span>
            </button>
            <div className="cursor-pointer">
              <CartIcon color="pink" width="10" height="10" />
            </div>
          </div>
        </div>
      </div>
      <section className="my-8 bg-white rounded-md shadow-xl" ref={aboutScrollRef}>
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-8 lg:px-6">
          <div className="max-w-screen-lg text-black sm:text-lg ">
            <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 ">About</h2>
            <p className="mb-4 font-medium">{product.description}</p>
          </div>
        </div>
      </section>
      <section className="my-8 bg-white rounded-md shadow-xl" ref={reviewScrollRef}>
        <div className="py-8 mx-auto max-w-screen-xl">
          <div className="max-w-screen-lg text-black sm:text-lg ">
            <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 mx-14">Reviews & Ratings</h2>
            <div className="flex flex-row">
              <div className="rating flex-1 mx-14">
                <div className="flex items-center mb-2">
                  <Rating name="read-only" value={product.rating} readOnly precision={0.5} />
                  <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">{product.rating}</p>
                  <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
                  <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
                </div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">1,745 global ratings</p>
                <div className="flex items-center mt-4">
                  <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">5 star</a>
                  <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                    <div className="h-5 bg-yellow-300 rounded" style={{ width: '70%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">70%</span>
                </div>
                <div className="flex items-center mt-4">
                  <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">4 star</a>
                  <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                    <div className="h-5 bg-yellow-300 rounded" style={{ width: "17%" }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">17%</span>
                </div>
                <div className="flex items-center mt-4">
                  <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">3 star</a>
                  <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                    <div className="h-5 bg-yellow-300 rounded" style={{ width: "8%" }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">8%</span>
                </div>
                <div className="flex items-center mt-4">
                  <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">2 star</a>
                  <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                    <div className="h-5 bg-yellow-300 rounded" style={{ width: "4%" }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">4%</span>
                </div>
                <div className="flex items-center mt-4">
                  <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">1 star</a>
                  <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                    <div className="h-5 bg-yellow-300 rounded" style={{ width: "1%" }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">1%</span>
                </div>

              </div>
              <div className="reviews flex-1 max-h-[70vh] overflow-y-auto bg-[#F3F4F6] rounded-md" style={{ margin: "auto -8.5rem" }}>
                {
                  Array.isArray(product.reviews) && product.reviews.map((review) => (
                    <article
                      key={review.id}
                      className='m-4'
                    >
                      <div className="flex items-center">
                        <img className="w-10 h-10 me-4 rounded-full" src={review.avatar} alt="" />
                        <div className="font-medium text-gray-900">
                          <p>{review.user}<time dateTime="2014-08-16 19:00" className="block text-sm text-gray-500 dark:text-gray-400">{`Joined on ${review.joinedOn}`}</time></p>
                        </div>
                      </div>
                      <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                        <Rating name="read-only" value={review.rating} readOnly precision={0.5} />
                        <h3 className="ms-2 text-sm font-semibold text-gray-900 ">{review.reviewTitle}</h3>
                      </div>
                      <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400"><p>Reviewed on <time dateTime="2017-03-03 19:00">{review.reviewDate}</time></p></footer>
                      <p className="mb-2 text-gray-500 dark:text-gray-400">{review.reviewMsg}</p>

                    </article>
                  ))
                }


              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="my-8 bg-white rounded-md shadow-xl" ref={recommendationScrollRef}>
        <div className="py-8 mx-4 max-w-screen-xl px-[4.5rem]">
          <div className="max-w-screen-lg text-black sm:text-lg ">
            <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 ">Recommended Products</h2>
            {
              recommendedProducts && Array.isArray(recommendedProducts) ? (
                <CarouselControlsInside recommendedProducts={recommendedProducts} />
              ) : null
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductPage;
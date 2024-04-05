import React, { useEffect, useRef } from "react"
import Glide from "@glidejs/glide"
import { Link } from "react-router-dom"
import { Rating } from '@mui/material';

export default function CarouselControlsInside({ recommendedProducts }) {

      const glideRef = useRef(null);
      useEffect(() => {
            if (glideRef.current) {
                  const slider = new Glide(glideRef.current, {
                        type: "carousel",
                        focusAt: "center",
                        perView: 3,
                        autoplay: 3000,
                        animationDuration: 700,
                        gap: 24,
                        classNames: {
                              nav: {
                                    active: "[&>*]:bg-wuiSlate-700",
                              },
                        },
                        breakpoints: {
                              1024: {
                                    perView: 2,
                              },
                              640: {
                                    perView: 1,
                              },
                        },
                  }).mount();

                  return () => {
                        slider.destroy();
                  };
            }
      }, []);

      return (
            <>
                  {/*<!-- Component: Carousel with controls inside --> */}
                  <div className="glide-01 relative w-full" ref={glideRef}>
                        {/*    <!-- Slides --> */}
                        <div className="overflow-hidden" data-glide-el="track">
                              <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
                                    <li className="hidden">
                                          <img
                                                src="https://Tailwindmix.b-cdn.net/carousel/carousel-image-01.jpg"
                                                className="m-auto max-h-full w-full max-w-full"
                                          />
                                    </li>
                                    {
                                          Array.isArray(recommendedProducts) && recommendedProducts.map((product, index) => (
                                                <li key={product.id} className="glide__slide">
                                                      <Link to={`/product-detail/${product.id}`} key={product.id}>
                                                            <div className="group relative border-solid border-2 p-2 border-gray-200">
                                                                  <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                                                                        <img
                                                                              src={product.thumbnail}
                                                                              alt={product.title}
                                                                              className="m-auto max-h-full w-full max-w-full"
                                                                        />
                                                                  </div>
                                                                  <div className="flex flex-col items-center mt-4">
                                                                        <h2
                                                                              className="text-sm text-gray-700 text-center leading-tight"
                                                                              style={{
                                                                                    maxHeight: "3rem",
                                                                                    overflow: "hidden",
                                                                              }}
                                                                        >
                                                                              <b>{product.title}</b>
                                                                        </h2>
                                                                        <div className="flex items-center mt-1">
                                                                              <h1>
                                                                                    <span className="text-xs font-medium text-gray-900">
                                                                                          $
                                                                                          {Math.round(
                                                                                                product.price * (1 - product.discountPercentage / 100)
                                                                                          )}
                                                                                    </span>
                                                                                    <span className="text-xs line-through text-gray-400 mx-2">
                                                                                          ${product.price}
                                                                                    </span>
                                                                                    <span className="text-xs text-gray-500">
                                                                                          {product.discountPercentage}% Off
                                                                                    </span>
                                                                              </h1>
                                                                        </div>
                                                                        <div className="flex mt-1 items-center">
                                                                              <Rating
                                                                                    name="read-only"
                                                                                    value={product.rating}
                                                                                    readOnly
                                                                                    precision={0.5}
                                                                              />
                                                                              <span className="text-xs text-gray-500 align-bottom ml-1">
                                                                                    {product.rating}
                                                                              </span>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      </Link>
                                                </li>
                                          ))
                                    }


                              </ul>
                        </div>
                        {/*    <!-- Controls --> */}
                        <div
                              className="absolute left-0 top-1/2 flex h-0 w-full items-center justify-between px-4 "
                              data-glide-el="controls"
                        >
                              <button
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-white/20 text-slate-700 transition duration-300 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
                                    data-glide-dir="<"
                                    aria-label="prev slide"
                              >
                                    <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="1.5"
                                          stroke="currentColor"
                                          className="h-5 w-5"
                                    >
                                          <title>prev slide</title>
                                          <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                                          />
                                    </svg>
                              </button>
                              <button
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-white/20 text-slate-700 transition duration-300 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
                                    data-glide-dir=">"
                                    aria-label="next slide"
                              >
                                    <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="1.5"
                                          stroke="currentColor"
                                          className="h-5 w-5"
                                    >
                                          <title>next slide</title>
                                          <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                          />
                                    </svg>
                              </button>
                        </div>
                  </div>

                  <script src="https://cdnjs.cloudflare.com/ajax/libs/Glide.js/3.0.2/glide.js"></script>
                  {/*<!-- End Carousel with controls inside --> */}
            </>
      )
}
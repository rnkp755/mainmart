import React from 'react'

const GenerateDiscountCoupon = () => {
      const addDiscountCoupon = (e) => {
            e.preventDefault();
            const coupon = e.target.coupon.value;
            const discountPercentage = e.target['discount-percentage'].value;
            console.log(coupon, discountPercentage);
      }

      return (
            <div>
                  // Form to generate new discount coupon
                  <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={addDiscountCoupon}>
                        <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Generate new discount coupon</h2>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

                              <div className="sm:col-span-2">
                                    <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                                          Coupon
                                    </label>
                                    <div className="mt-2.5">
                                          <input
                                                type="text"
                                                name="coupon"
                                                id="coupon"
                                                className="uppercase block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 font-bold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                          />
                                    </div>
                              </div>
                              <div className="sm:col-span-2">
                                    <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                          Discount Percentage
                                    </label>
                                    <div className="mt-2.5">
                                          <input
                                                type="number"
                                                name="discount-percentage"
                                                id="discount-percentage"
                                                min="1"
                                                max="100"
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                          />
                                    </div>
                              </div>


                        </div>
                        <div className="mt-10">
                              <button
                                    type="submit"
                                    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                    Add Coupon
                              </button>
                        </div>
                  </form>
            </div>
      )
}

export default GenerateDiscountCoupon

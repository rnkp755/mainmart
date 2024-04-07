import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EXCHANGE_RATE_INR_TO_USD } from '../app/constants';

function Checkout() {

  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Throwback Hip Bag",
      description: "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
      price: 90,
      discountPercentage: 12.96,
      rating: 4.69,
      quantity: 1,
      brand: "Gucci",
      category: "bags",
      thumbnail: "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
      images: [
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
      ]
    },
    {
      id: 2,
      title: "Medium Stuff Satchel",
      description: "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
      price: 32,
      discountPercentage: 12.96,
      rating: 4.69,
      quantity: 1,
      brand: "Gucci",
      category: "bags",
      thumbnail: "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
      images: [
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
      ]
    }
    // More products...
  ]);

  const [totalCartValue, setTotalCartValue] = useState(0);

  const [addresses, setAddresses] = useState([
    {
      firstName: "John",
      lastName: "Wick",
      email: "john@wick.com",
      country: "India",
      streetAddress: "11th Main",
      city: "Delhi",
      state: "Delhi",
      postalCode: "110001",
      phone: "12312321331"
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "john@doe.com",
      country: "US",
      streetAddress: "11th Main",
      city: "New York",
      state: "New York",
      postalCode: "110001",
      phone: "12312321331"
    }
  ]);

  const [paymentOption, setPaymentOption] = useState("");

  useEffect(() => {
    setBillingDetail(addresses[addresses.length - 1]);
    setTotalCartValue(products.reduce((acc, product) => acc + (product.price - product.price * product.discountPercentage / 100).toFixed(2), 0));
  }, [addresses]);

  const [billingDetail, setBillingDetail] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "india",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    phone: ""
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <form className="bg-white px-5 py-12 mt-12">
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        onChange={(e) => setBillingDetail({ ...billingDetail, firstName: e.target.value })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        onChange={(e) => setBillingDetail({ ...billingDetail, lastName: e.target.value })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        onChange={(e) => setBillingDetail({ ...billingDetail, email: e.target.value })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Country
                    </label>
                    <div className="mt-2">
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        onChange={(e) => setBillingDetail({ ...billingDetail, country: e.target.value })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option value="india" selected>India</option>
                        <option value="us">United States</option>
                        <option value="canada">Canada</option>
                        <option value="mexico">Mexico</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        onChange={(e) => setBillingDetail({ ...billingDetail, streetAddress: e.target.value })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        onChange={(e) => setBillingDetail({ ...billingDetail, city: e.target.value })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="region"
                        id="region"
                        autoComplete="address-level1"
                        onChange={(e) => setBillingDetail({ ...billingDetail, state: e.target.value })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        onChange={(e) => setBillingDetail({ ...billingDetail, postalCode: e.target.value })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  onClick={() => setBillingDetail({
                    firstName: "",
                    lastName: "",
                    email: "",
                    country: "",
                    streetAddress: "",
                    city: "",
                    state: "",
                    postalCode: "",
                    phone: ""
                  })}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={
                    () => (
                      billingDetail.firstName && billingDetail.lastName && billingDetail.email && billingDetail.country && billingDetail.streetAddress && billingDetail.city && billingDetail.state && billingDetail.postalCode && billingDetail.phone
                    ) && setAddresses([...addresses, billingDetail])
                  }
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Address
                </button>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Addresses
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Choose from Existing addresses
                </p>
                <ul role="list">
                  {addresses.map((address, index) => (
                    <li
                      key={index}
                      className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                    >
                      <div className="flex gap-x-4">
                        <input
                          name="address"
                          type="radio"
                          {...(index === addresses.length - 1 && { defaultChecked: true })}
                          onClick={() => setBillingDetail(address)}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {address.firstName} {address.lastName}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.street}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.pinCode}
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          Phone: {address.phone}
                        </p>
                        <p className="text-sm leading-6 text-gray-500">
                          {address.city}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>


              </div>
            </div>
          </form>
        </div>
        <div className="lg:col-span-2">
          <div className="mx-auto mt-12 bg-white max-w-7xl px-0 sm:px-0 lg:px-0">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                Cart
              </h1>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {products.map((product, index) => (
                    <li key={product.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={product.thumbnail}
                          alt={product.id}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link to={`/product-detail/${product.id}`}>
                                {product.title}
                              </Link>
                            </h3>
                            <p className="ml-4">${(product.price - product.price * product.discountPercentage / 100).toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.color}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty
                            </label>
                            <div className='flex items-center gap-2'>
                              <button className='bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl'>-</button>
                              <span className='py-4 px-6 rounded-lg'>{product.quantity}</span>
                              <button className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl'>+</button>
                            </div>
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => setProducts(products.filter((product, i) => i !== index))}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${totalCartValue}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Payment Methods
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose One
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id={billingDetail.country.toLowerCase() === "india" ? "upi" : "paypal"}
                        name="payments"
                        type="radio"
                        defaultChecked
                        onClick={() => setPaymentOption(`${billingDetail.country.toLowerCase() === "india" ? "upi" : "paypal"}`)}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="cash"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        {billingDetail.country.toLowerCase() === "india" ? "UPI" : "Paypal"}
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id={billingDetail.country.toLowerCase() === "india" ? "razorpay" : "wire-transfer"}
                        name="payments"
                        type="radio"
                        onClick={() => setPaymentOption(`${billingDetail.country.toLowerCase() === "india" ? "razorpay" : "wire-transfer"}`)}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="card"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        {billingDetail.country.toLowerCase() === "india" ? "Razorpay" : "Wire Transfer"}
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div
                className="cursor-pointer mt-6 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Pay and Order
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or
                  <Link to="/">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
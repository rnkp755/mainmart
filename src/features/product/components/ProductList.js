import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllProductsAsync,
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductsByFiltersAsync,
  selectAllProducts,
  selectBrands,
  selectCategories,
} from "../productSlice";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import CartIcon from "./icons";
import { Link } from "react-router-dom";

import { Rating } from '@mui/material';
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { ITEMS_PER_PAGE } from "../../../app/constants.js";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const products = useSelector(selectAllProducts);
  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },
    {
      id: "price",
      name: "Price",
      options: [
        { value: "0-50", label: "Under $50", checked: false },
        { value: "51-100", label: "$51 - $100", checked: false },
        { value: "101-150", label: "$101 - $150", checked: false },
        { value: "151-200", label: "$151 - $200", checked: false },
        { value: "201-250", label: "$201 - $250", checked: false },
        { value: "251+", label: "Over $250", checked: false },
      ],
    },
  ];
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);

  const handleFilter = async (e, section, option) => {
    console.log("Current Filter:", filter);

    console.log("Updating:", section.id, option.value);

    await setFilter((prevState) => {
      const updatedFilter = { ...prevState };
      if (e.target.checked) {
        if (!updatedFilter[section.id]) {
          updatedFilter[section.id] = [option.value];
        } else if (!updatedFilter[section.id].includes(option.value)) {
          updatedFilter[section.id].push(option.value);
        }
      } else {
        if (updatedFilter[section.id]) {
          updatedFilter[section.id] = updatedFilter[section.id].filter(
            (val) => val !== option.value
          );
        }
      }
      return updatedFilter;
    });
  };

  const handleSort = async (e, option) => {
    console.log(option);
    await setFilter((prevState) => {
      const updatedFilter = { ...prevState };
      if (option.order === "desc") {
        updatedFilter._sort = "-" + option.sort;
        console.log("Mai aa gya");
      } else {
        updatedFilter._sort = option.sort;
      }
      return updatedFilter;
    });
  };
  const handlePage = async (page) => {
    console.log("handlepage clicked", page);

    // Update the filter state with the new page
    await setFilter((prevState) => {
      const currFilter = { ...prevState };
      currFilter._page = page;

      return currFilter;
    });

    // Update the page state directly
    await setPage(page);

    console.log("handlepage click verified", filter);
  };

  useEffect(() => {
    dispatch(fetchBrandsAsync())
    dispatch(fetchCategoriesAsync())
  }, [])

  useEffect(() => {
    const pagination = { _page: page, _per_page: ITEMS_PER_PAGE || 9 }; // Fixing default value assignment
    const updatedFilter = {
      ...filter,
      _page: page,
      _per_page: pagination._per_page,
    }; // Using pagination._per_page instead of ITEMS_PER_PAGE

    console.log("Updated Filter:", updatedFilter);
    dispatch(fetchProductsByFiltersAsync(updatedFilter));
  }, [page, filter]); // Including ITEMS_PER_PAGE in the dependencies array

  useEffect(() => {
    const fetchData = async () => {
      console.log("Filter in useEffect", filter);
      await dispatch(fetchProductsByFiltersAsync(filter)); // Pass filter to fetchProductsByFiltersAsync
    };

    fetchData();

    console.log("Products", products);
  }, [dispatch, filter]);

  return (
    <div className="bg-white">
      <div>
        <MobileFilter
          handleFilter={handleFilter}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          filters={filters}
        ></MobileFilter>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              All Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              onClick={(e) => handleSort(e, option)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <DesktopFilter handleFilter={handleFilter}
                filters={filters}
              ></DesktopFilter>

              <div className="lg:col-span-3">
                <ProductGrid
                  products={Array.isArray(products) ? products : []}
                ></ProductGrid>
              </div>
            </div>
          </section>

          <Pagination
            page={page}
            setPage={setPage}
            handlePage={handlePage}
          ></Pagination>
        </main>
      </div>
    </div>
  );
}

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
function DesktopFilter({ handleFilter, filters }) {
  return (
    <form className="hidden lg:block">
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        onChange={(e) => handleFilter(e, section, option)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
}
function Pagination({ page, setPage, handlePage, totalItems = 100 }) {
  const checkWhetherPageShouldBeShown = (pageIdx) => {
    if (
      pageIdx + 1 === page ||
      pageIdx + 1 === page + 1 ||
      pageIdx + 1 === Math.ceil(totalItems / ITEMS_PER_PAGE) ||
      pageIdx + 1 === Math.ceil(totalItems / ITEMS_PER_PAGE) - 1
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 cursor-pointer">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to <span className="font-medium">{page * ITEMS_PER_PAGE}</span> of{" "}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon
                className="h-5 w-5"
                aria-hidden="true"
                onClick={() => page > 1 && handlePage(page - 1)}
              />
            </div>

            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array.from({ length: Math.ceil(totalItems / ITEMS_PER_PAGE) }).map(
              (el, index) => {
                const shouldShowPage = checkWhetherPageShouldBeShown(index);
                const shouldShowPrevPage = checkWhetherPageShouldBeShown(
                  index - 1
                );
                const shouldShowTwoPagesBack = checkWhetherPageShouldBeShown(
                  index - 2
                );
                const content = shouldShowPage
                  ? index + 1
                  : !shouldShowPrevPage &&
                    !shouldShowPage &&
                    !shouldShowTwoPagesBack
                    ? null
                    : ".";
                const additionalClass =
                  content === null ? "hidden" : "";
                return (
                  <div
                    onClick={() => handlePage(index + 1)} // Fixing onclick attribute
                    aria-current="page"
                    className={`relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${additionalClass}`}
                  >
                    {checkWhetherPageShouldBeShown(index)
                      ? index + 1
                      : !checkWhetherPageShouldBeShown(index - 1) &&
                        !checkWhetherPageShouldBeShown(index) &&
                        !checkWhetherPageShouldBeShown(index - 2)
                        ? null
                        : "."}
                  </div>
                );
              }
            )}

            <div className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span className="sr-only">Next</span>
              <ChevronRightIcon
                className="h-5 w-5"
                aria-hidden="true"
                onClick={() =>
                  page < Math.ceil(totalItems / ITEMS_PER_PAGE) &&
                  handlePage(page + 1)
                }
              />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
export function ProductGrid({ products }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <Link to={`/product-detail/${product.id}`} key={product.id}>
              <div className="group relative border-solid border-2 p-2 border-gray-200">
                <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
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
                <div className="grid grid-cols-4 gap-1 mt-2">
                  <button className="col-span-3 bg-pink-500 text-white p-2 rounded">
                    Add to Cart
                  </button>
                  <div className="col-span-1 flex justify-center items-center">
                    <CartIcon color="pink" width="6" height="6" />
                  </div>
                </div>{" "}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div >
  );
}

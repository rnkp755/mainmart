import { Fragment, useState } from 'react';
import { Dialog, Disclosure, Menu, Transition, Tab, Popover } from '@headlessui/react';
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectItems } from '../cart/cartSlice';
import { selectLoggedInUser } from '../auth/authSlice';


const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = {
  categories: [
    {
      id: 'kitchen',
      name: 'Kitchen',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'appliances',
          name: 'Appliances',
          items: [
            { name: 'Toaster', href: '#' },
            { name: 'Sanswich Maker', href: '#' },
            { name: 'Rice Cooker', href: '#' },
            { name: 'Electric Kettle', href: '#' },
            { name: 'Juice Maker', href: '#' },
            { name: 'Induction', href: '#' },
            { name: 'Mixer Grinder', href: '#' },
            { name: 'Food Processor', href: '#' },
            { name: 'Blender', href: '#' },
            { name: 'Hand Mixer', href: '#' },
            { name: 'OTG', href: '#' },
            { name: 'Air Fry', href: '#' },
            { name: 'Microwave', href: '#' },
          ],
        },
        {
          id: 'builtin',
          name: 'BuiltIn',
          items: [
            { name: 'Built in Microwaves /BBQ', href: '#' },
            { name: 'Built in Oven', href: '#' },
            { name: 'Chimney', href: '#' },
            { name: 'Hobbs', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'home',
      name: 'Home',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'appliances',
          name: 'Appliances',
          items: [
            { name: 'Ceramic/Oil Fan', href: '#' },
            { name: 'Air Purifier', href: '#' },
            { name: 'Heater', href: '#' },
          ],
        },
        {
          id: 'cleaning aid',
          name: 'Cleaning Aid',
          items: [
            { name: 'Vaccum Cleaner', href: '#' },
            { name: 'Dish Washer', href: '#' },
            { name: 'Cloth Dryer', href: '#' },
          ],
        },
        {
          id: 'garment',
          name: 'Garmet',
          items: [
            { name: 'Garment Streamer', href: '#' },
            { name: 'Stream and Dry Iron', href: '#' },
          ],
        },
        {
          id: 'other',
          name: 'Other',
          items: [
            { name: 'Trimmer', href: '#' },
            { name: 'Hair Dryer', href: '#' },
            { name: 'Shaver', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'personal care',
      name: 'Personal Care',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'fragrance',
          name: 'Fragrance',
          items: [
            { name: 'Eau de Toilette', href: '#' },
            { name: 'Eau de Parfum', href: '#' },
            { name: 'Eau de Cologne', href: '#' },
            { name: 'Parfum', href: '#' },
            { name: 'Eau Fraiche', href: '#' },

          ],
        },
        {
          id: 'body care',
          name: 'Body Care',
          items: [
            { name: 'Body Gel', href: '#' },
            { name: 'Body Lotion', href: '#' },
            { name: 'Bath and Shower', href: '#' },
          ],
        },
        {
          id: 'skin care',
          name: 'Skin Care',
          items: [
            { name: 'Moisturizer', href: '#' },
            { name: 'Cleanser', href: '#' },
            { name: 'Mask Toner', href: '#' },
            { name: 'Sun Screen', href: '#' },
            { name: 'Lips', href: '#' },
          ],
        },
        {
          id: 'makeup',
          name: 'MakeUp',
          items: [
            { name: 'Face', href: '#' },
            { name: 'Eyes', href: '#' },
            { name: 'Lips', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'watches',
      name: 'Watches',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'watches by movment',
          name: 'Watches by Movment',
          items: [
            { name: 'Quartz Watch', href: '#' },
            { name: 'Solar Watch', href: '#' },
            { name: 'Automatic Watch', href: '#' },
            { name: 'Smart Watch', href: '#' },
          ],
        },
        {
          id: 'watches by functionality',
          name: 'Watches by Functionality',
          items: [
            { name: 'Analouge Watch', href: '#' },
            { name: 'Digital Watch', href: '#' },
            { name: 'Chronograph Watch', href: '#' },
          ],
        },
        {
          id: 'watches by style',
          name: 'Watches by Style',
          items: [
            { name: 'Aviator Watch', href: '#' },
            { name: 'Military Watch', href: '#' },
            { name: 'Diving Watch', href: '#' },
            { name: 'Luxary Watch', href: '#' },
            { name: 'Dress Watch', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: '', href: '#' },
    { name: '', href: '#' },
  ],
}

const userNavigation = [
  { name: 'My Profile', link: '/profile' },
  { name: 'My Orders', link: '/orders' },
  { name: 'Sign out', link: '/logout' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function NavBar({ children }) {
  const items = useSelector(selectItems);
  const [open, setOpen] = useState(false)

  const loggedInuser = useSelector(selectLoggedInUser);

  return (
    <>
      <div className="min-h-full">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over 500
        </p>
        <Disclosure as="nav" className="bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="hidden md:block">

                  </div>
                  <div className="-mr-2 flex md:hidden z-50"
                    onClick={() => setOpen((prev) => !prev)}
                  >
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <svg
                          className="block h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>

                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 lg:ml-[-20rem] md:ml-[-6rem]">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden md:flex md:ml-10 md:space-x-8">
                      {navigation.categories.map((category) => (
                        <Popover className="relative" key={category.id}>
                          {({ open }) => (
                            <>
                              <Popover.Button
                                className={classNames(
                                  open ? 'text-gray-900' : 'text-gray-500',
                                  'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none'
                                )}
                              >
                                <span>{category.name}</span>
                              </Popover.Button>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                              >
                                <Popover.Panel className="absolute z-10 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                      {category.featured.map((item) => (
                                        <a
                                          key={item.name}
                                          href={item.href}
                                          className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                        >
                                          <img
                                            src={item.imageSrc}
                                            alt={item.imageAlt}
                                            className="flex-shrink-0 h-6 w-6"
                                          />
                                          <div className="ml-4">
                                            <p className="text-base font-medium text-gray-900">{item.name}</p>
                                          </div>
                                        </a>
                                      ))}
                                    </div>
                                    <div className="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8 overflow-scroll">
                                      {category.sections.map((section) => (
                                        <div key={section.id}>
                                          <p className="text-base font-medium text-gray-900">{section.name}</p>
                                          <ul role="list" className="mt-4 space-y-4">
                                            {section.items.map((item) => (
                                              <li key={item.name} className="text-sm truncate">
                                                <a href={item.href} className="font-medium text-gray-500 hover:text-gray-900">
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>

                            </>
                          )}
                        </Popover>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    {navigation.pages.map((page) => (
                      <div key={page.name} className="flow-root">
                        <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                          {page.name}
                        </a>
                      </div>
                    ))}
                  </div>
                  <div className="ml-4 flex items-center md:ml-6">
                    {
                      loggedInuser.role === "admin" ? (

                        <Link to="/admin">
                          <button
                            type="button"
                            className="mx-2 bg-violet-500 py-3 px-7 rounded-full text-white font-semibold flex items-center justify-center"
                          > Admin Panel</button>
                        </Link>
                      ) : (

                        <div class="p-1 bg-white shadow-lg rounded-2xl dark:bg-gray-800 mx-2 cursor-default">
                          <div class="flex flex-row justify-start">
                            <span class="relative p-4 bg-purple-200 rounded-xl mr-2">
                              <svg width="40" fill="currentColor" height="40" class="absolute h-4 text-purple-500 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z">
                                </path>
                              </svg>
                            </span>
                            <p class="my-1 text-xl font-bold text-left text-gray-700 dark:text-gray-100">
                              34,500
                            </p>

                          </div>
                        </div>

                      )
                    }
                    <Link to="/cart">
                      <button
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <ShoppingCartIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                    </Link>
                    {items.length > 0 && <span className="inline-flex items-center rounded-md mb-7 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                      {items.length}
                    </span>}

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.imageUrl}
                            alt=""
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link
                                  to={item.link}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>

                </div>


              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  <Tab.Group as="div" className="mt-2">
                    <div className="border-b border-gray-200">
                      <Tab.List className="-mb-px flex space-x-8 px-4">
                        {navigation.categories.map((category) => (
                          <Tab
                            key={category.name}
                            className={({ selected }) =>
                              classNames(
                                selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                                'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                              )
                            }
                          >
                            {category.name}
                          </Tab>
                        ))}
                      </Tab.List>
                    </div>
                    <Tab.Panels as={Fragment}>
                      {navigation.categories.map((category) => (
                        <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10 overflow-scroll">
                          <div className="grid grid-cols-2 gap-x-4">
                            {category.featured.map((item) => (
                              <div key={item.name} className="group relative text-sm">
                                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                  <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                                </div>
                                <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                  <span className="absolute inset-0 z-10" aria-hidden="true" />
                                  {item.name}
                                </a>
                                <p aria-hidden="true" className="mt-1">
                                  Shop now
                                </p>
                              </div>
                            ))}
                          </div>
                          {category.sections.map((section) => (
                            <div key={section.name}>
                              <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                                {section.name}
                              </p>
                              <ul
                                role="list"
                                aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                className="mt-6 flex flex-col space-y-6"
                              >
                                {section.items.map((item) => (
                                  <li key={item.name} className="flow-root">
                                    <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>
                </div>

              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              MainMart
            </h1>
          </div>
        </header> */}
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div >
    </>
  );
}



export default NavBar;
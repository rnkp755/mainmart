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
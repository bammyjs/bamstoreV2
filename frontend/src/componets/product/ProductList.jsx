import React, { useEffect, useState } from "react";
// import styles from "./ProductList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
// import Search from "../../search/Search";
// import ProductItem from "../productItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  selectFilteredProducts,
} from "../../redux/features/product/filterSlice";
import ReactPaginate from "react-paginate";
import CardProducts from "./CardProducts";

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const filteredProducts = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();
  // console.log(products);

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 9;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }));
  }, [dispatch, products, sort]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  return (
    <div className="" id="product">
      <div className="">
        <div className="">
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />

          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />

          <p>
            <b>{filteredProducts.length}</b> Products found.
          </p>
        </div>
        {/* Search Icon */}
        <div>
          <inpute
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* Sort Products */}
        <div className="">
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>

      <div className="">
        {products.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <>
            {currentItems.map((product) => {
              return (
                <div key={product._id}>
                  <CardProducts {...product} product={product} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="activePage"
      />
    </div>
  );
};

export default ProductList;


/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
  { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' },
]
const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AllProducts() {
  const { data: products, error, isLoading } = useGetAllProductsQuery();
  const [loading, setLoading] = useState(isLoading);
  const [currentProducts, setCurrentProducts] = useState([]);

  const ITEMS_PER_PAGE = 12; // Set your desired items per page

  // State for managing current page
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("latest");
  const [totalPages, setTotalPages] = useState([]);

  // State to manage categories and selected category
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // Assuming 'products' contains the full list of products fetched from your API
  useEffect(() => {
    const filteredProducts = products.filter(
      (product) =>
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.category)) &&
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand))
    );

    const sortFunction = sortOptions.find(
      (option) => option.id === selectedSortOption
    )?.sortFunction;
    const sortedAndFilteredProducts = filteredProducts.sort(sortFunction);

    // Now, apply pagination to 'sorted'
    const totalPages = Math.ceil(
      sortedAndFilteredProducts.length / ITEMS_PER_PAGE
    );

    // Update state that holds the total pages
    setTotalPages(totalPages);

    // Optional: If currentPage is greater than totalPages, reset to page 1 (to avoid showing an empty page)
    if (currentPage > totalPages) {
      setCurrentPage(1); // Adjust currentPage state accordingly
    }

    const currentProducts = sortedAndFilteredProducts.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

    // Assuming you have a state to hold the current viewable products
    setCurrentProducts(currentProducts);
  }, [
    products,
    selectedCategories,
    selectedBrands,
    selectedSortOption,
    currentPage,
    ITEMS_PER_PAGE,
  ]);

  const [open, setOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Effect to organize products into categories once they are fetched
  useEffect(() => {
    if (products) {
      const uniqueCategories = [
        ...new Set(products.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    }
  }, [products]);

  useEffect(() => {
    if (products) {
      const uniqueBrands = [
        ...new Set(products.map((product) => product.brand)),
      ];
      setBrands(uniqueBrands);
    }
  }, [products]);

  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    const isChecked = e.target.checked;

    // Logic to add or remove from selectedCategories
    let newSelectedCategories = [...selectedCategories];
    if (isChecked) {
      newSelectedCategories = [...newSelectedCategories, category];
    } else {
      newSelectedCategories = newSelectedCategories.filter(
        (c) => c !== category
      );
    }
    setSelectedCategories(newSelectedCategories);

    // Update the URL. You might choose to represent the selection as a comma-separated list or another format.
    const queryParam = newSelectedCategories.join(",");
    navigate(`/products?categories=${queryParam}`);
  };

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    const isChecked = e.target.checked;
    let newSelectedBrands = [...selectedBrands];
    if (isChecked) {
      newSelectedBrands = [...newSelectedBrands, brand];
    } else {
      newSelectedBrands = newSelectedBrands.filter((b) => b !== brand);
    }
    setSelectedBrands(newSelectedBrands);

    // Update the URL. You might choose to represent the selection as a comma-separated list or another format.
    const queryParam = newSelectedBrands.join(",");
    navigate(`/products?brands=${queryParam}`);
  };

  const handleSortChange = (event) => {
    setSelectedSortOption(event.target.value);
  };

  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoriesFromURL = queryParams.get("categories");
    if (categoriesFromURL) {
      setSelectedCategories(categoriesFromURL.split(","));
    }
    const brandsFromURL = queryParams.get("brands");
    if (brandsFromURL) {
      setSelectedBrands(brandsFromURL.split(","));
    }
  }, [location]);

  // Pagination change handler
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1); // +1 because event.selected is zero-based
  };

  const showNextBtn = (currentPage) => 1;
  const showPrevBtn = currentPage > 1;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  const paginationVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 2,
      },
    },
  };


  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
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
                    <h3 className="sr-only">Categories</h3>
                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
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
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
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

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

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
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
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
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
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

              {/* Product grid */}
              <div className="lg:col-span-3">{/* Your content */}</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}





<h3 className="text-center w-full text-pry-deep text-base md:text-2xl my-10 capitalize">
          All Products
        </h3>
        <div className="w-full flex text-gray-400  justify-between items-center  md:justify-between p-4 border-y bo border-gray-200 ">
          <p className="w-full hidden md:block">
            {currentProducts.length} products found
          </p>
          <div className="w-full   flex items-center justify-between md:justify-end  ">
            {/* Sort Products */}

            <button
              type="button"
              className="-m-2 ml-4 p-2 sm:ml-6  md:hidden"
              onClick={() => setOpen(!open)}
            >
              <h3 className="">Filter</h3>
            </button>

            {/*mobile filter starts*/}

            {/* <div
              className={`
                md:hidden z-30 bg-neutral text-dark  top-14 bottom-0 flex flex-col items-start p-4 font-bold  absolute  w-4/5 h-screen  pl-4 duration-500 ${
                  open ? "left-0 bottom-0 z-30" : "left-[-100%]"
                }
                `}
            >
              <div className="flex w-full justify-between items-center">
                <h3 className="text-lg">Filter</h3>
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6  md:hidden"
                  onClick={() => setOpen(!open)}
                >
                  {open && (
                    <IoCloseOutline
                      style={{ fontSize: "25px", color: "black" }}
                    />
                  )}
                  <span className="sr-only">Filters</span>
                </button>
              </div>
              <div className="dropdown dropdown-bottom dropdown-open flex w-full">
                <div
                  tabIndex={0}
                  role="button"
                  className="w-full  flex items-center justify-between m-1"
                >
                  <h3 className="">Categories</h3>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-neutral  w-full"
                >
                  {[
                    "All",
                    ...new Set(products.map((product) => product.category)),
                  ].map((category) => (
                    <li
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                    >
                      <NavLink to={`/products/${category}`}>{category}</NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div> */}

            {/* mobile filter ends*/}

            {/* Sort Products */}
            <div className="flex w-full max-w-xs items-center justify-end">
              <SortProducts
                sortOptions={sortOptions}
                selectedSortOption={selectedSortOption}
                onSortChange={handleSortChange}
              />
            </div>
          </div>
        </div>
        <div aria-labelledby="products-heading" className="pb-24 pt-6 ">
          <div className="grid  grid-cols-1  lg:grid-cols-5">
            {/* Filters */}
            <ProductFilter
              categories={categories}
              brands={brands}
              onCategoryChange={handleCategoryChange}
              onBrandChange={handleBrandChange}
            />

            {/* <CardSkeleton cards={8} products={products} /> */}
            {/* Product grid */}
            <div className="lg:col-span-4  ">
              {loading ? (
                <div className="flex  justify-center ">
                  <span className="loading loading-ball loading-xs"></span>
                  <span className="loading loading-ball loading-sm"></span>
                  <span className="loading loading-ball loading-md"></span>
                  <span className="loading loading-ball loading-lg"></span>
                </div>
              ) : (
                <>
                  <section className="w-full   flex flex-col items-center justify-center  ">
                    <div className="container max-w-7xl flex flex-col item-center justify-center gap-8 ">
                      <div className="w-full md:p-2">
                        <div className="grid pb-8 justify-between overflow-auto  grid-cols-2 gap-2 md:gap-4 md:grid-cols-3 lg:grid-cols-3 ">
                          {currentProducts.map((product) => {
                            return (
                              <CardProducts
                                key={product._id}
                                product={product}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </section>

                  <motion.div
                    variants={paginationVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <ReactPaginate
                      breakLabel="..."
                      previousLabel={
                        showPrevBtn ? (
                          <span>
                            <IoChevronBack style={{ fontSize: "15px" }} />
                          </span>
                        ) : null
                      }
                      nextLabel={
                        showNextBtn ? (
                          <span>
                            <IoChevronForward style={{ fontSize: "15px" }} />
                          </span>
                        ) : null
                      }
                      pageRangeDisplayed={5}
                      pageCount={totalPages}
                      onPageChange={handlePageClick}
                      containerClassName="join gap-4 flex items-center justify-center mt-8 mb-4"
                      pageClassName="btn btn-secondary"
                      activeClassName="btn-active "
                    />
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>
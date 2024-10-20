import { useState, useEffect, Fragment, useRef } from "react";

import {
  IoChevronForward,
  IoChevronBack,
  IoSearchOutline,
} from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router-dom";

import CardProducts from "../componets/product/CardProducts";
import { useGetAllProductsQuery } from "../redux/features/product/productsApi";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "../componets/product/CardSkeleton";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ProductFilter from "../componets/product/ProductFilter";
import SortProducts from "../componets/product/SortProducts";
import { sortOptions } from "../componets/product/FilterData";
import BreadCrumb from "../componets/BreadCrumb";
import MobileProductFilter from "../componets/product/MobileProductFilter";
import { Meta } from "../componets/Meta";
import axios from "axios";
import SearchProducts from "../componets/product/SearchProducts";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/products/`;

export default function AllProducts() {
  // State for managing current page
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: 50, max: 1500000 }); // Default price range
  // State to manage categories and selected category
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("latest");
  const [totalPages, setTotalPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [show, setShow] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState("");
  const [searchError, setSearchError] = useState(null);

  const [searchResults, setSearchResults] = useState([]);
  const {
    data: products,
    isError,
    error,
    isLoading,
  } = useGetAllProductsQuery();
  const ITEMS_PER_PAGE = 12; // Set desired items per page

  const toggleShow = () => setShow(!show);

  // Debounce input value
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);
    return () => clearTimeout(handler);
  }, [inputValue]);

  // Fetch products based on debouncedValue
  useEffect(() => {
    if (debouncedValue.length > 2) {
      setLoading(true);
      axios
        .get(`${API_URL}?searchQuery=${debouncedValue}`)
        .then((response) => {
          setSearchResults(response.data);
          setLoading(false);
        })
        .catch((searchError) => {
          setSearchError(searchError);
          setLoading(false);
        });
    } else {
      setSearchResults([]);
    }
  }, [debouncedValue]);

  // useEffect(() => {
  //   if (show || open) {
  //     // Apply the classes to disable scrolling and blur the background
  //     document.body.classList.add("no-scroll");
  //   } else {
  //     // Remove the classes when the menu is closed
  //     document.body.classList.remove("no-scroll");
  //   }
  // }, [show, open]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
        setOpen(false);
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

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

  useEffect(() => {
    const filteredProducts = products?.filter(
      (product) =>
        product.price >= priceRange.min &&
        product.price <= priceRange.max &&
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.category)) &&
        (selectedBrands.length === 0 ||
          selectedBrands.includes(product.brand)) &&
        (selectedColors.length === 0 || selectedColors.includes(product.color))
    );

    const sortFunction = sortOptions.find(
      (option) => option.id === selectedSortOption
    )?.sortFunction;
    const sortedAndFilteredProducts = filteredProducts?.sort(sortFunction);

    // Now, apply pagination to 'sorted'
    const totalPages = Math.ceil(
      sortedAndFilteredProducts?.length / ITEMS_PER_PAGE
    );

    // Update state that holds the total pages
    setTotalPages(totalPages);

    // Optional: If currentPage is greater than totalPages, reset to page 1 (to avoid showing an empty page)
    if (currentPage > totalPages) {
      setCurrentPage(1); // Adjust currentPage state accordingly
    }

    const currentProducts = sortedAndFilteredProducts?.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

    // Assuming you have a state to hold the current viewable products
    setCurrentProducts(currentProducts);
  }, [
    products,
    priceRange,
    selectedCategories,
    selectedBrands,
    selectedColors,
    selectedSortOption,
    currentPage,
    ITEMS_PER_PAGE,
  ]);

  const navigate = useNavigate();

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };
  const handlePriceInputChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prevRange) => ({
      ...prevRange,
      [name]: value,
    })); // Update external state if needed
  };
  const handleSliderChange = (value) => {
    setPriceRange({ min: value[0], max: value[1] });
  };

  const handleApplyFilters = () => {
    setMobileFiltersOpen(false);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange({ min: 50, max: 1500000 });
    setSelectedColors([]); // Reset filters
    setMobileFiltersOpen(false);
  };

  const handleColorChange = (e) => {
    const color = e.target.value;
    const isChecked = e.target.checked;

    let newSelectedColors = [...selectedColors];
    if (isChecked) {
      newSelectedColors.push(color);
    } else {
      newSelectedColors = newSelectedColors.filter((c) => c !== color);
    }
    setSelectedColors(newSelectedColors);
  };

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

  const handleSortChange = (selectedId) => {
    setSelectedSortOption(selectedId);
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
    }, 5000);
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
    <>
      <Meta
        title="All product Page - Bamstore.ng products"
        description="Welcome to the BamstoreNG No1 gadget store in Nigeria."
        keywords="products, bamstore, all product, welcome to bamstore ng"
        url="http://bamstore.ng/products"
      />
      <div
        // id="main-content"
        className=" relative bg-light h-fit flex-col gap-6   "
      >
        <div className=" md:hidden   border-0  bg-light px-4 top-10 left-0 w-full   mx-auto">
          <div className=" input border-gray bg-light  container max-w-7xl relative  left-0 right-0 m-auto  flex w-full flex-wrap items-center ">
            <span className="">
              <IoSearchOutline style={{ fontSize: "20px" }} />
            </span>
            <input
              type="search"
              className="input-ghost  m-0 -mr-0.5  block w-[1px]  flex-auto rounded-lg   bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-transparent focus:text-neutral-700  focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-200 "
              placeholder="Search for..."
              aria-label="Search"
              aria-describedby="button-addon3"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          {isLoading && (
            <div className="flex  justify-center ">
              <span className="loading loading-ball loading-xs"></span>
              <span className="loading loading-ball loading-sm"></span>
              <span className="loading loading-ball loading-md"></span>
              <span className="loading loading-ball loading-lg"></span>
            </div>
          )}
          {error && (
            <p className="text-center">Error loading search results.</p>
          )}

          {searchResults ? (
            <div className="absolute w-full flex overlayChild z-50  text-gray-400  justify-between items-center   focus:border-y  border-gray-200  ">
              <div className="w-full flex flex-col gap-4 items-center justify-center">
                <ul className="flex flex-col w-full max-w-7xl   items-center h-auto  gap-2 overflow-y-auto hide-scrollbar ">
                  <li className="grid  justify-between overflow-auto w-full mt-auto  grid-cols-1 gap-2 md:gap-4 md:grid-cols-3 lg:grid-cols-3 hide-scrollbar">
                    {searchResults.map((result) => (
                      <SearchProducts
                        toggleShow={toggleShow}
                        product={result}
                        key={result.id}
                      />
                    ))}

                    {/* <button className="btn btn-primary w-[90%]">
                        View all search result
                      </button> */}
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-dark text-center">0 product found</p>
          )}
        </div>
        <div className="mx-auto container max-w-7xl  bg-light px-4 md:pt-10 ">
          <BreadCrumb
            crumbs={[
              { label: "Home", path: "/" },
              { label: "OurStore", path: "/products" },
              { label: "All products" },
            ]}
          />

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
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs  flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg  text-gray-700 hover:text-gray-900">
                        Filters
                      </h2>
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
                    <MobileProductFilter
                      categories={categories}
                      brands={brands}
                      colors={colors}
                      handleCategoryChange={handleCategoryChange}
                      handleBrandChange={handleBrandChange}
                      handleColorChange={handleColorChange}
                      handlePriceInputChange={handlePriceRangeChange}
                      priceRange={priceRange}
                      handleSliderChange={handleSliderChange}
                      selectedBrands={selectedBrands}
                      selectedCategories={selectedCategories}
                      selectedColors={selectedColors}
                    />
                    <div className="px-4 py-2 flex justify-between">
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={handleResetFilters}
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleApplyFilters}
                      >
                        Apply
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
          {/* Mobile filter dialog ends*/}

          <main className="max-w-7xl ">
            <h3 className="text-center w-full text-pry-deep text-base md:text-2xl  my-3 md:my-5 capitalize">
              All Products
            </h3>
            <div className="flex items-baseline justify-between border-y border-gray-200 p-4 md:p-8">
              <p className="w-full hidden md:block text-sm font-medium text-gray-700 hover:text-gray-900">
                {currentProducts?.length} products found
              </p>

              <button
                type="button"
                className=" text-gray-400 hover:text-gray-500 sm:ml-6 md:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="text-sm font-medium text-gray-700 hover:text-gray-900">
                  Filters
                </span>
              </button>
              <div className=" justify-between items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div className="">
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="">
                        <Menu.Item>
                          <SortProducts
                            sortOptions={sortOptions}
                            selectedSortOption={selectedSortOption}
                            onSortChange={handleSortChange}
                          />
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid  grid-cols-1  gap-y-10 lg:grid-cols-5">
                {/* Filters */}
                <ProductFilter
                  categories={categories}
                  brands={brands}
                  colors={colors}
                  onCategoryChange={handleCategoryChange}
                  onBrandChange={handleBrandChange}
                  onColorChange={handleBrandChange}
                  onPriceRangeChange={handlePriceRangeChange}
                  priceRange={priceRange}
                  handleSliderChange={handleSliderChange}
                  handlePriceInputChange={handlePriceInputChange}
                  selectedBrands={selectedBrands}
                  selectedCategories={selectedCategories}
                  selectedColors={selectedColors}
                />

                {/* Product grid */}
                <div className="lg:col-span-4  ">
                  <section className="w-full   flex flex-col items-center justify-center  ">
                    <div className="container max-w-7xl flex flex-col item-center justify-center gap-8 ">
                      <div className="w-full md:p-2">
                        {loading ? (
                          <div className="grid pb-8 justify-between overflow-auto  grid-cols-2 gap-2 md:gap-4 md:grid-cols-3 lg:grid-cols-3 ">
                            <CardSkeleton cards={8} products={products} />
                          </div>
                        ) : (
                          <>
                            <div className="grid pb-8 justify-between overflow-auto  grid-cols-2 gap-2 md:gap-4 md:grid-cols-3 lg:grid-cols-3 ">
                              {currentProducts?.map((product) => {
                                return (
                                  <CardProducts
                                    key={product._id}
                                    product={product}
                                  />
                                );
                              })}
                            </div>
                          </>
                        )}
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
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

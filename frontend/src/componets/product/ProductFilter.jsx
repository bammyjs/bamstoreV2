import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { IoChevronDown, IoFilterSharp } from "react-icons/io5";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const ProductFilter = ({
  categories,
  brands,
  colors,
  onCategoryChange,
  onBrandChange,
  onColorChange,
  priceRange,
  handlePriceInputChange,
  handleSliderChange,
  selectedCategories,
  selectedColors,
  selectedBrands,
}) => {
  return (
    <div>
      <form className="hidden lg:block mr-4">
        <div className="flex items-center justify-between">
          <h3 className=" text-gray-700 hover:text-gray-900">Filters</h3>
          <IoFilterSharp style={{ fontSize: "15px" }} />
        </div>
        <Disclosure as="div" className="border-b border-gray-200 py-6">
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between  py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">Category</span>
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
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`category-${category}`}
                        name="category"
                        type="checkbox"
                        value={category}
                        onChange={onCategoryChange}
                        checked={selectedCategories.includes(category)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {category}
                        <span>({category?.length})</span>
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="border-b border-gray-200 py-6">
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between  py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">Brands</span>
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
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <input
                        id={`brand-${brand}`}
                        name="brand"
                        type="checkbox"
                        value={brand}
                        onChange={onBrandChange}
                        checked={selectedBrands.includes(brand)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`brand-${brand}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {brand}
                        <span>({brand.length})</span>
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="border-b border-gray-200 py-6">
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">Color</span>
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
                  {colors.map((color) => (
                    <div key={color} className="flex items-center">
                      <input
                        id={`color-${color}`}
                        name="color"
                        type="checkbox"
                        value={color}
                        onChange={onColorChange}
                        checked={selectedColors.includes(color)}
                        className=" h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`color-${color}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {color}
                        <span>({color?.length})</span>
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="border-b border-gray-200 py-6">
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">Price</span>
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
                <div className="my-4 w-full  flex flex-col items-left gap-2">
                  <Slider
                    range
                    min={50}
                    max={1500000} // Assume your max price
                    value={[priceRange.min, priceRange.max]}
                    allowCross={false}
                    onChange={handleSliderChange}
                  />
                  <div className="flex justify-between items-center gap-2 mb-2">
                    <div className="input p-1 bg-light input-bordered border-dark flex items-center gap-1">
                      <span className="text-dark">&#8358;</span>
                      <input
                        type="text"
                        name="min"
                        value={priceRange.min}
                        onChange={handlePriceInputChange}
                        className="text-dark w-full max-w-xs"
                      />
                    </div>
                    <p className="text-dark">to</p>
                    <div className="input p-1 bg-light input-bordered border-dark flex items-center gap-1">
                      <span className="text-dark">&#8358;</span>
                      <input
                        type="text"
                        name="min"
                        value={priceRange.max}
                        onChange={handlePriceInputChange}
                        className="text-dark w-full max-w-xs"
                      />
                    </div>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </form>
    </div>
  );
};

export default ProductFilter;

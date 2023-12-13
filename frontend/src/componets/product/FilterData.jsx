export const color = ["white", "Black", "Red"];

export const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White" },
      { value: "black", label: "Black" },
      { value: "red", label: "Red" },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "S", label: "S" },
      { value: "M", label: "M" },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "gaming", label: "Gaming" },
      { value: "accessories", label: "Accessories" },
      { value: "phones", label: "Phones" },
      { value: "laptops", label: "Laptops" },
    ],
  },
  {
    id: "price",
    name: "Price",
    options: [
      { value: "10000 - 29999", label: "10000 To 29999" },
      { value: "29999 - 49999", label: "29999 To 49999" },
      { value: "49999 - 99999", label: "49999 To 99999" },
      { value: "99999 - 499999", label: "99999 To 499999" },
    ],
  },
  {
    id: "stock",
    name: "Availability",
    options: [
      { value: "in_stock", label: "In Stock" },
      { value: "out_of_stock", label: "Out of Stock" },
    ],
  },
];

export const sortOptions = [
  { name: "price: Low to High", query: "price_low", current: false },
  { name: "price: High to Low", query: "price_high", current: false },
];

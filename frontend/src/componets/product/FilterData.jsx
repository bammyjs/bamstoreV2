export const filters = [
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
    id: "brand",
    name: "Brand",
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
  {
    id: "latest",
    name: "Latest",
    sortFunction: (a, b) => new Date(b.date) - new Date(a.date),
  },
  {
    id: "lowest-price",
    name: "Price: Low to High",
    sortFunction: (a, b) => a.price - b.price,
  },
  {
    id: "highest-price",
    name: "Price: High to Low",
    sortFunction: (a, b) => b.price - a.price,
  },
  {
    id: "a-z",
    name: "A - Z",
    sortFunction: (a, b) => a.name.localeCompare(b.name),
  },
  {
    id: "z-a",
    name: "Z - A",
    sortFunction: (a, b) => b.name.localeCompare(a.name),
  },
];

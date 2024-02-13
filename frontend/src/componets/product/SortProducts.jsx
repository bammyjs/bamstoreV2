const SortProducts = ({ sortOptions, selectedSortOption, onSortChange }) => {
  return (
    <div className="flex justify-center py-2 items-center w-full">
      <ul className="w-full flex flex-col gap-2  ">
        {sortOptions.map((option) => (
          <li key={option.id}>
            <button
              className={`btn btn-neutral w-full ${
                selectedSortOption === option.id ? "btn-active " : ""
              }`}
              onClick={() => onSortChange(option.id)}
            >
              {option.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortProducts;

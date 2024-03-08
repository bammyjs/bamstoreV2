import { useSelector } from "react-redux";
import TabList from "./TabList";

const AddProduct = () => {
  const isLoading = useSelector((state) => state.selectIsLoading);

  return (
    <div className="item-center flex flex-col">
      <h3 className="text-xl text-dark text-center mb-4 md:text-3xl font-bold">
        Create New Product
      </h3>
      {isLoading && (
        <div className="flex  justify-center ">
          <span className="loading loading-ball loading-xs"></span>
          <span className="loading loading-ball loading-sm"></span>
          <span className="loading loading-ball loading-md"></span>
          <span className="loading loading-ball loading-lg"></span>
        </div>
      )}
      <TabList />
    </div>
  );
};

export default AddProduct;

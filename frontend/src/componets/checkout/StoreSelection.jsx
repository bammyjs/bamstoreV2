import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStores } from "../../redux/features/pickupStore/pickUpStoreSlice";

const StoreSelection = ({
  product,
  selectedState,
  selectedCity,
  cart,
  isLoading,
  onStoreSelect,
  handleStoreSelect,
}) => {
  const dispatch = useDispatch();
  const { stores } = useSelector((state) => state.stores);
  const [selectedStore, setSelectedStore] = useState(null);
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [storeFetched, setStoreFetched] = useState(false);

  useEffect(() => {
    // Reset storeFetched when the city or state changes
    if (storeFetched) {
      setStoreFetched(false);
    }
  }, [selectedCity, selectedState]);
  const fetchStores = () => {
    if (selectedState && selectedCity) {
      dispatch(getStores({ state: selectedState, city: selectedCity }));
      setStoreFetched(true); // Indicate that stores have been fetched
    } else {
      <div role="alert" className="alert alert-info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>Please select both state and city to fetch stores.</span>
      </div>;
    }
  };

  const handleStoreSelection = (storeId) => {
    if (!product || !product.stores) {
      setAvailabilityMessage("Loading product availability...");
      return;
    }

    const store = stores.find((store) => store._id === storeId);

    if (store) {
      handleStoreSelect(store); // Pass the entire store object, not just the ID
    } else {
      console.error("Store not found!");
    }
    setSelectedStore(store);

    const storeProductInfo = product.stores.find(
      (storeItem) => storeItem.store._id.toString() === storeId.toString()
    );

    if (storeProductInfo && storeProductInfo.quantity > 0) {
      const cartItem = cart.cartItems.find((item) => item._id === product._id);

      if (cartItem && cartItem.cartQuantity > storeProductInfo.quantity) {
        setAvailabilityMessage(
          `Product "${product.name}" is available for immediate pickup, but only ${storeProductInfo.quantity} units are available. You have ${cartItem.cartQuantity} in your cart.`
        );
      } else {
        setAvailabilityMessage(
          `Product "${product.name}" is available for immediate pickup.`
        );
      }
    } else {
      setAvailabilityMessage(
        `Product "${product.name}" is not available in this store. It will be available for pickup in 3 days.`
      );
    }

    // Show the modal after selecting a store
    document.getElementById("my_modal_5").showModal();
  };

  return (
    <div className="flex flex-col ">
      <button
        className="btn btn-primary"
        onClick={fetchStores}
        disabled={isLoading || storeFetched}
      >
        Available Stores
      </button>

      {storeFetched && stores.length === 0 && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>No stores found for the selected state and city.</span>
        </div>
      )}

      <div className="max-w-sm p-2 flex flex-col gap-2 items-start">
        {stores
          .filter(
            (store) =>
              store.state === selectedState && store.city === selectedCity
          )
          .map((store) => (
            <div className="flex gap-1 items-start" key={store._id}>
              <input
                type="radio"
                name="store"
                value={store._id}
                id={`store-${store._id}`}
                onChange={(e) => handleStoreSelection(e.target.value)}
                disabled={stores.length === 0}
                className="radio radio-secondary radio-sm"
              />
              <label
                htmlFor={`store-${store._id}`}
                className="flex flex-col gap-1"
              >
                <h3 className="font-bold">{store.storeName}</h3>
                <div className="text-xs text-gray font-normal">
                  <p>{store.address}</p>
                  <p>{store.state}</p>
                  <p>{store.city}</p>
                </div>
                <div>
                  <h4>Contact Information</h4>
                  <p className="text-xs text-gray font-normal">
                    {store.contactPerson.name} {store.contactPerson.phone}
                  </p>
                </div>
              </label>
            </div>
          ))}
      </div>

      {availabilityMessage && (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-light">
            <h3 className="font-bold text-lg">Product Availability</h3>
            <p className="py-4">{availabilityMessage}</p>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => document.getElementById("my_modal_5").close()}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default StoreSelection;

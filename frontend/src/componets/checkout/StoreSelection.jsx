import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegionDropdown } from "react-country-region-selector";
import { getStores } from "../../redux/features/pickupStore/pickUpStoreSlice";

const StoreSelection = ({
  product,
  cart,
  isLoading,
  shippingDetails,
  handleStateChange,
}) => {
  const dispatch = useDispatch();
  const { stores } = useSelector((state) => state.stores);
  const [selectedStore, setSelectedStore] = useState(null);
  const [availabilityMessage, setAvailabilityMessage] = useState("");

  useEffect(() => {
    if (shippingDetails.state) {
      dispatch(getStores({ state: shippingDetails.state }));
    }
  }, [shippingDetails.state, dispatch]);

  const handleStoreSelection = (storeId) => {
    if (!product || isLoading || !product.stores) {
      setAvailabilityMessage("Loading product availability...");
      return;
    }
    const store = stores.find((store) => store._id === storeId);
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
  };

  return (
    <div className="flex flex-col gap-4 ">
      <div className="relative  w-full  md:w-[30%]">
        <RegionDropdown
          country={"Nigeria"}
          value={shippingDetails.state}
          required
          name="state"
          defaultOptionLabel="State"
          // value={region}
          onChange={(val) => handleStateChange(val)}
          className="peer  relative h-10 w-full rounded border border-gray px-4 text-sm text-gray bk-light placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-gray invalid:text-bg-light focus:border-emerald-500 focus:outline-none invalid:focus:bg-light focus:bg-light invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-light disabled:text-slate-400"
        />
        <label
          htmlFor="stateSelect"
          className="absolute bg-light left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-gray peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
        >
          State
        </label>
      </div>
      {/* <div className="relative w-full md:w-[30%]">
        <input
          type="text"
          name="city"
          placeholder="city"
          required
          value={shippingDetails.city}
          className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-dark placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-gray invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          onChange={handleInputChange}
        />
        <label
          htmlFor="city"
          className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-gray peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
        >
          City
        </label>
      </div> */}
      <div className="max-w-sm p-2 flex flex-col gap-2 items-start ">
        {stores
          .filter((store) => store.state === shippingDetails.state)
          .map((store) => (
            <div className="flex gap-1 items-start" key={store._id}>
              <input
                type="radio"
                name="store"
                value={store._id}
                id={`store-${store._id}`}
                onChange={(e) => handleStoreSelection(e.target.value)}
                disabled={stores.length === 0}
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
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
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">{availabilityMessage}</p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default StoreSelection;

const PickUpStore = require("../models/pickUpStoreModel"); // Assuming the model is in the 'models' directory
const asyncHandler = require("express-async-handler"); // For handling async operations with proper error management

// @desc    Create a new store
// @route   POST /api/pickupstores
// @access  Private (Admins or Authorized users)
const createStore = asyncHandler(async (req, res) => {
  const {
    storeName,
    photo,
    phone,
    address,
    state,
    country,
    email,
    contactPerson,
    storeManager,
    nextRemittanceDate,
  } = req.body;
  if (!storeName || !phone || !address || !email) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  const newStore = new PickUpStore({
    storeName,
    photo,
    phone,
    address,
    state,
    country,
    email,
    contactPerson,
    storeManager,
    remittance: {
      nextRemittanceDate,
    },
  });

  const createdStore = await newStore.save();

  res.status(201).json(createdStore);
});

// @desc    Get all stores
// @route   GET /api/pickupstores
// @access  Private
const getStores = asyncHandler(async (req, res) => {
  const stores = await PickUpStore.find().populate(
    "storeManager",
    "name email"
  ); // Populating storeManager with name and email

  res.json(stores);
});

// @desc    Get a single store by ID
// @route   GET /api/pickupstores/:id
// @access  Private
const getStoreById = asyncHandler(async (req, res) => {
  const store = await PickUpStore.findById(req.params.id).populate(
    "storeManager",
    "name email"
  );

  if (store) {
    res.json(store);
  } else {
    res.status(404);
    throw new Error("Store not found");
  }
});

// @desc    Update a store
// @route   PUT /api/pickupstores/:id
// @access  Private
const updateStore = asyncHandler(async (req, res) => {
  const store = await PickUpStore.findById(req.params.id);

  if (!store) {
    res.status(404);
    throw new Error("Store not found");
  }

  const updatedStore = await PickUpStore.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.json(updatedStore);
});

// @desc    Delete a store
// @route   DELETE /api/pickupstores/:id
// @access  Private
const deleteStore = asyncHandler(async (req, res) => {
  const store = await PickUpStore.findById(req.params.id);

  if (store) {
    await store.remove();
    res.json({ message: "Store removed" });
  } else {
    res.status(404);
    throw new Error("Store not found");
  }
});

// @desc    Update remittance for a store
// @route   PUT /api/pickupstores/:id/remittance
// @access  Private
const updateRemittance = asyncHandler(async (req, res) => {
  const { totalAmountDue, lastRemittanceDate, remittanceStatus } = req.body;

  const store = await PickUpStore.findById(req.params.id);

  if (store) {
    store.remittance.totalAmountDue =
      totalAmountDue || store.remittance.totalAmountDue;
    store.remittance.lastRemittanceDate =
      lastRemittanceDate || store.remittance.lastRemittanceDate;
    store.remittance.remittanceStatus =
      remittanceStatus || store.remittance.remittanceStatus;

    const updatedStore = await store.save();

    res.json(updatedStore);
  } else {
    res.status(404);
    throw new Error("Store not found");
  }
});

module.exports = {
  createStore,
  getStores,
  getStoreById,
  updateStore,
  deleteStore,
  updateRemittance,
};

import { configureStore } from "@reduxjs/toolkit";

import aiReducer from "./slices/ai";

const Store = configureStore({
  reducer: {
    Ai: aiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default Store;

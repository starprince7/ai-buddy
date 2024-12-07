import { configureStore } from "@reduxjs/toolkit";

import aiReducer from "./slices/ai";

const store = configureStore({
  reducer: {
    Ai: aiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

import { postToAi } from "@/utility/post-to-ai";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type ActionArgs = {
  prompt: string;
  file: string;
};

const initialState = {
  appIsInitialized: false,
};

export const analyzeFile = createAsyncThunk<any, ActionArgs>(
  "ai/analyzeFile",
  async ({ file, prompt }) => {
    const result = await postToAi(file, prompt);
    return result.data;
  }
);

const appSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    analyzeFile: (state, action: PayloadAction<boolean>) => {
      state.appIsInitialized = action.payload;
    },
  },
});

export const { appInitialized } = appSlice.actions;
export default appSlice.reducer;
export const selectApp = (store: any) => store.App;

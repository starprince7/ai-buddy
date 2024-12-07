import { postToAi } from "@/utility/post-to-ai";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface AiStore {
  error: string;
  messages: [];
  requestStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: AiStore = {
  error: "",
  requestStatus: "idle",
  messages: [],
};

export const analyzeFile = createAsyncThunk<any, string>(
  "ai/analyzeFile",
  async (file) => {
    const prompt = ``
    const result = await postToAi(file, prompt);
    return result.data;
  }
);

const appSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(analyzeFile.pending, (state) => {
      state.requestStatus = "loading";
    });
    builder.addCase(analyzeFile.rejected, (state, action) => {
      state.requestStatus = "failed";
      state.error = action.error.message!;
    });
    builder.addCase(analyzeFile.fulfilled, (state, action) => {
      state.requestStatus = "succeeded";
      state.messages = action.payload;
    });
  },
});

export default appSlice.reducer;
export const selectApp = (store: any) => store.App;

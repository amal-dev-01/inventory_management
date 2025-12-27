import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productAPI from "../products/productService"


// LIST
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      return await productAPI.list(params);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// GET SINGLE PRODUCT
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id, { rejectWithValue }) => {
    try {
      return await productAPI.get(id);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// CREATE PRODUCT
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (data, { rejectWithValue }) => {
    try {
      return await productAPI.create(data);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// UPDATE PRODUCT
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await productAPI.update(id, data);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// DELETE PRODUCT
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await productAPI.delete(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

  //  SLICE

const productSlice = createSlice({
  name: "products",

  initialState: {
    items: [],
    selected: null,

    count: 0,
    next: null,
    previous: null,

    loading: false,
    error: null,

    params: {
      search: "",
      page: 1,
      page_size: 10,
    },
  },

  reducers: {
    setSearch: (state, action) => {
      state.params.search = action.payload;
    },
    setPage: (state, action) => {
      state.params.page = action.payload;
    },
    clearSelected: (state) => {
      state.selected = null;
    },
  },

  extraReducers: (builder) => {
    builder
        //  LIST
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.results || [];
        state.count = action.payload.count || 0;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

        //  GET SINGLE
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

        //  CREATE
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

        //  UPDATE
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selected?.id === action.payload.id) {
          state.selected = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

        //  DELETE
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});


export const {
  setSearch,
  setPage,
  clearSelected,
} = productSlice.actions;

export default productSlice.reducer;

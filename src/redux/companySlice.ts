import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface CompanyState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
}

const initialState: CompanyState = {
  loading: false,
  success: false,
  error: null,
  message: null,
};

// Async thunk for registering company
export const registerCompany = createAsyncThunk(
  "company/register",
  async (formData: any, { rejectWithValue }) => {
    try {
      const data = new FormData();

      // Match backend fields
      data.append("companyName", formData.organizationName);
      data.append("companyEmail", formData.companyEmail);
      data.append("phoneNumber", formData.companyPhoneNumber);
      data.append("province", formData.province);
      data.append("district", formData.district);
      data.append("sector", formData.sector);
      data.append("fullName", formData.person);
      data.append("companyContact", formData.phone);
      data.append("email", formData.email);
      data.append("password", formData.password);

      if (formData.files && formData.files.length > 0) {
        data.append("proofDocument", formData.files[0]);
      }

      const res = await axios.post(
        "https://missiontrack-backend.onrender.com/api/company/register",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    resetCompanyState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(registerCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCompanyState } = companySlice.actions;
export default companySlice.reducer;

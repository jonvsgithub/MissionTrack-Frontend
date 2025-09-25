// src/redux/companySlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface CompanyState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  companies?: any[];
}

const initialState: CompanyState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  companies: [],
};

const API_URL = "https://missiontrack-backend.onrender.com/api/company/register";

type RejectString = string;

// Helper: normalize rwandan numbers to +250xxxxxxxxx
const normalizeRWPhone = (input?: string) => {
  if (!input) return "";
  let s = input.trim();
  // remove spaces
  s = s.replace(/\s+/g, "");
  if (s.startsWith("07")) return "+250" + s.slice(1);
  if (s.startsWith("250") && !s.startsWith("+")) return "+" + s;
  return s;
};

// Async thunk for registering company
export const registerCompany = createAsyncThunk<any, any, { rejectValue: RejectString }>(
  "company/register",
  async (formData: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://missiontrack-backend.onrender.com/api/company/register",
        formData
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const getAllCompanies = createAsyncThunk(
  "company/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://missiontrack-backend.onrender.com/api/company/allCompanies",
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      return res.data;
    } catch (err: any) {
      console.error("registerCompany error object:", err);

      // If backend responded with JSON error body, prefer that message
      if (err.response) {
        const resp = err.response;
        // Try common places for messages
        const maybeMessage =
          resp.data?.message ||
          resp.data?.error ||
          (typeof resp.data === "string" ? resp.data : null);

        const statusPart = resp.status ? ` (status ${resp.status})` : "";
        const message = maybeMessage
          ? `${maybeMessage}${statusPart}`
          : `Request failed${statusPart}`;

        console.error("registerCompany server response:", resp.data);
        return rejectWithValue(message);
      }

      // Network / other errors
      const fallback = err.message || "Network error";
      return rejectWithValue(fallback);
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
    // create new company
    builder
      .addCase(registerCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // backend usually returns { message, data, success }
        state.message = action.payload?.message ?? "Company created";
      })
      .addCase(registerCompany.rejected, (state, action) => {
        state.loading = false;
        // action.payload is the string we passed into rejectWithValue
        state.error = (action.payload as string) || "Something went wrong";
      });

// GETTING all companies
    builder
      .addCase(getAllCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.companies = action.payload.data || []; //save companies
        state.error = null;
      })
      .addCase(getAllCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCompanyState } = companySlice.actions;
export default companySlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ActionState {
    loading: boolean;
    success: boolean;
    error: string | null;
    message: string | null;
    status?: any[];
    state?: any;
}

const initialState: ActionState = {
    loading: false,
    success: false,
    error: null,
    message: null,
    status: [],
    state: null,
};

// src/redux/actionSlice.ts
export const approveOrRejectCompany = createAsyncThunk(
    "company/approveOrReject",
    async (
        {
            companyId,
            action,
            comment,
        }: { companyId: string; action: "approve" | "reject"; comment?: string }) => {
        try {
            const status = action === "approve" ? "approved" : "rejected";
            const payload: any = { status };
            if (comment) {
                payload.comment = comment;
            }
            console.log("Payload being sent:", payload);
            console.log("Token:", localStorage.getItem("token"));

            const response = await axios.patch(
                `https://missiontrack-backend.onrender.com/api/company/approveReject/${companyId}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                }
            );
            console.log("Payload being sent:", { status, comment });
            return response.data;

        } catch (error: any) {
            console.error("approveOrRejectCompany error object:", error);
        }
    }
);
// codes for block and unblock company can be added here similarly

export const blockOrUnblockCompany = createAsyncThunk(
    "company/blockOrUnblock",
    async (
        {
            companyId,
            action,
            comment,
        }: { companyId: string; action: "block" | "active"; comment?: string }) => {
        try {
            const state = action === "block" ? "blocked" : "active";
            const payload: any = { state };
            if (comment) {
                payload.comment = comment;
            }

            console.log("Payload being sent:", payload);
            console.log("Token:", localStorage.getItem("token"));

            const response = await axios.patch(
                `https://missiontrack-backend.onrender.com/api/company/block/${companyId}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                }
            );
            console.log("Payload being sent:", { state });
            return response.data;

        } catch (error: any) {
            console.error("blockOrUnblockCompany error object:", error);
        }
    }
);
const actionSlice = createSlice({
    name: "action",
    initialState,
    reducers: {
        clearActionState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(approveOrRejectCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(approveOrRejectCompany.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;
                state.status = action.payload.status;
            })
            .addCase(approveOrRejectCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
            // about block and unblock
        builder
            .addCase(blockOrUnblockCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(blockOrUnblockCompany.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;
                state.state = action.payload.state;
            })
            .addCase(blockOrUnblockCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearActionState } = actionSlice.actions;
export default actionSlice.reducer;
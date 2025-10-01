import {createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ProfileState{
    id:string|null;
    fullName?:string|null;
    profilePhoto?:string|null;
    email?:string|null;
    phoneNumber?:string|null;
    bankAccount?:string|null;

    loading:boolean;
    error:string|null;
}

const initialState:ProfileState={
    id:null,
    fullName:null,
    profilePhoto:null,
    email:null,
    phoneNumber:null,
    loading:false,
    error:null,
};


export const updatedProfile=createAsyncThunk(
    "profile/update",
    async (profileData:FormData)=>{
        try{
            const response=await axios.patch(
                "https://missiontrack-backend.onrender.com/api/users/profile",
                profileData,
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            return response.data;
        }catch(error:any){
            return Promise.reject(error.response?.data?.message || error.message);
        }
    }
);


const profileSlice=createSlice({
    name:"profile",
    initialState,
    reducers:{
        clearActionState:(state)=>{
            state.loading=false;
            state.error=null;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(updatedProfile.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(updatedProfile.fulfilled,(state,action)=>{
            state.loading=false;
            state.id=action.payload.id;
            state.fullName=action.payload.fullName;
            state.profilePhoto=action.payload.profilePhoto;
            state.email=action.payload.email;
            state.phoneNumber=action.payload.phoneNumber;
            state.bankAccount=action.payload.bankAccount;
        })
        .addCase(updatedProfile.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message || "Failed to update profile";
        });
    }
})
export const { clearActionState } = profileSlice.actions;
export default profileSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const app_url = '/api/v1/Products'

export const fetchProducts = createAsyncThunk('Products/fatchProducts',async()=>{
    const {data}  = await axios.get(app_url)

    return data
})



export const productsReducer = createSlice({
    name:"Prodcuts",
    initialState: {
        Products:[],
        isLoading: false,
        error: null
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchProducts.pending, (state) =>{
            state.isLoading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state,action) =>{
            state.isLoading = false
            state.Products = action.payload.Products
            state.error = null
        })
        builder.addCase(fetchProducts.rejected, (state, action) =>{
            state.isLoading = false
            state.Products = []
            state.error = action.error.message
        })
    }
})



export default productsReducer.reducer
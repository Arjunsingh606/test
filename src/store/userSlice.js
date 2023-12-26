// userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    data: null,
    status: 'idle',
    error: null,
};

export const postDataAsync = createAsyncThunk('user/postData', async (requestData) => {
    try {
        const response = await fetch('http://example.com/api/endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw error.message;
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(postDataAsync.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(postDataAsync.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        });
        builder.addCase(postDataAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

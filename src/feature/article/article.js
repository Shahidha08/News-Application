// src/features/articles/articlesSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = '5509731212204848958dd4b417c30c75'; // Replace with your NewsAPI key

// Async thunk to fetch articles
export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (category) => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=${category}&language=en&apiKey=${apiKey}`);
      return response.data.articles;
    } catch (error) {
      throw Error('Error fetching articles');
    }
  }
);

// Slice creation
const article = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Add reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default article.reducer;

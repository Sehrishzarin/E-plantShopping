import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart or increment quantity if already exists
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.name === action.payload.name
      );
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    
    // Remove item from cart completely
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.name !== action.payload.name
      );
    },
    
    // Update quantity of specific item
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;
      const itemToUpdate = state.items.find((item) => item.name === name);
      
      if (itemToUpdate) {
        // Ensure quantity doesn't go below 1
        itemToUpdate.quantity = Math.max(1, amount);
      }
    },
    
    // Optional: Clear entire cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Export actions to be used in components
export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

// Export reducer to be used in store
export default cartSlice.reducer;
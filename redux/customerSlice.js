// customerSlice.js
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    customers: []
};

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        addCustomer: (state, action) => {
            state.customers.push(action.payload);
        },

        updateCustomer: (state, action) => {
            const { id, newCustomer } = action.payload;

            const customerIndex = state.customers.findIndex((customer) => customer._id === id);
            if (customerIndex !== -1) {
                state.customers[customerIndex] = { ...state.customers[customerIndex], ...newCustomer }
            }
        },

        removeCustomer: (state, action) => {
            const customerId = action.payload;
            state.customers = state.customers.filter((customer) => customer.id !== customerId);
        },
        // Action to set loading state
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        // Action to set error state
        setError: (state, action) => {
            state.error = action.payload;
        },
    }
})

export const { addCustomer, updateCustomer, removeCustomer, setLoading, setError } = customerSlice.actions
export default customerSlice.reducer;

// pcSlice.js
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    pcs: [{
        pcId: '',
        pcStatus: '',
        pcName: ''
    }]
};

const pcSlice = createSlice({
    name: 'pc',
    initialState,
    reducers: {
        addPc: (state, action) => {
            state.pcs.push(action.payload); // Add the new PC to the existing array
        },        

        updatedPcStatus: (state, action) => {
            const { pcId, newStatus } = action.payload;

            const pcToUpdate = state.pcs.find((pc) => pc.pcId === pcId);

            if (pcToUpdate) {
                pcToUpdate.pcStatus = newStatus;
            }
        }
    }
});

export const { addPc, updatedPcStatus } = pcSlice.actions;
export default pcSlice.reducer;

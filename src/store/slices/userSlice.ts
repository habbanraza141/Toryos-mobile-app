import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UsersState = {
    users: any[];
};

const initialState: UsersState = {
    users: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<any[]>) => {
            state.users = action.payload;
        },
        clearUsers: (state) => {
            state.users = [];
        },
    },
});

export const { setUsers, clearUsers } = userSlice.actions;
export default userSlice.reducer;

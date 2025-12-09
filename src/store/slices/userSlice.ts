import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CurrentUser {
    name: string;
    email: string;
    initials?: string;
}

type UsersState = {
    users: any[];
    currentUser: CurrentUser | null;
    isAuthenticated: boolean;
};

const initialState: UsersState = {
    users: [],
    currentUser: null,
    isAuthenticated: false,
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
        setCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
            state.currentUser = action.payload;
            state.isAuthenticated = true;
        },
        clearCurrentUser: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUsers, clearUsers, setCurrentUser, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;

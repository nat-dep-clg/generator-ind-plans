import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const themes = {
    winter: 'winter',
    dracula: 'dracula',
};

const userDefault = {
    role: 'guest',
    links: []
}

const getUserFromLocalStorage = () => {
    if(!localStorage.getItem('user')) localStorage.setItem('user',JSON.stringify(userDefault))
    return  JSON.parse(localStorage.getItem('user'));
};

const getThemeFromLocalStorage = () => {
    if(!localStorage.getItem('theme')) localStorage.setItem('theme',themes.winter)
    const theme = localStorage.getItem('theme') || themes.winter;
    document.documentElement.setAttribute('data-theme', theme);
    return theme;
};

const initialState = {
    user: getUserFromLocalStorage(),
    theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            // console.log('action.payload',action.payload)
            const user = { ...state.user, ...action.payload };
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        logoutUser: (state) => {
            state.user = userDefault;
            localStorage.setItem('user', JSON.stringify(userDefault));
            toast.success('Logged out successfully');
        },
        toggleTheme: (state) => {
            const { dracula, winter } = themes;
            state.theme = state.theme === dracula ? winter : dracula;
            document.documentElement.setAttribute('data-theme', state.theme);
            localStorage.setItem('theme', state.theme);
        },
    },
});

export const {
    loginUser,
    logoutUser,
    toggleTheme } = userSlice.actions;

export default userSlice.reducer;

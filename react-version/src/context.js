import React from 'react'
const Context = React.createContext({
    code: 0,
    loading: false,
    isLogin: false,
    username: ''
});
export {Context};
import React from "react";

/**
 * Authentication context:
 * Login data to be accessed by
 * children components
 */
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogOut: null,
});

export default AuthContext;

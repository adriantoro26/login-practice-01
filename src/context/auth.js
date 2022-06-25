import React, { useState, useEffect } from "react";

/**
 * Authentication context:
 * Login data to be accessed by
 * children components
 */
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogIn: null,
  onLogOut: null,
});

/**
 *
 * @param {Object} props - Properties received by caller component
 * @returns
 */
export const AuthContextManager = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);

    localStorage.setItem("isLoggedIn", "1");
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "0");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onLogIn: loginHandler,
        onLogOut: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

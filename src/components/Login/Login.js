import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  /**
   * Email reducer function
   *
   * @param {Object} state - Latest state value
   * @param {String} state.value - Latest Email
   * @param {Boolean} state.isValid - Email validity
   * @param {Object} action - Value received from dispatch
   * @param {Object} action.type - Event ID
   * @param {Object} action.value - New email value
   * @returns
   */
  const emailReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
      return {
        value: action.value,
        isValid: action.value.includes("@"),
      };
    }

    if (action.type === "INPUT_BLUR") {
      return {
        value: state.value,
        isValid: state.value.includes("@"),
      };
    }
    return {
      value: "",
      isValid: false,
    };
  };

  /**
   * Password reducer function
   *
   * @param {Object} state - Latest state value
   * @param {String} state.value - Latest Password
   * @param {Boolean} state.isValid - Password validity
   * @param {Object} action - Value received from dispatch
   * @param {Object} action.type - Event ID
   * @param {Object} action.value - New password value
   * @returns
   */
  const passwordReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
      return {
        value: action.value,
        isValid: action.value.trim().length > 6,
      };
    }

    if (action.type === "INPUT_BLUR") {
      return {
        value: state.value,
        isValid: state.value.trim().length > 6,
      };
    }
    return {
      value: "",
      isValid: false,
    };
  };

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  },);

  useEffect(() => {
    /**
     * Check input after timeout is set
     */
    console.log("Validate");
    const timer = setTimeout(() => {
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    }, 500);

    return () => {
      /**
       * Reset timer when inputs changes:
       *
       * This will be called before the next useEffect.
       * But not for the first useEffect.
       */
      clearTimeout(timer);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: "USER_INPUT",
      value: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: "USER_INPUT",
      value: event.target.value,
    });
  };

  const validateEmailHandler = () => {
    dispatchEmail({
      type: "INPUT_BLUR",
    });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({
      type: "INPUT_BLUR",
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

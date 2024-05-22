import { createContext, useReducer, useEffect, ReactNode } from "react";

const AuthContext = createContext(null);
const LOGIN_ACTION = "LOGIN";
const LOGOUT_ACTION = "LOGOUT";

interface ActionType {
  type: string;
  payload?: any;
}

interface AuthContextProviderType {
  children: ReactNode;
}

// reducer function to set the user state based on the action type
const authReducer = (state: any, action: ActionType) => {
  switch (action.type) {
    case LOGIN_ACTION:
      return { user: action.payload };
    case LOGOUT_ACTION:
      return { user: null };
    default:
      return state;
  }
};

// AuthContextProvider component to wrap the app with the context provider

const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  // state to hold the user object
  // dispatch function to update the user object
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  // get the user object from local storage if it exists on mount

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);

      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export {
  AuthContext,
  authReducer,
  AuthContextProvider,
  LOGIN_ACTION,
  LOGOUT_ACTION,
};

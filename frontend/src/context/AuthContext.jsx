import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const AuthContext =
  createContext();


// provider
export function AuthProvider({
  children
}) {

  const [user, setUser] =
    useState(null);

  // load user
  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {

      setUser(
        JSON.parse(storedUser)
      );
    }

  }, []);

  // login
  const login = (
    token,
    userData
  ) => {

    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  // logout
  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setUser(null);
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}


// hook
export const useAuth = () =>
  useContext(AuthContext);
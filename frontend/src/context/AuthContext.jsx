import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";



const AuthContext =
  createContext();



export function AuthProvider({
  children
}) {

  // =========================
  // STATES
  // =========================

  const [token, setToken] =
    useState(

      localStorage.getItem(
        "token"
      ) || null
    );


  const [user, setUser] =
    useState(

      JSON.parse(

        localStorage.getItem(
          "user"
        )
      ) || null
    );


  const [loading,
    setLoading] =
    useState(true);




  // =========================
  // LOAD USER
  // =========================

  useEffect(() => {

    const storedToken =
      localStorage.getItem(
        "token"
      );

    const storedUser =
      localStorage.getItem(
        "user"
      );


    if (
      storedToken &&
      storedUser
    ) {

      setToken(
        storedToken
      );

      setUser(

        JSON.parse(
          storedUser
        )
      );
    }

    setLoading(false);

  }, []);




  // =========================
  // LOGIN
  // =========================

  const login =
    (
      newToken,
      newUser
    ) => {

      // save storage
      localStorage.setItem(

        "token",

        newToken
      );

      localStorage.setItem(

        "user",

        JSON.stringify(
          newUser
        )
      );

      // update state
      setToken(
        newToken
      );

      setUser(
        newUser
      );
    };




  // =========================
  // UPDATE USER
  // =========================

  const updateUser =
    (updatedUser) => {

      // update storage
      localStorage.setItem(

        "user",

        JSON.stringify(
          updatedUser
        )
      );

      // update state
      setUser(
        updatedUser
      );
    };




  // =========================
  // LOGOUT
  // =========================

  const logout = () => {

    // clear storage
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    // clear state
    setToken(null);

    setUser(null);
  };




  return (

    <AuthContext.Provider
      value={{

        token,
        user,

        login,
        logout,

        updateUser,

        isAuthenticated:
          !!token,

        loading
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}



// =========================
// CUSTOM HOOK
// =========================

export const useAuth =
  () => useContext(
    AuthContext
  );
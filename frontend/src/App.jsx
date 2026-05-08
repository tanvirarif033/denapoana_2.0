import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import HomePage
from "./pages/public/HomePage";

import LoginPage
from "./pages/auth/LoginPage";

import RegisterPage
from "./pages/auth/RegisterPage";



function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
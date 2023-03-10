import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import { AuthProvider } from "./contexts/auth-context";
import Blog from "./pages/Blog";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UploadCV from "./pages/UploadCV";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route element={<Main />}>
            <Route path="/" element={<HomePage></HomePage>} />
            <Route path="/upload-cv" element={<UploadCV></UploadCV>} />
            <Route path="/blog" element={<Blog></Blog>} />
          </Route>
          <Route path="/login" element={<SignIn></SignIn>} />
          <Route path="/signup" element={<SignUp></SignUp>} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;

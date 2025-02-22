/* eslint-disable react/prop-types */
import { Footer, Navbar, Protected } from "./components";
import { BrowserRouter, Routes, Route } from "react-router";
import { Home, Error, Login, Signup, Crypto, Blogs, SubmitBlog } from "./pages";
import { useSelector } from "react-redux";

const App = () => {
  const StyleWrap = ({ children }) => <div className="main">{children}</div>;
  const isAuth = useSelector((state) => state.user.auth);

  return (
    <div className="containerBox">
      <BrowserRouter>
        <div className="layout">
          <Navbar />

          <Routes>
            <Route
              path="/"
              element={
                <StyleWrap>
                  <Home />
                </StyleWrap>
              }
            />
            <Route
              path="/crypto"
              element={
                <StyleWrap>
                  <Crypto />
                </StyleWrap>
              }
            />
            <Route
              path="/blogs"
              element={
                <Protected isAuth={isAuth}>
                  <StyleWrap>
                    <Blogs />
                  </StyleWrap>
                </Protected>
              }
            />
            <Route
              path="/submit"
              element={
                <Protected isAuth={isAuth}>
                  <StyleWrap><SubmitBlog /></StyleWrap>
                </Protected>
              }
            />
            <Route
              path="/login"
              element={
                <StyleWrap>
                  <Login />
                </StyleWrap>
              }
            />
            <Route
              path="/signup"
              element={
                <StyleWrap>
                  <Signup />
                </StyleWrap>
              }
            />
            <Route
              path="*"
              element={
                <StyleWrap>
                  <Error />
                </StyleWrap>
              }
            />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;

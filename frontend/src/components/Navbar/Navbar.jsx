import { useDispatch, useSelector } from "react-redux";
import {
  logoStyle,
  navlinkStyle,
  loginStyle,
  signupStyle,
  signoutStyle,
} from "./styles/styles";
import { NavLink } from "react-router";
import { signout } from "../../api/internal";
import { resetUser } from "../../redux/userSlice";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.user.auth);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    await signout();
    dispatch(resetUser());
  };

  return (
    <div>
      <nav className="flex justify-around items-center py-5 mx-auto w-4/5">
        <NavLink to="/" className={`${logoStyle} group`}>
          CoinB<span className="group-hover:text-yellow-600">o</span>unce
        </NavLink>
        <NavLink to="/" className={navlinkStyle}>
          Home
        </NavLink>
        <NavLink to="/crypto" className={navlinkStyle}>
          Cryptocurrencies
        </NavLink>
        <NavLink to="/blog" className={navlinkStyle}>
          Blog
        </NavLink>
        <NavLink to="/submit" className={navlinkStyle}>
          Submit a blog
        </NavLink>
        {isAuthenticated ? (
          <NavLink className={navlinkStyle}>
            <button className={signoutStyle} onClick={handleSignout}>
              Sign Out
            </button>
          </NavLink>
        ) : (
          <NavLink to="/login" className={navlinkStyle}>
            <button className={loginStyle}>Log In</button>
          </NavLink>
        )}
        <NavLink to="/signup" className={navlinkStyle}>
          <button className={signupStyle}>Sign Up</button>
        </NavLink>
      </nav>

      <div className="seperator" />
    </div>
  );
};

export default Navbar;

// Login Controller
import login from "./methods/login.js";

// Register Controller
import register from "./methods/register.js";

// Logout Controller
import logout from "./methods/logout.js";

// refresh Controller
import refresh from "./methods/refresh.js";
 
// Exports
const authController = {
  login,
  logout,
  register,
  refresh,
};

export default authController;

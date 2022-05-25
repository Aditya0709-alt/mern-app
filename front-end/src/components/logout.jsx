import userService from "../services/userService";

//deleting the token and go to home page
const Logout = () => {
  userService.logout();
  window.location = "/";
  return null;
};
export default Logout;

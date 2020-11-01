import Login from "./Pages/Login";
import Post from "./Pages/Post";

export const Routes = [
  {
    name: "login",
    path: "/login",
    page: <Login />,
    exact: true,
    hiddenFromMenu: true
  },
  {
    name: "post",
    path: "/",
    page: <Post />,
    exact: true,
    hiddenFromMenu: false
  }
]
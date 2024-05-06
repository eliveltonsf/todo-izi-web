import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../hooks/auth";

import App from "./app.routes";
import Auth from "./auth.routes";

const Router = () => {
  const { token } = useAuth();

  return <BrowserRouter>{token ? <App /> : <Auth />}</BrowserRouter>;
};

export default Router;

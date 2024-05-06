/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { Route, Routes } from "react-router-dom";
import { SignIn, SingUp } from "../pages";

const AuthRoutes = () => (
  <Routes>
    <Route path="/" element={<SignIn />} />
    <Route path="/register" element={<SingUp />} />
  </Routes>
);

export default AuthRoutes;

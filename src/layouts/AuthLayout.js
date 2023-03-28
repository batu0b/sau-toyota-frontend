import React, { useState } from "react";
import { Outlet, Route } from "react-router-dom";
import ErrorEntryPage from "../pages/ErrorEntryPage";
import TerminalLoginPage from "../pages/TerminalLoginPage";

export default function AuthLayout() {
  const [isAuth, setIsAuth] = useState(false);

  return <Outlet context={[isAuth, setIsAuth]} />;
}

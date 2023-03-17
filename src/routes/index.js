import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import TerminalLoginPage from "../pages/TerminalLoginPage";
import TerminalPage from "../pages/TerminalPage";
export default function Index() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/cvqsterminal"} />} />
        <Route path="/cvqsterminal" element={<TerminalPage />} />
        <Route path="/cvqsterminal/:depCode/:filterCode" element={<TerminalLoginPage />} />
      </Routes>
    </>
  );
}

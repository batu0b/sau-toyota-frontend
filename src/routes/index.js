import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { VirtualKeyboard } from "../components/VirtualKeyboard";
import AuthLayout from "../layouts/AuthLayout";
import ErrorEntryPage from "../pages/ErrorEntryPage";
import TerminalLoginPage from "../pages/TerminalLoginPage";
import TerminalPage from "../pages/TerminalPage";
export default function Index() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/cvqsterminal"} />} />
        <Route path="/cvqsterminal" element={<TerminalPage />} />
        <Route element={<AuthLayout />}>
          <Route
            path="/cvqsterminal/:depCode/:filterCode"
            element={<TerminalLoginPage />}
          />
          <Route
            path="/cvqsterminal/defectentry/:depCode/:filterCode"
            element={<ErrorEntryPage />}
          />
        </Route>
      </Routes>
    </>
  );
}

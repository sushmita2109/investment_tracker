import React from "react";
import Navbar from "../Components/Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>{children}</div>
    </>
  );
}

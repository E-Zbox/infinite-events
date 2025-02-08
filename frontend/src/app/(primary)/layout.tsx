"use client";
import React, { useEffect, useRef, useState } from "react";
// components
// import Navbar from "../components/navbar";
// import Footer from "../components/footer";
// styles
import { MainApp } from "@/app/styles/App.styles";

export default function PrimaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainApp>{children}</MainApp>
    </>
  );
}

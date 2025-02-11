"use client";
import React, { useEffect, useRef, useState } from "react";
// components
import Navbar from "../components/Navbar";
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
      <MainApp>
        <Navbar />
        {children}
      </MainApp>
    </>
  );
}

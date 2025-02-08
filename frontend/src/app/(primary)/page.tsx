"use client";
import React from "react";
// screens
import AuthenticationScreen from "../screens/AuthenticationScreen";
import HomeScreen from "../screens/HomeScreen";
// store
import { useDefaultStore } from "@/store";

export default function Home() {
  const { userState } = useDefaultStore();

  const { signedIn } = userState;

  if (signedIn) {
    return <HomeScreen />;
  }
  return <AuthenticationScreen />;
}

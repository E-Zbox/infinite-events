"use client";
import React from "react";
// screens
import AuthenticationScreen from "../screens/AuthenticationScreen";
import HomeScreen from "../screens/HomeScreen";
// store
import { useDefaultStore } from "@/store";

export default function Home() {
  const { userState } = useDefaultStore();

  const { isGuest, signedIn } = userState;

  if (signedIn || isGuest) {
    return <HomeScreen />;
  }
  return <AuthenticationScreen />;
}

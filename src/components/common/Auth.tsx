import { useRouter } from "next/router";
import React from "react";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../login/Login";
import { store } from "../services/pulState/store";
import MainLayout from "./header/MainLayout";

export default function Auth() {
  const router = useRouter();
  const isLogin = store.useState((s) => s.userData);
  console.log(isLogin);
  if (isLogin) {
    return (
      <MainLayout>
        <Dashboard />
      </MainLayout>
    );
  } else {
    return <Login />;
  }
}

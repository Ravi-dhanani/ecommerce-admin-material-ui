import Dashboard from "@/components/Dashboard/Dashboard";
import MainLayout from "@/components/common/header/MainLayout";
import Login from "@/components/login/Login";
import React from "react";

export default function dashboard() {
  return (
    <div>
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </div>
  );
}

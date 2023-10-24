import AuthGard from "@/components/AuthGard";
import Login from "@/components/login/Login";
import React from "react";

export default function login() {
  return (
    <div>
      <AuthGard>
        <Login />
      </AuthGard>
    </div>
  );
}

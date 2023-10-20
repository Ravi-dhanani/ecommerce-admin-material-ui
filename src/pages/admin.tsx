import Admin from "@/components/admin/Admin";
import MainLayout from "@/components/common/header/MainLayout";
import React from "react";
// import Admin from "./component/admin/Admin";

export default function admin() {
  return (
    <div>
      <MainLayout>
        <Admin />
      </MainLayout>
    </div>
  );
}

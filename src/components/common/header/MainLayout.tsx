import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Auth from "../Auth";
import { useRouter } from "next/router";
import AuthServices from "@/components/services/AuthServices";
import Login from "@/components/login/Login";

export default function MainLayout(props: { children?: any }) {
  const [open, setOpen] = React.useState(true);
  const router = useRouter();
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    const isLogin = AuthServices.getUserInfo();
    setUserInfo(isLogin);
  }, []);
  if (!userInfo) return <Login />;

  return (
    <div>
      <Auth>
        <Navbar open={open} setOpen={setOpen} />
        <Box sx={{ display: "flex" }}>
          <Sidebar open={open} />
          <Box component="main" sx={{ flexGrow: 1, pt: 10, pl: 2, pr: 2 }}>
            {props.children}
          </Box>
        </Box>
      </Auth>
    </div>
  );
}

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Login from "../login/Login";
import AuthServices from "../services/AuthServices";
import Dashboard from "../Dashboard/Dashboard";
import MainLayout from "./header/MainLayout";

export default function Auth(props: { children?: any }) {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    const isLogin = AuthServices.getUserInfo();
    setUserInfo(isLogin);
  }, []);
  if (!userInfo) {
    return <Login />;
  }
  console.log(userInfo);
  if (userInfo) {
    return props?.children ? props?.children : router.push("/dashboard");
  } else {
    return <Login />;
  }
}

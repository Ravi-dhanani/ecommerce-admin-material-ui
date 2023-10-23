import { stringify } from "querystring";

class AuthServices {
  static setToken(token: string) {
    localStorage.setItem("token", token);
  }
  static getToken() {
    return localStorage.getItem("token");
  }

  static setUserInfo(info: any) {
    localStorage.setItem("info", JSON.stringify(info));
  }
  static getUserInfo() {
    let detail: any = localStorage.getItem("info");
    return JSON.parse(detail);
  }

  static clearLoginData() {
    localStorage.removeItem("token");
  }
}
export default AuthServices;

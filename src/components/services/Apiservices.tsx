import config from "@/components/config";
import ICarousel from "../types/carousel";
import IProducts from "../types/products";
import HttpService from "./HttpService";
import ISubCategory from "../types/category";
import ICategory from "../types/category";
class ApiServices {
  static register(data: any) {
    return HttpService.post(`${config.API_URL}/admin/register`, data);
  }

  static login(data: any) {
    return HttpService.post(`${config.API_URL}/admin/login`, data);
  }

  static async getLstAdmin() {
    let res = await HttpService.get(
      `${config.API_URL}/admin/getAdmin`,
      localStorage.token
    );
    return res.data;
  }

  static async getLstVariant() {
    let res = await HttpService.get(
      `${config.API_URL}/api/getVariant`,
      localStorage.token
    );
    return res.data;
  }
  static async addVariant(data: any) {
    let res = await HttpService.post(
      `${config.API_URL}/api/addVariant`,
      data,
      localStorage.token
    );
    return res.data;
  }

  static async updateVariant(data: ICarousel, _id: any) {
    let res = await HttpService.put(
      `${config.API_URL}/api/updateVariant/${_id}`,
      data,
      localStorage.token
    );
    return res;
  }

  static async deleteVariant(_id: string) {
    let res = await HttpService.get(
      `${config.API_URL}/api/deleteVariant/${_id}`,
      localStorage.token
    );
    return res;
  }

  static async getLstCategory() {
    let res = await HttpService.get(
      `${config.API_URL}/api/getCategory`,
      localStorage.token
    );
    return res.data;
  }
  static async getLstSubCategory() {
    let res = await HttpService.get(
      `${config.API_URL}/api/getSubCategory`,
      localStorage.token
    );
    return res.data;
  }
  static async addCategory(data?: ICategory) {
    let res = await HttpService.post(
      `${config.API_URL}/api/addCategory`,
      data,
      localStorage.token
    );
    return res;
  }

  static async addSubCategory(data?: ISubCategory) {
    let res = await HttpService.post(
      `${config.API_URL}/api/addSubCategory`,
      data,
      localStorage.token
    );
    return res;
  }

  static async updateCategory(data?: ICategory, _id?: string) {
    let res = await HttpService.put(
      `${config.API_URL}/api/updateCategory/${_id}`,
      data,
      localStorage.token
    );
    return res;
  }

  static async updateSubCategory(data?: ISubCategory, _id?: string) {
    let res = await HttpService.put(
      `${config.API_URL}/api/updateSubCategory/${_id}`,
      data,
      localStorage.token
    );
    return res;
  }

  static async getCategory(_id: any) {
    let res = await HttpService.get(
      `${config.API_URL}/api/getCategory/${_id}`,
      localStorage.token
    );
    return res;
  }

  static async deleteCategory(_id?: string) {
    let res = await HttpService.get(
      `${config.API_URL}/api/deleteCategory/${_id}`,
      localStorage.token
    );
    return res;
  }
  static async deleteSubCategory(_id?: string) {
    let res = await HttpService.get(
      `${config.API_URL}/api/deleteSubCategory/${_id}`,
      localStorage.token
    );
    return res;
  }

  static async getLstProduct() {
    let res = await HttpService.get(
      `${config.API_URL}/api/getProduct`,
      localStorage.token
    );
    return res.data;
  }
  static async addProduct(data?: IProducts) {
    let res = await HttpService.post(
      `${config.API_URL}/api/addProduct`,
      data,
      localStorage.token
    );
    return res.data;
  }

  static async updateProduct(data?: IProducts, _id?: string) {
    let res = await HttpService.put(
      `${config.API_URL}/api/updateProduct/${_id}`,
      data,
      localStorage.token
    );
    return res;
  }

  static async deleteProduct(_id: string) {
    let res = await HttpService.get(
      `${config.API_URL}/api/deleteProduct/${_id}`,
      localStorage.token
    );
    return res;
  }

  static async deleteCarousel(_id: string) {
    let res = await HttpService.get(
      `${config.API_URL}/api/deleteCarousel/${_id}`,
      localStorage.token
    );
    return res;
  }

  static async getLstCarousel() {
    let res = await HttpService.get(
      `${config.API_URL}/api/getCarousel`,
      localStorage.token
    );
    return res.data;
  }

  static async addCarousel(data?: ICarousel) {
    let res = await HttpService.post(
      `${config.API_URL}/api/addCarousel`,
      data,
      localStorage.token
    );
    return res;
  }

  static async updateCarousel(data?: ICarousel, _id?: any) {
    let res = await HttpService.put(
      `${config.API_URL}/api/updateCarousel/${_id}`,
      data,
      localStorage.token
    );
    return res;
  }

  static async deleteDoctor(_id: string) {
    let res = await HttpService.post(
      `${config.API_URL}/api/deleteDoctor/${_id}`,
      localStorage.token
    );
    return res;
  }

  static async getLstDepartment() {
    let res = await HttpService.get(
      `${config.API_URL}/api/getDepartment`,
      localStorage.token
    );
    return res.data;
  }
}

export default ApiServices;

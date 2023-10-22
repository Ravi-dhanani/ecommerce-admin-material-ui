import { useQuery } from "react-query";
import ApiServices from "../Apiservices";
import ICarousel from "../../types/carousel";
import ICategory from "@/components/types/category";
import IProducts from "@/components/types/products";

export function useCarouselList() {
  return useQuery("list", () => {
    return ApiServices.getLstCarousel();
  });
}

export function useCategoryList() {
  return useQuery("list", () => {
    return ApiServices.getLstCategory();
  });
}
export function useSubCategoryList() {
  return useQuery("SubCategorylist", () => {
    return ApiServices.getLstSubCategory();
  });
}

export function useProductList() {
  return useQuery("list", () => {
    return ApiServices.getLstProduct();
  });
}
export function useAddCarousel(data?: ICarousel) {
  return ApiServices.addCarousel(data);
}
export function useUpdateCarousel(data?: ICarousel, _id?: string) {
  return ApiServices.updateCarousel(data, _id);
}
export function useAddCategory(data?: ICategory) {
  return ApiServices.addCategory(data);
}
export function useUpdateCategory(data?: ICategory, _id?: string) {
  return ApiServices.updateCategory(data, _id);
}
export function useAddSubCategory(data?: ICategory) {
  return ApiServices.addSubCategory(data);
}

export function useUpdateSubCategory(data?: ICategory, _id?: string) {
  return ApiServices.updateSubCategory(data, _id);
}

export function useUpdateProduct(data?: IProducts, _id?: string) {
  return ApiServices.updateProduct(data, _id);
}

export function useAddProduct(data?: IProducts) {
  return ApiServices.addProduct(data);
}

export function useDeleteSubCategory(_id?: string) {
  return ApiServices.deleteSubCategory(_id);
}

export function useDeleteCategory(_id?: string) {
  return ApiServices.deleteCategory(_id);
}

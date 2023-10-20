import { useQuery } from "react-query";
import ApiServices from "../Apiservices";

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
export function useProductList() {
  return useQuery("list", () => {
    return ApiServices.getLstProduct();
  });
}

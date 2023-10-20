import { Store } from "pullstate";
interface IStoreValue {
  isSuccess: boolean;
  successMessage: string;
  isModelOpen: boolean;
  base64: any;
}
const StoreValue: IStoreValue = {
  isSuccess: false,
  successMessage: "",
  isModelOpen: false,
  base64: "",
};
export const store = new Store(StoreValue);

export function setSuccess(data: boolean) {
  return store.update((s) => {
    s.isSuccess = data;
  });
}
export function setSuccessMessage(data: string) {
  return store.update((s) => {
    s.successMessage = data;
  });
}
export function setIsModel(data: boolean) {
  return store.update((s) => {
    s.isModelOpen = data;
  });
}

export function setBase64(data: any) {
  return store.update((s) => {
    s.base64 = data;
  });
}

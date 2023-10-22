import { Store } from "pullstate";
interface IStoreValue {
  isSuccess: boolean;
  isLoading: boolean;
  successMessage: string;
  isModelOpen: boolean;
}
const StoreValue: IStoreValue = {
  isSuccess: false,
  isLoading: false,
  successMessage: "",
  isModelOpen: false,
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

export function setIsLoading(data: boolean) {
  return store.update((s) => {
    s.isLoading = data;
  });
}

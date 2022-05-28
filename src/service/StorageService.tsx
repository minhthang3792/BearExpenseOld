import AsyncStorage from "@react-native-async-storage/async-storage";

const setItem = (key: string, value: string) => {
  AsyncStorage.setItem(key, value);
};

const setItemSync = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};

const getItemSync = async (key: string) => {
  return await AsyncStorage.getItem(key);
};

const removeItem = async (key: string) => {
  return AsyncStorage.removeItem(key);
};

export const StorageService = {
  getItemSync,
  setItem,
  removeItem,
};

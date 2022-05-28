import React, { createContext } from "react";
import { StatusBarStyle } from "react-native";

interface AppContextInterface {
  isAppLoaded: boolean;
  isDarkTheme: boolean;
  statusBarStyle: StatusBarStyle;
  toggleDark: () => void;
}

export const initContext: AppContextInterface = {
  isAppLoaded: true,
  isDarkTheme: false,
  statusBarStyle: "default",
  toggleDark: (): void => {},
};

export const AppContext = createContext(initContext);

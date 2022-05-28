import { Platform, StatusBar, StatusBarStyle } from "react-native";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { AppearanceProvider } from "react-native-appearance";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppContext, initContext } from "./src/app/app-context";
import RootNavigator from "./src/navigation/RootNavigator";
import Toast from "react-native-toast-message";
import AppLoading from "expo-app-loading";
import appConst from "./src/common/constant/AppConst";

if (__DEV__) {
  // @ts-ignore
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}

export default function App() {
  const [isAppLoaded, setAppLoaded] = useState<boolean>(false);
  const [isDarkTheme, setDarkTheme] = useState<boolean>(
    initContext.isDarkTheme
  );

  const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>(
    initContext.statusBarStyle
  );

  const toggleDark = () => {
    setDarkTheme(!isDarkTheme);
    checkStatusBar();
  };

  const checkStatusBar = (): void => {
    switch (Platform.OS) {
      case "ios":
        isDarkTheme
          ? setStatusBarStyle("dark-content")
          : setStatusBarStyle("light-content");
        break;
      case "android":
      default:
        setStatusBarStyle("default");
    }
  };

  const checkPlatformReady = () => {
    switch (Platform.OS) {
      case "ios":
        break;
      case "android":
        break;
      default:
    }
  };
  const cacheResourcesAsync = async () => {
    // const images = [require("./assets/snack-icon.png")];
    //
    // const cacheImages = images.map((image) => {
    //   return Asset.fromModule(image).downloadAsync();
    // });
    // return Promise.all(cacheImages);
  };

  useEffect(() => {
    checkPlatformReady();

    async function initApp() {
      await appConst.init();
    }

    initApp();
  }, []);

  if (!isAppLoaded) {
    return (
      <AppLoading
        startAsync={cacheResourcesAsync}
        onFinish={() => setAppLoaded(true)}
        onError={(err) => {
          console.log(err);
        }}
      />
    );
  }

  return (
    <React.Fragment>
      <IconRegistry icons={[EvaIconsPack]} />
      <AppearanceProvider>
        <AppContext.Provider
          value={{
            isAppLoaded,
            isDarkTheme,
            statusBarStyle,
            toggleDark,
          }}
        >
          <ApplicationProvider
            {...eva}
            theme={isDarkTheme ? eva.dark : eva.light}
          >
            <SafeAreaProvider>
              <StatusBar barStyle={statusBarStyle} />
              <RootNavigator isDarkTheme={isDarkTheme} />
              <Toast />
            </SafeAreaProvider>
          </ApplicationProvider>
        </AppContext.Provider>
      </AppearanceProvider>
    </React.Fragment>
  );
}

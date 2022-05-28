import * as Application from "expo-application";
import { Platform } from "react-native";

class AppConst {
  DEVICE_UNIQUE_ID: string | null = null;

  async init() {
    switch (Platform.OS) {
      case "android":
        this.DEVICE_UNIQUE_ID = Application.androidId;
        break;
      case "ios":
        this.DEVICE_UNIQUE_ID = await Application.getIosIdForVendorAsync();
        break;
      default:
    }
  }
}

const appConst = new AppConst();
export default appConst;

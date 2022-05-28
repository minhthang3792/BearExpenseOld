import Toast from "react-native-toast-message";

const show = (
  type: string,
  message1?: string,
  message2?: string,
  onShow?: () => void,
  onHide?: () => void,
  onPress?: () => void
) => {
  Toast.show({
    type: type,
    text1: message1,
    text2: message2,
    position: "bottom",
    autoHide: true,
    visibilityTime: 2000,
    onShow: onShow,
    onHide: onHide,
    onPress: onPress,
  });
};

const hide = () => {
  Toast.hide();
};

export const ToastUtil = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  show,
  hide,
};

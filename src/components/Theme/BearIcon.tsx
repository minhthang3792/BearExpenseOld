import React, { useContext } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Icon } from "@ui-kitten/components";
import { AppContext } from "../../app/app-context";
import { BearUtil } from "../../common/BearUtill";

interface BearIconType {
  name: string;
  category?: boolean | false;
  style?: StyleProp<ViewStyle> | undefined;
  fill?: string | undefined;
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  categoryIcon: {
    width: 32,
    height: 32,
  },
});

// @ts-ignore
export default function BearIcon(props: BearIconType): JSX.Element {
  const appContext = useContext(AppContext);
  const cloneProps = Object.assign({}, props);

  if (BearUtil.isEmpty(props.style)) {
    cloneProps.style = props.category ? styles.categoryIcon : styles.icon;
    cloneProps.fill = appContext.isDarkTheme ? "white" : "black";
  }
  return <Icon {...cloneProps} name={props.name} />;
}

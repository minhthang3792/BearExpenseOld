import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { withStyles } from "@ui-kitten/components";

const BearView = (props: ViewProps) => {
  // @ts-ignore
  const { eva, style, ...restProps } = props;

  return <View {...restProps} style={[eva.style.container, style]} />;
};

export const FlexRowView = withStyles(BearView, (theme) => ({
  container: styles.container,
}));

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 1
  },
});

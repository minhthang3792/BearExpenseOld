import React from "react";
import { Text, TextProps, withStyles } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

const AwesomeText = (props: TextProps) => {
  const { eva, style, ...restProps } = props;

  // @ts-ignore
  return <Text {...restProps} style={[eva.style.container, style]} />;
};

export const ThemedAwesomeText = withStyles(AwesomeText, (theme) => ({
  container: styles.container,
}));

const styles = StyleSheet.create({
  container: {
    fontSize: 24,
  },
});

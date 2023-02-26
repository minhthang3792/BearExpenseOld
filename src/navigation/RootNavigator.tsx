import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import BottomNavigator from "./BottomNavigator";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon, Text, useTheme } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native";
import KittenIcon from "../components/typography/KittenIcon";

const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFF",
  },
};

const navigatorDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#222B45",
  },
};
const Stack = createNativeStackNavigator();

export default function RootNavigator(props: any) {
  const theme = useTheme();

  const onCreateRoomChat = (navigation: any) => {
    navigation.navigate("CreateRoomChatModal");
  };

  const renderPulseIcon = (props: any) => (
    <Icon {...props} animation="pulse" name="plus-outline" />
  );

  return (
    <NavigationContainer
      theme={props.isDarkTheme ? navigatorDarkTheme : navigatorTheme}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="RootNavigator"
          component={BottomNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

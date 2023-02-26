import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "../screens/SettingsScreen";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import HomeNavigator from "./HomeNavigator";
import InputScreen from "../screens/input/InputScreen";
import NotificationScreen from "../screens/notification/NotificationScreen";

const BottomTab = createBottomTabNavigator();
export default function BottomNavigator() {
  return (
    <BottomTab.Navigator initialRouteName={"InputScreen"}>
      <BottomTab.Screen
        name="InputScreen"
        component={InputScreen}
        options={{
          title: "Input",
          tabBarIcon: ({ color }) => <TabBarIcon name="edit" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          title: "Calendar",
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          title: "Report",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="file-text-o" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

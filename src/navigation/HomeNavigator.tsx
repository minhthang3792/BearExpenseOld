import { HomeScreen } from "../screens/HomeScreen";
import React from "react";
import StatisticScreen from "../screens/StatisticScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddPaymentModal from "../screens/payment/AddPaymentModal";
import TransactionScreen from "../screens/transactions/TransactionScreen";
import { Text } from "@ui-kitten/components";
import QRScannerScreen from "../screens/qrscanner/QRScannerScreen";
import { LoginScreen } from "../screens/init/LoginScreen";

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator initialRouteName={"HomeScreen"}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="StatisticScreen"
        component={StatisticScreen}
        options={{
          title: "Statistic",
        }}
      />
      <Stack.Screen
        name="TransactionScreen"
        component={TransactionScreen}
        options={{
          title: "Transaction",
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: "Login",
        }}
      />

      <Stack.Group
        screenOptions={({ navigation }) => ({
          presentation: "modal",
          headerLeft: () => <Text onPress={navigation.goBack}>Cancel</Text>,
        })}
      >
        <Stack.Screen
          name="AddPaymentModal"
          component={AddPaymentModal}
          options={{
            title: "Add Payment",
          }}
        />
        <Stack.Screen
          name="QRScannerScreen"
          component={QRScannerScreen}
          options={{
            title: "QRScannerScreen",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

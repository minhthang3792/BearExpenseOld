import { Button, Layout } from "@ui-kitten/components";
import {
  firebaseSignout,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../../service/FirebaseService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LoginScreen = () => {
  const register = () => {
    registerWithEmailAndPassword("admin@gmail.com", "admin@a");
  };

  const login = () => {
    loginWithEmailAndPassword("admin@gmail.com", "admin@a");
  };
const register2 = () => {
    registerWithEmailAndPassword("admin2@gmail.com", "admin@a");
  };

  const login2 = () => {
    loginWithEmailAndPassword("admin2@gmail.com", "admin@a");
  };

  const signOut = () => {
    firebaseSignout();
  };

  const profile = async () => {
    console.log(await AsyncStorage.getItem("firebase.currentUser"));
  };

  return (
    <Layout style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={login}>Login</Button>
      <Button onPress={register}>Register</Button>
      <Button onPress={login2}>Login2</Button>
      <Button onPress={register2}>Register2</Button>
      <Button onPress={signOut}>SignOut</Button>
      <Button onPress={profile}>Profile</Button>
    </Layout>
  );
};

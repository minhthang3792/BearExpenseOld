import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ToastUtil } from "../common/ToastUtil";
import {
  child,
  get,
  onDisconnect,
  onValue,
  ref,
  serverTimestamp,
  set,
} from "firebase/database";
import { firebaseAuth, firebaseDatabase } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageService } from "./StorageService";
import AppConst from "../common/constant/AppConst";

const usersRef = ref(firebaseDatabase, "/users");

firebaseAuth.onAuthStateChanged((user) => {
  if (user) {
    const userRef = child(usersRef, `${user.uid}`);
    onValue(
      userRef,
      (data) => {
        const currentUser = data.val();
        saveProfile(currentUser, user.uid);
        checkOnline(user);
      },
      { onlyOnce: true }
    );
  }
});

const saveProfile = async (user: any, uid: string) => {
  const params = {
    uid,
    email: user.email,
    createdAt: user.createdAt,
    lastOnline: user.lastOnline,
  };
  await AsyncStorage.setItem("firebase.currentUser", JSON.stringify(params));
};
export const getFirebaseProfile = async () => {
  const currentUser = await StorageService.getItemSync("firebase.currentUser");
  return currentUser ? JSON.parse(currentUser) : "";
};

const checkOnline = (user: any) => {
  const myConnectionsRef = child(
    usersRef,
    `${user.uid}/connections/${AppConst.DEVICE_UNIQUE_ID}`
  );

  const lastOnlineRef = ref(firebaseDatabase, `users/${user.uid}/lastOnline`);
  const connectedRef = ref(firebaseDatabase, ".info/connected");
  onValue(connectedRef, (snap) => {
    if (snap.val() === true) {
      set(myConnectionsRef, true);
      onDisconnect(myConnectionsRef).remove();
      onDisconnect(lastOnlineRef).set(serverTimestamp());
    }
  });
};

export const registerWithEmailAndPassword = (
  email: string,
  password: string
) => {
  createUserWithEmailAndPassword(firebaseAuth, email, password).then(
    (data) => {
      const params = {
        email,
        createdAt: Date.now(),
      };

      set(child(usersRef, data.user.uid), params).then(() => {
        ToastUtil.show(ToastUtil.SUCCESS, "Register success!");
      });
    },
    (error) => {
      switch (error.code) {
        case "auth/invalid-email":
          ToastUtil.show(ToastUtil.ERROR, "Invalid email.");
          break;
        case "auth/email-already-in-use":
          ToastUtil.show(
            ToastUtil.ERROR,
            "Email already existed! Please try another email."
          );
          break;
        default:
          ToastUtil.show(ToastUtil.ERROR, "Internal Server Error!");
      }
      console.log(error.code);
    }
  );
};

export const loginWithEmailAndPassword = (email: string, password: string) => {
  signInWithEmailAndPassword(firebaseAuth, email, password).then(
    () => {
      ToastUtil.show(ToastUtil.SUCCESS, "Login success!");
    },
    (error) => {
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          ToastUtil.show(
            ToastUtil.ERROR,
            "Username or password incorrect! Please try again."
          );
          break;
        default:
          ToastUtil.show(ToastUtil.ERROR, "Internal Server Error!");
      }
      console.log(`ERROR: FirebaseLogin error: ${error.code}`);
    }
  );
};

export const firebaseSignout = async () => {
  await firebaseAuth.signOut();
  const currentUser = await getFirebaseProfile();
  const connectionsRef = child(
    usersRef,
    `${currentUser.uid}/connections/${AppConst.DEVICE_UNIQUE_ID}`
  );
  const lastOnlineRef = child(usersRef, `${currentUser.uid}/lastOnline`);
  set(connectionsRef, null);
  set(lastOnlineRef, serverTimestamp());
  await StorageService.removeItem("firebase.currentUser");
};

export const firebaseProfile = async () => {
  return await getFirebaseProfile();
};

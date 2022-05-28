import { get, push, ref, serverTimestamp } from "firebase/database";
import { firebaseDatabase } from "../../firebase";
import { getFirebaseProfile } from "./FirebaseService";

const chatRoomsRef = ref(firebaseDatabase, "chat-rooms");
const roomMessagesRef = ref(firebaseDatabase, "room-messages");
const usersRef = ref(firebaseDatabase, "users");
export const createRoom = () => {
  const params = {
    members: {},
    ownerId: "",
    createdAt: serverTimestamp(),
  };
  push(chatRoomsRef, params);
};

export const getUsersExceptMe = async () => {
  const currentUser = await getFirebaseProfile();
  let users = await get(usersRef);
  let result: any = [];
  users.forEach((child) => {
    const childVal = child.val();
    if (child.key !== currentUser.uid) {
      const user = {
        uid: child.key,
        fullName: childVal.fullName,
        email: childVal.email,
        isOnline: !!childVal.connections,
      };
      result.push(user);
    }
  });
  return result;
};

export const sendMessage = () => {};

export const getRooms = () => {};

export const getMembers = () => {};

import { Image, View } from "react-native";
import { GiftedChat, IMessage, User } from "react-native-gifted-chat";
import { useEffect, useState } from "react";
import { getFirebaseProfile } from "../../service/FirebaseService";

export const RoomChatScreen = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const firebaseProfile = await getFirebaseProfile();
    setCurrentUser({
      _id: firebaseProfile.uid,
      name: firebaseProfile.email,
      avatar: () => (
        <Image source={require("../../resource/icons/empty_person.png")} />
      ),
    });
  };

  const onSend = (mess: IMessage[] = []) => {
    setMessages((previousMess) => GiftedChat.append(previousMess, mess, true));
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        user={currentUser}
        showUserAvatar={true}
        showAvatarForEveryMessage={true}
        messages={messages}
        onSend={(messages) => onSend(messages)}
      />
    </View>
  );
};

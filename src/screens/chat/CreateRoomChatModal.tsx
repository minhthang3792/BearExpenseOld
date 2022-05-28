import { ListRenderItemInfo, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Layout, List, ListItem, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IconProps } from "@ui-kitten/components/ui/icon/icon.component";
import { getUsersExceptMe } from "../../service/ChatService";
import AutocompleteTags from "react-native-autocomplete-tags";

type Props = NativeStackScreenProps<any>;
type Suggestion = {
  uid: string;
  name: string;
  email?: string;
};
export default function CreateRoomChatModal({ navigation }: Props) {
  const [listUser, setListUser] = useState<Suggestion[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Suggestion[]>([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>("");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack}>
          <Text status={"primary"}>Cancel</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={navigation.goBack}>
          <Text status={"primary"}>Done</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const users = await getUsersExceptMe();
    let result: Suggestion[] = [];

    users.forEach((user: any) => {
      const child: Suggestion = {
        uid: user.uid,
        name: user.fullName,
        email: user.email,
      };
      result.push(child);
    });

    setListUser(result);
  };

  const renderItemIcon = (props: IconProps) => (
    <Icon {...props} name="person" />
  );

  const renderSuggestion = (
    info: ListRenderItemInfo<Suggestion>,
    onPress: (tag: Suggestion) => void
  ) => {
    return (
      <ListItem
        onPress={() => onPressSuggestion(info.item, onPress)}
        title={info.item.name}
        description={info.item.email}
        accessoryLeft={renderItemIcon}
      />
    );
  };

  const labelExtractor = (tag: Suggestion) => tag.name;
  const suggestionExtractor = (suggestion: Suggestion) => suggestion.name;

  const filterSuggestion = (text: string): Suggestion[] => {
    let result: Suggestion[] = [];
    if (text) {
      listUser.forEach((value) => {
        if (value.name.toLowerCase().includes(text.toLowerCase())) {
          result.push(value);
        }
      });
    }
    return result;
  };

  const onPressTag = (tag: Suggestion) => {
    console.log(tag);
  };

  const onChangedTag = (tag: any): void => {
    if (selectedUsers.length > 0) {
      setIsSearch(false);
    } else {
      setIsSearch(true);
    }
    setSelectedUsers(tag);
  };

  const onPressSuggestion = (
    suggestion: Suggestion,
    onPress: (tag: Suggestion) => void
  ) => {
    onPress(suggestion);
    setListUser(listUser.filter((value) => value !== suggestion));
    const result = [...selectedUsers, suggestion];
    setSelectedUsers(result);
  };

  const onSearch = (text: string) => {
    if (text.length > 0 || selectedUsers.length > 0) {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
    setSearchString(text);
  };

  return (
    <Layout style={styles.container}>
      <Layout style={styles.search}>
        <Text>To:</Text>
        <AutocompleteTags
          tags={selectedUsers}
          suggestions={listUser}
          onChangeTags={onChangedTag}
          labelExtractor={labelExtractor}
          suggestionExtractor={suggestionExtractor}
          filterSuggestions={(text) => filterSuggestion(text)}
          containerStyle={styles.searchContainer}
          renderTag={(tag) => (
            <TouchableOpacity key={tag.uid} onPress={() => onPressTag(tag)}>
              <Text style={[styles.tagStyle]}>{tag.name}, </Text>
            </TouchableOpacity>
          )}
          renderSuggestion={(
            suggestion,
            onPress: (tag: Suggestion) => void
          ) => (
            <List
              data={listUser}
              renderItem={(item) => renderSuggestion(item, onPress)}
            />
          )}
          allowCustomTags={false}
          parseChars={[]}
          inputProps={{
            onChangeText: (text) => onSearch(text),
            value: searchString,
          }}
        />
      </Layout>
      {!isSearch && <List data={listUser} renderItem={renderSuggestion} />}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 10,
  },
  searchContainer: {
    paddingLeft: 5,
  },
  tagStyle: {
    fontWeight: "bold",
  },
  inputStyle: {
    backgroundColor: "white",
  },
  flatListStyle: {
    backgroundColor: "pink",
  },
});

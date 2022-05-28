import React from "react";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import { List, ListItem, ListItemElement, Toggle } from "@ui-kitten/components";
import { ListItemModel } from "../model/list-item.model";
import { AppContext } from "../app/app-context";

const data: any[] = [];

data.push({
  title: "Dark mode",
  description: null,
});

export default function SettingsScreen() {
  const appContext = React.useContext(AppContext);

  const onActiveCheckedChange = (isChecked: boolean) => {
    appContext.toggleDark();
  };

  const renderItemAccessory = () => (
    <Toggle checked={appContext.isDarkTheme} onChange={onActiveCheckedChange} />
  );

  const renderItem = (
    info: ListRenderItemInfo<ListItemModel>
  ): ListItemElement => (
    <ListItem
      title={info.item.title}
      description={info.item.description || ""}
      accessoryRight={renderItemAccessory}
    />
  );

  return <List data={data} renderItem={renderItem} />;
}

const styles = StyleSheet.create({});

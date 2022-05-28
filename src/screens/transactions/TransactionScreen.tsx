import React, { useEffect, useState } from "react";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import {
  Button,
  Icon,
  List,
  ListItem,
  ListItemElement,
} from "@ui-kitten/components";
import { ListItemModel } from "../../model/list-item.model";
import { IconProps } from "@ui-kitten/components/ui/icon/icon.component";
import { MasterService } from "../../service/MasterService";
import { AxiosResponse } from "axios";

export default function TransactionScreen() {
  const [data, setData] = useState<Array<ListItemModel>>([]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    let listData: Array<ListItemModel> = [];
    MasterService.demo().then((result: AxiosResponse) => {
      let temp = {
        title: result.data.msg,
        description: result.data.msg,
      };
      listData.push(temp);
      setData(listData);
    });
  };

  const renderItemAccessory = () => <Button size="tiny">FOLLOW</Button>;

  const renderItemIcon = (props: IconProps) => (
    <Icon {...props} name="person" />
  );

  const renderItem = (
    info: ListRenderItemInfo<ListItemModel>
  ): ListItemElement => (
    <ListItem
      title={`${info.item.title} ${info.index + 1}`}
      description={`${info.item.description} ${info.index + 1}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
  );

  return (
    <View>
      <List style={styles.container} data={data} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

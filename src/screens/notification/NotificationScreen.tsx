import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ListRenderItemInfo,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Icon, List, Text } from "@ui-kitten/components";
import { ListItemModel } from "../../model/list-item.model";
import { MasterService } from "../../service/MasterService";
import { ApiConst } from "../../common/constant/ApiConst";
import { styles } from "./style";

export default function NotificationScreen() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<Array<ListItemModel>>([]);
  const offset = useRef<number>(1);
  const isListEnd = useRef<boolean>(false);
  const isRefresh = useRef<boolean>(false);

  const PAGE_SIZE = 5;

  useEffect(() => {
    loadData();
  }, []);

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {isLoading ? (
          <ActivityIndicator color="black" style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  };

  const onRefresh = () => {
    offset.current = 1;
    isListEnd.current = false;
    isRefresh.current = true;
    loadData();
  };

  const loadData = () => {
    if (!isLoading && !isListEnd.current) {
      let params = {
        UserID: "820",
        PageSize: PAGE_SIZE,
        PageIndex: offset.current,
      };
      setLoading(true);
      MasterService.demoLich(ApiConst.notification.fetchList, params).then(
        (result: any) => {
          if (result) {
            if (result.length < PAGE_SIZE || result.length <= 0) {
              isListEnd.current = true;
            } else {
              offset.current = offset.current + 1;
            }
            let listData: Array<ListItemModel> = [];
            for (let i = 0; i < result.length; i++) {
              let temp = {
                title: result[i].TieuDeFirebase,
                description: result[i].NoiDung,
              };
              listData.push(temp);
            }
            setLoading(false);
            if (isRefresh.current) {
              isRefresh.current = false;
              setDataSource(listData);
            } else {
              setDataSource([...dataSource, ...listData]);
            }
          } else {
            isListEnd.current = true;
            setLoading(false);
          }
        },
        (err) => {
          isListEnd.current = true;
          setLoading(false);
          console.log(err);
        }
      );
    }
  };

  const deleteNotification = () => {
    console.log("deleteNotification");
  };

  const renderItem = (info: ListRenderItemInfo<ListItemModel>) => (
    <Card style={styles.card} appearance={"filled"}>
      <View style={styles.headerContainer}>
        <Text status={"warning"} style={styles.headerTitle}>
          {info.item.title}
        </Text>
        <Text style={styles.headerDateTime}>17:00</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text>{info.item.description}</Text>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footerDate}>1 ngay truoc</Text>
        <TouchableOpacity onPress={deleteNotification}>
          <Icon style={styles.icon} fill="#8F9BB3" name="trash-2-outline" />
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <View>
      <List
        style={styles.container}
        data={dataSource}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={onRefresh}
        refreshing={isLoading}
        onEndReached={loadData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

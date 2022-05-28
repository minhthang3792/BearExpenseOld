import {Image, StyleSheet, TouchableOpacity} from "react-native";
import {Layout, StyleService, Text, useStyleSheet,} from "@ui-kitten/components";

// @ts-ignore
export const HomeScreen = ({ navigation }) => {
  const themeStyles = useStyleSheet(themedStyles);

  return (
    <Layout>
      <Layout style={styles.body}>
        <Layout style={styles.column}>
          <Layout style={styles.row}>
            <Layout style={styles.item}>
              <TouchableOpacity
                style={styles.buttonMenu}
                onPress={() => navigation.navigate("AddPaymentModal")}
              >
                <Image
                  style={styles.buttonIcon}
                  source={require("../resource/icons/add-document.png")}
                />
                <Text>Add payment</Text>
              </TouchableOpacity>
            </Layout>
            <Layout style={styles.item}>
              <TouchableOpacity
                style={styles.buttonMenu}
                onPress={() => navigation.navigate("StatisticScreen")}
              >
                <Image
                  style={styles.buttonIcon}
                  source={require("../resource/icons/chart.png")}
                />
                <Text>Statistic</Text>
              </TouchableOpacity>
            </Layout>
            <Layout style={styles.item}>
              <TouchableOpacity
                style={styles.buttonMenu}
                onPress={() => navigation.navigate("TransactionScreen")}
              >
                <Image
                  style={styles.buttonIcon}
                  source={require("../resource/icons/payment-history.png")}
                />
                <Text>Transaction</Text>
              </TouchableOpacity>
            </Layout>
          </Layout>
          <Layout style={styles.row}>
            <Layout style={styles.item}>
              <TouchableOpacity
                style={styles.buttonMenu}
                onPress={() => navigation.navigate("QRScannerScreen")}
              >
                <Image
                  style={styles.buttonIcon}
                  source={require("../resource/icons/payment-history.png")}
                />
                <Text>QRScannerScreen</Text>
              </TouchableOpacity>
            </Layout>
            <Layout style={styles.item}>
              <TouchableOpacity
                style={styles.buttonMenu}
                onPress={() => navigation.navigate("LoginScreen")}
              >
                <Image
                  style={styles.buttonIcon}
                  source={require("../resource/icons/payment-history.png")}
                />
                <Text>LoginScreen</Text>
              </TouchableOpacity>
            </Layout>
            <Layout style={styles.item}>
              <TouchableOpacity
                style={styles.buttonMenu}
                onPress={() => navigation.navigate("ChatScreen")}
              >
                <Image
                  style={styles.buttonIcon}
                  source={require("../resource/icons/payment-history.png")}
                />
                <Text>ChatScreen</Text>
              </TouchableOpacity>
            </Layout>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "background-basic-color-1",
  },
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  column: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "center",
    alignSelf: "stretch",
    marginBottom: 20,
  },
  item: {
    width: "30%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonMenu: {
    alignItems: "center",
    textAlign: "justify",
  },
  buttonIcon: {
    width: 48,
    height: 48,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

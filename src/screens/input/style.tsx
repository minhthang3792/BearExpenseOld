import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    marginHorizontal: 2,
    marginVertical: 4,
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    justifyContent: "flex-start",
  },
  headerDateTime: {
    fontWeight: "bold",
    justifyContent: "flex-end",
  },
  bodyContainer: {
    marginVertical: 10,
  },
  footerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerDate: {
    fontSize: 14,
    fontStyle: "italic",
    justifyContent: "flex-start",
  },
  footerTrashIcon: {
    justifyContent: "flex-end",
  },
  icon: {
    width: 24,
    height: 24,
  },
});

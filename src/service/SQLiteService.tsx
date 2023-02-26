import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import TransactionEntity from "../lib/entities/TransactionEntity";

const asset = Asset.fromModule(require("../../assets/SQLite/BearExpense.db"));

class SQLiteService {
  sqlite: SQLite.WebSQLDatabase | undefined;

  constructor() {}

  initialize = async () => {
    const internalDbName = "BearExpense.db";
    const sqlDir = FileSystem.documentDirectory + "SQLite";
    const sqlUri = sqlDir + "/" + internalDbName;

    if (!(await FileSystem.getInfoAsync(sqlDir)).exists) {
      await FileSystem.makeDirectoryAsync(sqlDir);
      await FileSystem.downloadAsync(asset.uri, sqlUri);
    }

    this.sqlite = SQLite.openDatabase(internalDbName);
  };

  inilization = async () => {
    // @ts-ignore
    await TransactionEntity.createTable();
  };
}

export default new SQLiteService();

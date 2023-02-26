// import * as FileSystem from "expo-file-system";
// import * as SQLite from "expo-sqlite";
//
// const db = SQLite.openDatabase("BearExpense.db", "1.0");
//
// // const initDatabase = () => {
// //   db.transaction((tx) => {
// //     tx.executeSql(
// //       "CREATE TABLE thang_table" +
// //         "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
// //         "full_name TEXT)"
// //     );
// //   });
// // };
//
// // async function openDatabase() {
// //   if (
// //     !(
// //       await FileSystem.getInfoAsync(
// //         FileSystem.documentDirectory + "SQLite/BearExpense.db"
// //       )
// //     ).exists
// //   ) {
// //     initDatabase();
// //   }
// //   // await FileSystem.downloadAsync(
// //   //   Asset.fromModule(require("./src/sqlite/BearExpense.db")).uri,
// //   //   FileSystem.documentDirectory + "SQLite/BearExpense.db"
// //   // );
// // }
//
// export const sqlite = db;

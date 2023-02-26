// @ts-ignore
import { BaseModel, types } from "expo-sqlite-orm";
import { TransactionType } from "../types/TransactionType";
import * as SQLite from "expo-sqlite";

export default class TransactionEntity extends BaseModel {
  constructor(obj: TransactionType) {
    super(obj);
  }

  static get database() {
    return async () => SQLite.openDatabase("BearExpensea.db");
  }

  static get tableName() {
    return "TTRANSACTIONS";
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true, autoincrement: true },
      type: { type: types.TEXT },
      date: { type: types.DATE },
      amount: { type: types.FLOAT },
      note: { type: types.TEXT },
      createdAt: { type: types.DATETIME, default: () => Date.now() },
    };
  }
}

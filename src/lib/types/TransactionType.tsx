export interface TransactionType {
  id?: number | undefined;
  type: string;
  date: Date;
  amount: number;
  note: string | undefined;
}
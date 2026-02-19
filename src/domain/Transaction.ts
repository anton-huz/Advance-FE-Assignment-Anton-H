interface Transaction {
  transaction_id: string;
  merchant: string;
  amount: number;
  created_at: string;
  account_id: string;
  direction: string;
  status: string;
  extra_data: null | unknown;
  user_created: boolean;
  account_name: string;
}

export type {Transaction};

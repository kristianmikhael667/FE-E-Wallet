export interface History {
  deposit: Deposit;
  status: string;
  message: string;
}

export interface Deposit {
  deposit_id: string;
  uid: string;
  balance: string;
  last_topup: string;
  last_deduct: string;
  account_no: string;
  account_name: string;
  status: number;
  created_at: string;
  updated_at: string;
  history: ResponseHistory[];
}

export interface ResponseHistory {
  ledger_id: string;
  deposit_id: string;
  amount: string;
  balance: string;
  type: number;
  description: string;
  ref_no: string;
  ref_date: string;
  status: string;
  created_at: string;
}

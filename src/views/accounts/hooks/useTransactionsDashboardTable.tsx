import {useMemo} from 'react';

import useFetchAccountTransactions from '@/hooks/useFetchAccountTransactions';
import {
  FlexxColumn,
  FlexxTableRow,
} from '@components/FlexxTable/domain/FlexxTable';

const columns: FlexxColumn[] = [
  {field: 'date', headerName: 'Date', dateFormat: 'sm'},
  {field: 'merchant', headerName: 'Merchant'},
  {field: 'amount', headerName: 'Amount', currency: true, align: 'right'},
  {field: 'direction', headerName: 'Direction', align: 'center'},
  {field: 'status', headerName: 'Status', align: 'center'},
];

const useTransactionsDashboardTable = (accountId: string | null) => {
  const {data, isLoading, isError} = useFetchAccountTransactions({
    account_id: accountId,
  });

  const rows: FlexxTableRow[] = useMemo(() => {
    if (data == null) return [];

    return data.map(transaction => ({
      data: {
        transaction_id: transaction.transaction_id,
        date: transaction.created_at,
        merchant: transaction.merchant,
        amount: transaction.amount,
        direction: transaction.direction,
        status: transaction.status,
      },
    }));
    // .reduce((acc, it, idx) => {
    //   for (let cnt of [0,1,2]) {
    //     const data = { ...(it.data) };
    //     data.transaction_id += `-${cnt}`;
    //     data.merchant += `-${cnt}`;
    //
    //     acc.push({ data });
    //   }
    //
    //   return acc;
    // }, [] as unknown as FlexxTableRow[]);
  }, [data]);

  return {columns, rows, isLoading, isError};
};

export default useTransactionsDashboardTable;

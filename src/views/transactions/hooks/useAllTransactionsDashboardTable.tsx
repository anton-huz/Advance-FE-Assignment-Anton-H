import {useMemo} from 'react';

import {FlexxColumn, FlexxTableRow} from '@components/FlexxTable/domain/FlexxTable';
import useFetchAllTransactions from '@/hooks/useFetchAllTransactions';

const columns: FlexxColumn[] = [
  {field: 'date', headerName: 'Date', dateFormat: 'sm'},
  {field: 'account', headerName: 'Account'},
  {field: 'merchant', headerName: 'Merchant'},
  {field: 'amount', headerName: 'Amount', currency: true, align: 'right'},
  {field: 'direction', headerName: 'Direction', align: 'center'},
  {field: 'status', headerName: 'Status', align: 'center'},
];

const useAllTransactionsDashboardTable = () => {
  const {data, isLoading, isError} = useFetchAllTransactions();

  const rows: FlexxTableRow[] = useMemo(() => {
    if (!data) return [];

    return data.map(transaction => ({
      data: {
        date: transaction.created_at,
        account: transaction.account_name,
        merchant: transaction.merchant,
        amount: transaction.amount,
        direction: transaction.direction,
        status: transaction.status,
      },
    }));
  }, [data]);

  return {columns, rows, isLoading, isError};
};

export default useAllTransactionsDashboardTable;

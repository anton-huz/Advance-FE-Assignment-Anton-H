import React, {useMemo} from 'react';

import {Account} from '@/domain/Account';
import {
  FlexxColumn,
  FlexxTableRow,
} from '@components/FlexxTable/domain/FlexxTable';
import AdvanceAccountNumberDisplay from '@components/AdvanceAccountNumberDisplay/AdvanceAccountNumberDisplay';
import {useCreateAccount} from '@views/accounts/hooks/useCreateAccount';

const columns: FlexxColumn[] = [
  {field: 'name', headerName: 'Name'},
  {field: 'bank', headerName: 'Bank'},
  {field: 'accountNumber', headerName: 'Account Number'},
  {field: 'status', headerName: 'Status'},
  {field: 'balance', headerName: 'Balance', currency: true, align: 'right'},
];

const useAccountsDashboardTable = (accounts: Account[] | undefined) => {
  const {openDrawer, CreateAccountDrawer} = useCreateAccount();

  const rows: FlexxTableRow[] = useMemo(() => {
    if (!accounts) return [];

    return accounts.map(account => ({
      data: {
        name: account.name,
        bank: account.bank_name,
        accountNumber: account.account_number ? (
          <AdvanceAccountNumberDisplay
            accountNumber={account.account_number}
            variant='body2'
          />
        ) : (
          'N/A'
        ),
        status: account.status,
        balance: account.balance,
      },
      onClick: () => {
        openDrawer();
      },
    }));
  }, [accounts]);

  return {columns, rows, CreateAccountDrawer};
};

export default useAccountsDashboardTable;

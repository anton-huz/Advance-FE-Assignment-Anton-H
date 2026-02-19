import React, {useMemo, useState} from 'react';

import {Account} from '@/domain/Account';
import {useDrawerHolder} from '@/hooks/useDrawerHolder';
import {
  FlexxColumn,
  FlexxTableRow,
} from '@components/FlexxTable/domain/FlexxTable';
import AccountDetailDrawerContent from '@views/accounts/components/AccountDetailDrawerContent';
import AdvanceAccountNumberDisplay from '@components/AdvanceAccountNumberDisplay/AdvanceAccountNumberDisplay';

const columns: FlexxColumn[] = [
  {field: 'name', headerName: 'Name'},
  {field: 'bank', headerName: 'Bank'},
  {field: 'accountNumber', headerName: 'Account Number'},
  {field: 'status', headerName: 'Status'},
  {field: 'balance', headerName: 'Balance', currency: true, align: 'right'},
];

const useAccountsDashboardTable = (accounts: Account[] | undefined) => {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );

  const {openDrawer, DrawerHolder} = useDrawerHolder({
    content: <AccountDetailDrawerContent accountId={selectedAccountId} />,
  });

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
        setSelectedAccountId(account.account_id);
        openDrawer();
      },
    }));
  }, [accounts, openDrawer]);

  return {columns, rows, DrawerHolder};
};

export default useAccountsDashboardTable;

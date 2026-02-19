import React from 'react';

import Divider from '@mui/material/Divider';
import {AccountStatus} from '@/domain/Account';
import {FlexxTable} from '@components/FlexxTable/FlexxTable';
import useFetchAccountById from '@/hooks/useFetchAccountById';
import {Chip, CircularProgress, Stack, Typography} from '@mui/material';
import useTransactionsDashboardTable from '@views/accounts/hooks/useTransactionsDashboardTable';
import AdvanceAccountNumberDisplay from '@components/AdvanceAccountNumberDisplay/AdvanceAccountNumberDisplay';

interface AccountDetailDrawerContentProps {
  accountId: string | null;
}

const AccountStatusLabel = {
  [AccountStatus.OPEN]: 'open',
  [AccountStatus.CLOSED]: 'closed',
  [AccountStatus.INVALID]: 'invalid',
};

const AccountDetailDrawerContent: React.FC<AccountDetailDrawerContentProps> = ({
  accountId,
}) => {
  const {data: account, isLoading, isError} = useFetchAccountById(accountId);
  const {
    columns: transactionColumns,
    rows: transactionRows,
    isLoading: transactionsLoading,
    isError: transactionsError,
  } = useTransactionsDashboardTable(accountId);

  if (isLoading) {
    return (
      <Stack flexGrow={1} alignItems='center' justifyContent='center'>
        <CircularProgress />
      </Stack>
    );
  }

  if (isError || !account) {
    return (
      <Stack flexGrow={1} alignItems='center' justifyContent='center'>
        <Typography variant='body1' color='error'>
          Failed to load account details.
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack gap={2} p={2}>
      <Typography variant='h4' component='h1' gutterBottom>
        <Stack direction='row' spacing={1} gap={4} alignItems={'center'}>
          {account.name}
          <Chip
            label={AccountStatusLabel[account.status]}
            size='small'
            sx={{ml: 3}}
            color='success'
            variant='outlined'
          />
        </Stack>
      </Typography>
      <Stack gap={1}>
        <Typography variant='body2' color='text.secondary'>
          {account.bank_name}
        </Typography>
      </Stack>
      <Stack direction='row' spacing={4} alignItems={'center'}>
        <Stack gap={1}>
          {account.account_number ? (
            <AdvanceAccountNumberDisplay
              accountNumber={account.account_number}
              variant='body1'
            />
          ) : (
            <Typography variant='body1'>N/A</Typography>
          )}
          <Typography variant='body2' color='text.secondary'>
            Account Number
          </Typography>
        </Stack>
        <Stack gap={1}>
          <Typography variant='subtitle2'>
            {account.routing_number || 'N/A'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Routing Number
          </Typography>
        </Stack>
      </Stack>
      <Stack gap={1}>
        <Typography variant='subtitle2'>
          {account.balance?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Balance
        </Typography>
      </Stack>

      <Divider className='mlb-1' />

      <Typography variant={'h5'}>Transactions</Typography>

      <FlexxTable
        columns={transactionColumns}
        rows={transactionRows}
        isLoading={transactionsLoading}
        isError={transactionsError}
        emptyState='No transactions found'
        disablePagination={true}
      />
    </Stack>
  );
};

export default AccountDetailDrawerContent;

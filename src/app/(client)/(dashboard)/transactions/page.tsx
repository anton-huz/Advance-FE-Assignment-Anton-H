'use client';

import React from 'react';

import {Typography} from '@mui/material';
import {FlexxTable} from '@components/FlexxTable/FlexxTable';
import FlexxDashboardWrapper from '@/components/FlexxDashboardWrapper';
import useAllTransactionsDashboardTable from '@views/transactions/hooks/useAllTransactionsDashboardTable';

const TransactionsPage = () => {
  const {columns, rows, isLoading, isError} =
    useAllTransactionsDashboardTable();

  return (
    <FlexxDashboardWrapper>
      <Typography variant='h4' sx={{fontWeight: 600}}>
        Transactions
      </Typography>
      <FlexxTable
        columns={columns}
        rows={rows}
        isLoading={isLoading}
        isError={isError}
        emptyState='No transactions found'
        disablePagination={true}
      />
    </FlexxDashboardWrapper>
  );
};

export default TransactionsPage;

'use client';

import React from 'react';

import {Typography} from '@mui/material';
import useFetchAccounts from '@/hooks/useFetchAccounts';
import {useGlobalSearch} from '@core/hooks/useGlobalSearch';
import {FlexxTable} from '@components/FlexxTable/FlexxTable';
import useAccountsDashboardTable from '@views/accounts/hooks/useAccountsDashboardTable';

const AccountDetail: React.FC = () => {
  const {searchQuery} = useGlobalSearch();
  const {data, isLoading, isError} = useFetchAccounts({searchQuery});
  const {columns, rows, DrawerHolder} = useAccountsDashboardTable(data);

  return (
    <>
      <Typography variant='h5' sx={{mb: 2}}>
        Backend API Schema
      </Typography>

      <FlexxTable
        columns={columns}
        rows={rows}
        isLoading={isLoading}
        isError={isError}
        emptyState='No accounts found'
      />
      {DrawerHolder}
    </>
  );
};

export default AccountDetail;

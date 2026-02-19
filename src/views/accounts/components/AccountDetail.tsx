'use client';

import React from 'react';

import {FlexxTable} from '@components/FlexxTable/FlexxTable';
import useFetchAccounts from '@/hooks/useFetchAccounts';
import useAccountsDashboardTable from '@views/accounts/hooks/useAccountsDashboardTable';
import {useGlobalSearch} from '@core/hooks/useGlobalSearch';
import {Account} from "@/domain/Account";
import {Typography} from "@mui/material";

const AccountDetail: React.FC<{ account?: Account}> = ({
  account,
}) => {
  const {searchQuery} = useGlobalSearch();
  const {data, isLoading, isError} = useFetchAccounts({searchQuery});
  const {columns, rows, CreateAccountDrawer} = useAccountsDashboardTable(data);

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
      {CreateAccountDrawer}
    </>
  );
};

export default AccountDetail;

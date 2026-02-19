'use client';

import React from 'react';

import useFetchAccounts from '@/hooks/useFetchAccounts';
import {useGlobalSearch} from '@core/hooks/useGlobalSearch';
import {FlexxTable} from '@components/FlexxTable/FlexxTable';
import useAccountsDashboardTable from '@views/accounts/hooks/useAccountsDashboardTable';

const AccountsDashboardTable: React.FC = () => {
  const {searchQuery} = useGlobalSearch();
  const {data, isLoading, isError} = useFetchAccounts({searchQuery});
  const {columns, rows, DrawerHolder} = useAccountsDashboardTable(data);

  return (
    <>
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

export default AccountsDashboardTable;

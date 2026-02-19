import React from 'react';

import {Stack} from '@mui/material';
import {useDrawerHolder} from "@/hooks/useDrawerHolder";
import AdvanceActionButtons from '@components/AdvanceActionButtons/AdvanceActionButtons';
import {ActionButtonConfig} from '@components/AdvanceActionButtons/types';
import CreateAccountForm from "@views/accounts/components/CreateAccountForm";

const AccountsCtas: React.FC = () => {
  const {openDrawer, DrawerHolder} = useDrawerHolder({
    content: <CreateAccountForm />,
  });

  const actions: ActionButtonConfig[] = [
    {
      name: 'Add Account',
      variant: 'outlined',
      onClick: openDrawer,
      startIcon: 'fluent--add-circle-20-regular',
    },
  ];

  return (
    <>
      <Stack direction='row' gap={'1rem'} alignItems={'center'}>
        <AdvanceActionButtons actions={actions} />
      </Stack>
      {DrawerHolder}
    </>
  );
};
export default AccountsCtas;

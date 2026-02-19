import React, {useCallback, useRef} from 'react';

import {Stack} from '@mui/material';
import {useDrawerHolder} from '@/hooks/useDrawerHolder';
import MoveMoneyForm from '@views/accounts/components/MoveMoneyForm';
import {ActionButtonConfig} from '@components/AdvanceActionButtons/types';
import CreateAccountForm from '@views/accounts/components/CreateAccountForm';
import AdvanceActionButtons from '@components/AdvanceActionButtons/AdvanceActionButtons';

const AccountsCtas: React.FC = () => {
  const createAccountHandler = useRef<() => void>(null);
  const onCreateAccountSuccess = useCallback(() => {
    createAccountHandler.current?.();
  }, []);
  const {
    closeDrawer: closeCreateAccount,
    openDrawer: openCreateAccount,
    DrawerHolder: CreateAccountDrawer,
  } = useDrawerHolder({
    content: <CreateAccountForm onSuccess={onCreateAccountSuccess} />,
  });
  createAccountHandler.current = closeCreateAccount;

  const moveMoneyHandler = useRef<() => void>(null);
  const onMoveMoneySuccess = useCallback(() => {
    moveMoneyHandler.current?.();
  }, []);
  const {
    closeDrawer: closeMoveMoneyDrawer,
    openDrawer: openMoveMoneyDrawer,
    DrawerHolder: MoveMoneyDrawer,
  } = useDrawerHolder({
    content: <MoveMoneyForm onSuccess={onMoveMoneySuccess} />,
  });
  moveMoneyHandler.current = closeMoveMoneyDrawer;

  const actions: ActionButtonConfig[] = [
    {
      name: 'Add Account',
      variant: 'outlined',
      onClick: openCreateAccount,
      startIcon: 'fluent--add-circle-20-regular',
    },
    {
      name: 'Move Money',
      variant: 'outlined',
      onClick: openMoveMoneyDrawer,
      startIcon: 'fluent--arrow-swap-20-regular',
    },
  ];

  return (
    <>
      <Stack direction='row' gap={'1rem'} alignItems={'center'}>
        <AdvanceActionButtons actions={actions} />
      </Stack>
      {CreateAccountDrawer}
      {MoveMoneyDrawer}
    </>
  );
};
export default AccountsCtas;

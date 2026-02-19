import ReactDOM from 'react-dom';
import React, {useMemo} from 'react';

import {useBoolean} from '@/hooks/useBoolean';
import DrawerWrapper from '@components/DrawerWrapper/DrawerWrapper';

export const useDrawerHolder = ({content}: {content: React.ReactElement}) => {
  const {
    value: isOpen,
    onTrue: openDrawer,
    onFalse: closeDrawer,
  } = useBoolean();

  const DrawerHolder = useMemo(() => {
    if (typeof window === 'undefined') return null;

    return ReactDOM.createPortal(
      <DrawerWrapper
        open={isOpen}
        removePaddingBottom
        onClose={closeDrawer}
        actions={[
          {
            icon: 'fluent--dismiss-24-regular',
            onClick: closeDrawer,
          },
        ]}
        drawerWidth='md'
      >
        {content}
      </DrawerWrapper>,
      document.body,
    );
  }, [isOpen, closeDrawer, content]);

  return {
    isOpen,
    openDrawer,
    closeDrawer,
    DrawerHolder,
  };
};

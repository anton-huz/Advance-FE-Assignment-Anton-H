import {useMutation, useQueryClient} from 'react-query';

import {MoveMoneyPayload} from '@/domain/Transaction';
import flexxApiService from '@/flexxApi/flexxApiService';
import {QueryClientIds} from '@/QueryClient/queryClient.ids';

const useMoveMoneySubmit = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: MoveMoneyPayload) => flexxApiService().moveMoney(payload),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(QueryClientIds.ACCOUNTS);
        onSuccess?.();
      },
    },
  );
};

export default useMoveMoneySubmit;

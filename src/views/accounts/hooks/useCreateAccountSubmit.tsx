import {useMutation, useQueryClient} from 'react-query';

import {CreateAccountPayload} from '@/domain/Account';
import flexxApiService from '@/flexxApi/flexxApiService';
import {QueryClientIds} from '@/QueryClient/queryClient.ids';

const useCreateAccountSubmit = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: CreateAccountPayload) => flexxApiService().createAccount(payload),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(QueryClientIds.ACCOUNTS);
        onSuccess?.();
      },
    },
  );
};

export default useCreateAccountSubmit;

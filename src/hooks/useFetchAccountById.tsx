import {useQuery} from 'react-query';

import {Account} from '@/domain/Account';
import flexxApiService from '@/flexxApi/flexxApiService';
import {QueryClientIds} from '@/QueryClient/queryClient.ids';

const useFetchAccountById = (accountId: string | null) => {
  return useQuery<Account>(
    [QueryClientIds.ACCOUNT_BY_ID, accountId],
    () => flexxApiService().fetchAccountById(accountId!),
    {enabled: !!accountId},
  );
};

export default useFetchAccountById;

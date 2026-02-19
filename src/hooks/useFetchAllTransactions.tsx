import {useQuery} from 'react-query';

import {Transaction} from '@/domain/Transaction';
import flexxApiService from '@/flexxApi/flexxApiService';
import {QueryClientIds} from '@/QueryClient/queryClient.ids';

const useFetchAllTransactions = () => {
  return useQuery<Transaction[]>(
    [QueryClientIds.ALL_TRANSACTIONS],
    () => flexxApiService().fetchAllTransactions(),
  );
};

export default useFetchAllTransactions;

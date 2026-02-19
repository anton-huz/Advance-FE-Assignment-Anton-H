import {useQuery} from 'react-query';

import {Transaction} from '@/domain/Transaction';
import {PaginatedResponse} from '@/domain/Pagination';
import flexxApiService from '@/flexxApi/flexxApiService';
import {QueryClientIds} from '@/QueryClient/queryClient.ids';

interface UseFetchTransactionsParams {
  account_id: string | null;
  search_term?: string;
}

const useFetchTransactions = (params: UseFetchTransactionsParams) => {
  return useQuery<PaginatedResponse<Transaction[]>>(
    [QueryClientIds.TRANSACTIONS, params.account_id, params.search_term],
    () =>
      flexxApiService().fetchTransactions({
        account_id: params.account_id!,
        search_term: params.search_term,
      }),
    {enabled: !!params.account_id},
  );
};

export default useFetchTransactions;

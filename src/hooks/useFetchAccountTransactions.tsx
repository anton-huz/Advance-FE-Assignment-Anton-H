import {useQuery} from 'react-query';

import {Transaction} from '@/domain/Transaction';
import {PaginatedResponse} from '@/domain/Pagination';
import flexxApiService from '@/flexxApi/flexxApiService';
import {QueryClientIds} from '@/QueryClient/queryClient.ids';

interface UseFetchAccountTransactionsParams {
  account_id: string | null;
  search_term?: string;
}

const useFetchAccountTransactions = (
  params: UseFetchAccountTransactionsParams,
) => {
  return useQuery<Transaction[] | null>(
    [
      QueryClientIds.ACCOUNT_TRANSACTIONS,
      params.account_id,
      params.search_term,
    ],
    () =>
      flexxApiService().fetchAccountTransactions(params.account_id!, {
        search_term: params.search_term,
      }),
    {enabled: !!params.account_id},
  );
};

export default useFetchAccountTransactions;

import {PaginatedResponse} from '@/domain/Pagination';
import {Account, CreateAccountPayload} from '@/domain/Account';
import {MoveMoneyPayload, Transaction} from '@/domain/Transaction';
import {get, post, put, remove} from '@/flexxApi/FlexxApiClientService';

class FlexxApiService {
  private formatQueryParams(
    params?: Record<
      string,
      string | number | boolean | undefined | string[] | number[] | Date
    >,
  ): string {
    if (!params) return '';
    const queryParams = new URLSearchParams();
    for (const key in params) {
      const value = params[key];
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(item => queryParams.append(key, String(item)));
        } else {
          queryParams.append(key, String(value));
        }
      }
    }
    return queryParams.toString();
  }

  async fetchAccounts(params: {search_term?: string}): Promise<Account[]> {
    const queryParams = this.formatQueryParams(params);
    return get<Account[]>({endpoint: `pages/accounts?${queryParams}`});
  }

  async fetchAccountById(accountId: string): Promise<Account> {
    return get<Account>({endpoint: `pages/accounts/${accountId}`});
  }

  async fetchTransactions(params: {
    account_id: string;
    search_term?: string;
  }): Promise<PaginatedResponse<Transaction[]>> {
    const queryParams = this.formatQueryParams(params);
    return get<PaginatedResponse<Transaction[]>>({
      endpoint: `pages/transactions?${queryParams}`,
    });
  }

  async createAccount(payload: CreateAccountPayload): Promise<Account> {
    return post<Account>({endpoint: 'pages/accounts', body: payload});
  }

  async fetchAllTransactions(): Promise<Transaction[]> {
    return get<Transaction[]>({endpoint: 'pages/transactions'});
  }

  async moveMoney(payload: MoveMoneyPayload): Promise<Transaction> {
    return post<Transaction>({endpoint: 'pages/move-money', body: payload});
  }

  async fetchAccountTransactions(
    accountId: string,
    params?: {search_term?: string},
  ): Promise<Transaction[] | null> {
    const queryParams = this.formatQueryParams(params);
    const endpoint = queryParams
      ? `pages/accounts/${accountId}/transactions?${queryParams}`
      : `pages/accounts/${accountId}/transactions`;
    return get<Transaction[] | null>({endpoint});
  }
}

let instance: FlexxApiService | null = null;

const flexxApiService = (): FlexxApiService => {
  if (!instance) {
    instance = new FlexxApiService();
  }

  return instance;
};

export default flexxApiService;

export {get, put, post, remove, FlexxApiService};

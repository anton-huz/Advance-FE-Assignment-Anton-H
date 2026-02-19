import {NextRequest} from 'next/server';
import flexxNextApiService from '@/app/api/FlexxNextApiService/FlexxNextApiService';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  {params}: {params: Promise<{id: string}>},
) {
  const {id} = await params;
  const queryParams = req.nextUrl.searchParams.toString();
  const url = queryParams
    ? `account/${id}/transactions?${queryParams}`
    : `account/${id}/transactions`;
  return flexxNextApiService().get({url, req});
}

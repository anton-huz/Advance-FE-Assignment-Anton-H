'use client';

import {useEffect} from 'react';

import NextError from 'next/error';

export default function GlobalError({
  error,
}: {
  error: Error & {digest?: string};
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('[GlobalError]', error);
  }, [error]);

  return (
    <html>
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}

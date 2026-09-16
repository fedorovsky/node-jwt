import type { PropsWithChildren } from 'react';

export const PageTitle = ({ children }: PropsWithChildren) => (
  <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-800">
    {children}
  </h1>
);

import { Spin } from 'antd';
import { lazy, Suspense } from 'react';

export const loadComponent = (path: string, exportVNode = true, isAsync = true) => {
  if (isAsync) {
    const AsyncComp = lazy(() => import(`../modules/${path}`));

    if (exportVNode) return AsyncComp;

    return (
      <Suspense fallback={<Spin />}>
        <AsyncComp />
      </Suspense>
    );
  }

  return require(`../modules/${path}`).default;
};

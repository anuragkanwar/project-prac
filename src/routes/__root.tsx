import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'


import TanstackQueryLayout from '../integrations/tanstack-query/layout'

import type { QueryClient } from '@tanstack/react-query'
import { BaseLayout } from '@/components/layout/baseLayout'
import { Footer } from '@/components/layout/footer'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <BaseLayout>
      <Outlet />
      <Footer />
      <TanStackRouterDevtools />

      <TanstackQueryLayout />
    </BaseLayout>
  ),
})

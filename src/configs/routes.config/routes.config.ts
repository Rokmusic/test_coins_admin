import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'dashboard',
        path: '/dashboard',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
    /** Example purpose only, please remove */
    {
        key: 'token-updates',
        path: '/token-updates',
        component: lazy(() => import('@/views/pages/TokenUpdates')),
        authority: [],
    },
    {
        key: 'ad-managment',
        path: '/ad-managment',
        component: lazy(() => import('@/views/pages/AdManagement')),
        authority: [],
    },
    {
        key: 'tokens-approve',
        path: '/tokens-approve',
        component: lazy(() => import('@/views/pages/TokensApprove')),
        authority: [],
    },
    {
        key: 'dex-swaps',
        path: '/dex-swaps',
        component: lazy(() => import('@/views/pages/DexSwaps')),
        authority: [],
    },
]

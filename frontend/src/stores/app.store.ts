import { create } from 'zustand';

export interface AppState {
  readonly tenantId: string | null;
  readonly isInitialized: boolean;
  readonly setTenantId: (tenantId: string | null) => void;
  readonly setInitialized: (isInitialized: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  tenantId: null,
  isInitialized: true,
  setTenantId: (tenantId: string | null) => set({ tenantId }),
  setInitialized: (isInitialized: boolean) => set({ isInitialized }),
}));

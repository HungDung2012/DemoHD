import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { apiGetCurrent } from '~/apis/user'

export const useUserStore = create(
    persist(
        (set, get) => ({
            token: null,
            current: null,
            setToken: (token) => set({ token }),
            getCurrent: async () => {
                const response = await apiGetCurrent()
                if (response.success)
                    return set(() => ({current: response.currentUser}))
                
            },
        }),
        {
            name: "rest06",
            storage: createJSONStorage(() => localStorage),
            // Return objext of states, want to be saved
            partialize: (state) => 
                Object.fromEntries(
                    Object.entries(state).filter(
                        (el) => el[0] === "token" || el[0] === "current"
                    )
                ),
        },
    ),
)

import { create } from 'zustand'

const useStore = create((set) => ({
  goal: 5000,
  dollarsDonated: 0,
  donations: 0,
  toasts: [],
  donate: (amt) => set((state) => ({ 
    dollarsDonated: state.dollarsDonated + amt, 
    donations: state.donations + 1,
    toasts: [...state.toasts, {type: "success", message: '🎉 Thanks for your donation!'}] 
  })),
  dispatchToast: (type, message) => set((state) => ({ 
    toasts: [...state.toasts, {type, message}] 
  })),
  popToasts: () => set(state => {
    const updated = Array.from(state.toasts)
    updated.shift()
    return { toasts: updated } }
  )

}))

export default useStore;
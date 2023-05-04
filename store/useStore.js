import { create } from 'zustand'

const useStore = create((set) => ({
  goal: 5000,
  dollarsDonated: 0,
  donations: 0,
  toasts: [],
  status: 'open',
  timeOut: () => set(() => ({ status: 'closed'})),
  donate: (amt) => set((state) => ({ 
    dollarsDonated: state.dollarsDonated + amt, 
    donations: state.donations + 1,
    toasts: [...state.toasts, {type: "success", message: '🎉 Thanks for your donation!', id: Date.now()}],
    status:  state.dollarsDonated + amt >= state.goal ? 'funded' : 'open'
  })),
  dispatchToast: (type, message) => set((state) => ({ 
    toasts: [...state.toasts, {type, message, id: Date.now()}] 
  })),
  popToasts: (id) => set(state => {
    const updated = Array.from(state.toasts).filter(toast => toast.id !== id)
    return { toasts: updated } }
  )

}))

export default useStore;
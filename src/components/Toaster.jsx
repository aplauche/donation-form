import { useEffect } from "react";


export default function Toaster({toasts, updateToasts}){

  useEffect(() => {
    const timer = setTimeout(() => {
        if (toasts.length) {
            const updated = Array.from(toasts)
            updated.shift()
            updateToasts(updated);
        }
    }, 2000);
    return () => {
        clearTimeout(timer);
    }
  }, [toasts]);

  return (
    <div className="fixed z-10 flex flex-col top-0 left-[50%] -translate-x-[50%] p-4 gap-2">
      {toasts.map((toast, idx )=> (
        <div className="border-ocean-500 border-l-2 rounded-md py-2 px-4 bg-white" key={idx}>{toast.message}</div>
      ))}
    </div>
  )


}
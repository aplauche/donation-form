import { useEffect } from "react";
import useStore from "../../store/useStore";


export default function Toaster(){

  const toasts = useStore((state) => state.toasts)
  const popToasts = useStore((state) => state.popToasts)


  useEffect(() => {
    const timer = setTimeout(() => {
        if (toasts.length) {
            popToasts()
        }
    }, 3000);
    return () => {
        clearTimeout(timer);
    }
  }, [toasts]);

  const Toast = ({type = "success", message}) => {
    let typeClass; 

    switch(type) {
      case "error":
        typeClass = "border-strawberry-600";
      break;
      default:
        typeClass = "border-ocean-500"
    }

    return (
      <div className={`${typeClass} border-l-[3px] py-2 px-4 bg-white`}>{message}</div>
    )
  }

  return (
    <div className="fixed z-10 flex flex-col top-0 left-[50%] -translate-x-[50%] p-4 gap-2">
      {toasts.map((toast, idx )=> (
        <Toast message={toast.message} type={toast.type} key={idx}/>      
      ))}
    </div>
  )


}
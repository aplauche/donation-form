import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import useStore from "../../store/useStore";


export default function Toaster(){

  const toasts = useStore((state) => state.toasts)
  const popToasts = useStore((state) => state.popToasts)

  const Toast = ({type = "success", message, id}) => {
    let typeClass; 

    switch(type) {
      case "error":
        typeClass = "border-strawberry-600 bg-strawberry-100";
      break;
      default:
        typeClass = "border-ocean-500 bg-white"
    }

    useEffect(() => {
      const timer = setTimeout(() => {
          if (toasts.length) {
              popToasts(id)
          }
      }, 2000);
      return () => {
          clearTimeout(timer);
      }
    }, []);

    return (
      <div className={`${typeClass} border-l-[3px] py-2 px-4 shadow-md`}>{message}</div>
    )
  }

  return (
    <div className="fixed z-10 flex flex-col top-0 left-1/2 -translate-x-1/2 p-4 gap-2">
      <AnimatePresence>
        {toasts.map((toast )=> (

          <motion.div 
            key={`toast-${toast.id}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y:0 }}
            exit={{ opacity: 0, y:-20 }}
          >
            <Toast message={`${toast.message}`} type={toast.type} id={toast.id} key={toast.id}/>    
          </motion.div> 
          
        ))}
      </AnimatePresence> 
    </div>
  )


}
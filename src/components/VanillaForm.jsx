
import { useEffect, useRef, useState } from "react"

import useStore from '../../store/useStore';



export default function VanillaForm(){

  const inputField = useRef()

  const donate = useStore((state) => state.donate)
  const dispatchToast = useStore((state) => state.dispatchToast)

  const [dollarInput, setDollarInput] = useState("5.00")
  const [error, setError] = useState(false)

  const validate = (submitted=false) => {
    if(!dollarInput){
      setError('Please enter a value')
      if(submitted) dispatchToast("error", `❌ Please enter a minimum donation of $5.00`)
    } else if(dollarInput < 5){
      setError('Please enter a minimum donation of $5.00')
      if(submitted) dispatchToast("error", `❌ Please enter a minimum donation of $5.00`)
    } 
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    if(dollarInput >= 5){
      donate(parseFloat(dollarInput))
      setDollarInput("5.00")
    } else {
      validate(true)
      inputField.current.focus()
    }
  }

  useEffect(() => {

    let timer = null

    clearTimeout(timer)
    timer = setTimeout(validate, 750)

    if(dollarInput >= 5){
      setError(false)
    }

    return () => {
      clearTimeout(timer)
    }

  }, [dollarInput])


  const handleVanillaInputChange = (event) => {
    const { value } = event.target;

    // Only allow numbers and a maximum of two decimal places
    const regex = /^[0-9]*\.?[0-9]{0,2}$/;
    if (value === "" || regex.test(value)) {
      setDollarInput(value);
    }
  };


  return (
    <>

      <form onSubmit={handleFormSubmit} className="flex items-center flex-wrap pt-4 gap-2 mb-2">
        <div className='w-100 sm:w-auto flex-grow relative'>
          <label htmlFor="donate-input" className='sr-only'>Donation Amount ($)</label>
          
          <span className="absolute top-1/2 -translate-y-1/2 left-2 font-bold pointer-events-none">$</span>
          <input  
            id="donate-input"
            name="donation"
            ref={inputField} 
            className={`${error ? 'focus:outline-strawberry-600' : ''} pl-5`} 
            type="number" 
            value={dollarInput} 
            onChange={handleVanillaInputChange} 
            onBlur={() => setDollarInput(val => parseFloat(val).toFixed(2))}
          /> 
         
        </div>         
        <button className='button-primary order-3 sm:order-2' type='submit' disabled={error}>
          Give Now
        </button>
        <div className={`${error ? 'bg-strawberry-100 border-strawberry-600' : 'hidden'} border-l-[3px] px-2 py-1 w-full order-2 sm:order-3`}>
          Please enter a minimum of $5.00 to make a donation
        </div>
      </form>     
    </>
  )
}
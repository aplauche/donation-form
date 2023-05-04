import { useEffect, useRef, useState } from "react"
import CurrencyInput from 'react-currency-input-field';

import useStore from '../../store/useStore';



export default function Form(){

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
    // submission validation
    if(dollarInput >= 5){
      donate(parseFloat(dollarInput))
      setDollarInput("5.00")
    } else {
      validate(true)
      inputField.current.focus()
    }
  }

  useEffect(() => {
    // real time validation with delay
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


  return (
    <>

      <form onSubmit={handleFormSubmit} className="flex items-center flex-wrap pt-4 gap-2 mb-2">
        <div className='w-100 sm:w-auto flex-grow relative'>
          <label htmlFor="donate-input" className='sr-only'>Donation Amount ($)</label>
          <CurrencyInput
            id="donate-input"
            name="donation"
            ref={inputField}
            placeholder="$5.00"
            prefix="$"
            value={dollarInput}
            decimalScale={2}
            onValueChange={(value) => setDollarInput(value)}
            min={5}
            className={`${error ? 'focus:outline-strawberry-600' : ''}`}
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
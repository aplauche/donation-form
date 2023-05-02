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
      if(submitted) dispatchToast("error", `❌ Please enter a value`)
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
      setDollarInput("5.00")
      inputField.current.focus()
    }
  }

  useEffect(() => {

    let timer = null

    clearTimeout(timer)
    timer = setTimeout(validate, 850)

    if(dollarInput >= 5){
      setError(false)
    }

    return () => {
      clearTimeout(timer)
    }

  }, [dollarInput])


  return (
    <>
      <form onSubmit={handleFormSubmit} className="flex items-center flex-wrap pt-4 gap-4">
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
                />  
                {/* {error && (
                  <div className='absolute w-full -bottom-2 translate-y-full left-[50%] -translate-x-[50%] p-1 px-4 bg-strawberry-200 border-l-2 border-strawberry-600 text-strawberry-600 rounded-sm'>
                    {error}
                  </div>
                )}  */}
              </div>         
              <button className='button-primary' type='submit' disabled={error}>
                Give Now
              </button>
            </form> 


            {error && (
              <div className='absolute w-full -bottom-4 translate-y-full left-[50%] -translate-x-[50%] p-2 px-4 bg-strawberry-200 border-l-2 border-strawberry-600 text-strawberry-600 rounded-sm'>
                {error}
              </div>
            )}


            {/* <form onSubmit={handleFormSubmit} className="flex items-center py-8 gap-4">
              <input className='flex-grow border border-neutral-300' type="number" min="5" step="0.01" max="10000" inputmode="numeric" value={dollarInput} onChange={(e) => setDollarInput(e.target.value)}/>
              <button type='submit'>
                Give Now
              </button>
            </form> */}

    
    </>
  )
}
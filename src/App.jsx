import { useEffect, useRef, useState } from 'react'
import CurrencyInput from 'react-currency-input-field';
import Countdown from './components/Countdown';
import ProgressIndicator from './components/ProgressIndicator';


function App() {

  const goal = 5000

  const inputField = useRef()

  const [dollarsDonated, setDollarsDonated] = useState(0)
  const [donations, setDonations] = useState(0)
  const [dollarInput, setDollarInput] = useState(5)
  const [error, setError] = useState(false)

  const percent = (dollarsDonated / goal) * 100

  const handleFormSubmit = (e) => {
    e.preventDefault()

    if(dollarInput >= 5){
      setDonations(donations => donations + 1)

      console.log(dollarInput)
  
      setDollarsDonated(val => val + parseFloat(dollarInput))
      setDollarInput(5)
    } else {
      alert('You must enter more')
      setDollarInput(5)
      inputField.current.focus()
    }
  }

  useEffect(() => {

    let timer = null

    const validate = () => {
      if(!dollarInput){
        setError('Please enter a value')
      } else if(dollarInput < 5){
        setError('Please enter a minimum donation of $5.00')
      } 
    }

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
      <main className='min-h-screen w-full bg-neutral-100 flex items-center justify-center'>

        <section className='max-w-screen-sm px-4 py-32'>

          <div className="bg-slate-500 text-white w-full px-3 py-2 rounded-md -my-[4px]">
              ${Math.max(goal - dollarsDonated, 0).toFixed(2)} Still needed to fund this project!
          </div>
          <div className='relative h-[16px] w-full overflow-hidden'>
            <div style={{left: Math.min(percent, 100) + '%'}} className="progress-indicator-triangle absolute top-0 -translate-x-[50%] transition-all duration-1000"></div>
          </div>


          <div className='relative bg-white border-neutral-300 rounded-lg p-8'>


            <ProgressIndicator progress={dollarsDonated} goal={goal} />



            <h1 className='text-3xl font-bold mb-4'>Time is running out to fund this project!</h1>



            {donations > 0 ? (
              <p className='mb-4'>Join the {donations} other donor{donations > 1 && 's'} who {donations > 1 ? "have" : "has"} already contributed the project.</p>
            ) : (
              <p className='mb-4'>Be the first to support the project and get the ball rolling!</p>
            )}

            {/* For demo purposes countdown is set to 4 days in the future instead of the actual date */}
            <Countdown deadline={new Date(new Date().getTime()+(4*24*60*60*1000))}/>

            <form onSubmit={handleFormSubmit} className="flex items-center flex-wrap pt-4 gap-4">
              <div className='w-100 sm:w-auto flex-grow relative mb-10 sm:mb-0'>
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

            {/* {error && (
              <div className='fixed w-auto top-4 left-[50%] -translate-x-[50%] p-2 px-4 bg-strawberry-200 border-l-2 border-strawberry-600 text-strawberry-600 rounded-sm'>
                {error}
              </div>
            )} */}

            {/* <form onSubmit={handleFormSubmit} className="flex items-center py-8 gap-4">
              <input className='flex-grow border border-neutral-300' type="number" min="5" step="0.01" max="10000" inputmode="numeric" value={dollarInput} onChange={(e) => setDollarInput(e.target.value)}/>
              <button type='submit'>
                Give Now
              </button>
            </form> */}

          </div>

        </section>

      </main>


    </>
  )
}

export default App

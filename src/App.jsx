import { useEffect, useRef, useState } from 'react'
import useStore from '../store/useStore';
import Countdown from './components/Countdown';
import Form from './components/Form';
import ProgressBar from './components/ProgressBar';
import Toaster from './components/Toaster';


function App() {

  const goal = useStore((state) => state.goal)
  const donations = useStore((state) => state.donations)
  const dollarsDonated = useStore((state) => state.dollarsDonated)

  const percent = (dollarsDonated / goal) * 100

  return (
    <>
      <main className='min-h-screen w-full bg-[#f5f5f5] flex items-center justify-center overflow-x-hidden'>

        <Toaster />

        <section className='max-w-[550px] px-4 py-32 isolate'>

          <div className='relative border border-slate-200 bg-white rounded-lg p-8 px-12'>

            {dollarsDonated >= goal && (
              <img className='-mt-6 pb-8 sm:mt-0 sm:py-8 sm:absolute -right-8 -top-[115px] z-20' src="/popper.gif" alt="celebration" width={150} />
            )} 

            <ProgressBar />

            <h1 className='text-3xl font-bold mb-6'>{dollarsDonated >= goal ? "We met our goal!" : "Time is running out to fund this project!"}</h1>

            {dollarsDonated >= goal ? (
                <p className='mb-6 text-slate-400'>
                  Thanks for helping us get this project <strong className='text-slate-600'>{percent.toFixed(0)}%</strong> funded! There's still time to donate and keep the momentum going.
                </p>
            ) : (
              donations > 0 ? (
                <p className='mb-6 text-slate-400'>Join the <strong className='text-slate-600'>{donations}</strong> other donor{donations > 1 && 's'} who {donations > 1 ? "have" : "has"} already contributed the project.</p>
              ) : (
                <p className='mb-6 text-slate-400'>Be the <strong className='text-slate-600'>first</strong> to support the project and get the ball rolling!</p>
              )
            )}


            {/* For demo purposes countdown is set to 4 days in the future instead of the actual date - you could instead pass "May 12, 2023" for instance */}
            <Countdown deadline={new Date(new Date().getTime()+(4*24*60*60*1000))}/>

            <Form />

            <img className={`-z-10 absolute bottom-0 transition-all duration-1000 w-3/4 left-1/8 ${dollarsDonated >= goal ? 'translate-y-full' : ''}`} src="/flags-plain.svg" alt="" />

          </div>

        </section>

      </main>


    </>
  )
}

export default App

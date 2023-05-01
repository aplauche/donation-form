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
      <main className='min-h-screen w-full bg-slate-100 flex items-center justify-center '>

        <Toaster />

        <section className='max-w-[550px] px-4 py-32'>

          {dollarsDonated >= goal ? (
            <img src="/flags.svg" alt="Hooray!" className='w-2/3 mx-auto'/>
          ) : (
            <>
              <div className="bg-slate-500 text-white w-full px-3 py-2 rounded-md -my-[4px]">
                ${Math.max(goal - dollarsDonated, 0).toFixed(2)} Still needed to fund this project!
              </div>
              <div className='relative h-[16px] w-full overflow-hidden'>
                <div style={{left: Math.min(percent, 100) + '%'}} className="progress-indicator-triangle absolute top-0 -translate-x-[50%] transition-all duration-1000"></div>
              </div>
            </>
          )}

          <div className='relative border border-slate-200 bg-white rounded-lg p-8 px-12'>

            <ProgressBar percent={percent} />

            <h1 className='text-3xl font-bold mb-6'>{dollarsDonated >= goal ? "We met our goal!" : "Time is running out to fund this project!"}</h1>

            {dollarsDonated >= goal ? (
                <p className='mb-6 text-slate-400'>
                  Thanks for helping us get this project <strong className='text-slate-600'>{percent.toFixed(0)}%</strong> funded! There's still time to donate and keep the momentum up.
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

          </div>

        </section>

      </main>


    </>
  )
}

export default App

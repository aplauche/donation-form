import useStore from '../store/useStore';
import Countdown from './components/Countdown';
import Form from './components/Form';
import FormClosed from './components/FormClosed';
import Layout from './components/Layout';
import ProgressBar from './components/ProgressBar';
import VanillaForm from './components/VanillaForm';


function App() {

  const goal = useStore((state) => state.goal)
  const donations = useStore((state) => state.donations)
  const dollarsDonated = useStore((state) => state.dollarsDonated)
  const status = useStore((state) => state.status)

  const percent = (dollarsDonated / goal) * 100

  // Hide the entire form once time runs out
  if(status == 'closed'){
    return <FormClosed />
  }

  return (
    <Layout>

        <div className='relative max-w-[550px] mx-4 my-32 border border-slate-200 bg-white rounded-lg py-8 px-6 sm:px-12'>

          {status == 'funded' && (
            <img className='-mt-6 pb-8 sm:mt-0 sm:py-8 sm:absolute -right-8 -top-[115px] z-20' src="/popper.gif" alt="celebration" width={150} />
          )} 

          <ProgressBar />

          <h1 className='text-3xl font-bold mb-6'>{status == 'funded' ? "We met our goal!" : "Time is running out to fund this project!"}</h1>

          {status == 'funded' ? (
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

          {/* 
          NOTE: I used a 3rd party currency input field that provides some nice functionality - if I needed to do vanilla, this is how I would approach instead:
          <VanillaForm />
          */}
        
          <Form />

          <img className={`-z-10 absolute bottom-0 transition-all duration-1000 w-3/4 left-1/2 -translate-x-1/2 ${status == 'funded' ? 'translate-y-full' : ''}`} src="/flags-plain.svg" alt="" />

        </div>

    </Layout>
  )
}

export default App

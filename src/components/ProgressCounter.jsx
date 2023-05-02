import useStore from "../../store/useStore"

export default function ProgressCounter(){

  const goal = useStore((state) => state.goal)
  const dollarsDonated = useStore((state) => state.dollarsDonated)

  const percent = (dollarsDonated / goal) * 100


  if(dollarsDonated >= goal) {
    return <img src="/flags.svg" alt="Hooray!" className='w-2/3 mx-auto'/>
  }

  return (

      <>
        <div className="bg-slate-500 text-white w-full px-3 py-2 rounded-md -my-[4px]">
          ${Math.max(goal - dollarsDonated, 0).toFixed(2)} Still needed to fund this project!
        </div>
        <div className='relative h-[16px] w-full overflow-hidden'>
          <div style={{left: Math.min(percent, 100) + '%'}} className="progress-indicator-triangle absolute top-0 -translate-x-[50%] transition-all duration-1000"></div>
        </div>
      </>
  )
}
import useStore from "../../store/useStore"


export default function ProgressBar({percent}){

  const goal = useStore((state) => state.goal)
  const dollarsDonated = useStore((state) => state.dollarsDonated)

  return (
    <>
      <div className="absolute top-0 -translate-y-full w-full left-0">
        <div className="bg-slate-500 text-white w-full px-3 py-2 rounded-md -my-[4px]">
          {dollarsDonated >= goal ? (
            `$${dollarsDonated.toFixed(2)} Raised so far!`
          ) : (
            `${Math.max(goal - dollarsDonated, 0).toFixed(2)} Still needed to fund this project!`
          )}
        </div>
        <div className='relative h-[16px] w-full overflow-hidden'>
          <div style={{left: Math.min(percent, 100) + '%'}} className="progress-indicator-triangle absolute top-0 -translate-x-[50%] transition-all duration-500"></div>
        </div>
      </div>
      <div className='h-[3px] w-full absolute top-0 left-0 bg-neutral-400 rounded-tl-lg rounded-tr-lg'>
        <div style={{width: Math.min(percent, 100) + '%'}} className={`absolute h-full top-0 left-0 bg-blue-600 rounded-tl-lg rounded-tr-lg transition-all duration-500`}></div>
      </div>
    </>
  )
}
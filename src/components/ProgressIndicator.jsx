

export default function ProgressIndicator({progress, goal}){

  const percent = (progress / goal) * 100

  return (
    <>
      <div className='h-[3px] w-full absolute top-0 left-0 bg-neutral-400 rounded-tl-lg rounded-tr-lg'>
        <div style={{width: Math.min(percent, 100) + '%'}} className={`absolute h-full top-0 left-0 bg-blue-600 rounded-tl-lg rounded-tr-lg transition-all duration-1000`}></div>
      </div>
    </>
  )
}
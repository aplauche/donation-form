import Toaster from "./Toaster";


export default function Layout({children}){

  return (
    <main className='min-h-screen w-full bg-[#f5f5f5] flex items-center justify-center overflow-x-hidden isolate'>
      <Toaster />
      {children}
    </main>
  )
}
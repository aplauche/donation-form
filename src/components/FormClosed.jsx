import Layout from "./Layout";

export default function FormClosed(){
  return (
    <Layout>
        <div className='relative max-w-[550px] mx-4 my-32 border border-slate-200 bg-white rounded-lg p-8 px-12'>
          <h1 className='text-3xl font-bold mb-6'>Thanks for your support of The Good Project</h1>
          <p className=' text-slate-400'>This donation drive has closed, but please check back soon for future projects in need of funding.</p>
        </div>
    </Layout>
  )
}
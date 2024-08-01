import React from 'react'

const FinalPrompts = () => {
  return (
    <div className='flex gap-36'>

      <div className='bg-purple-50 my-32 rounded-br-full rounded-tr-full shadow-xl'>
         <p className='text-4xl m-14 my-40 text-center'>Generated Prompt from document</p>
      </div>

      <div className='flex flex-col gap-2 h-[38rem] overflow-auto'>
          <div className='flex gap-2'>
            <p className='w-[40rem] m-5 bg-purple-600 rounded-md text-white text-justify p-5 leading-relaxed'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit expedita exercitationem rem assumenda, molestias iste! Laudantium, totam eaque nisi fuga placeat corporis unde. At eum maxime molestiae accusantium culpa ea! Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, excepturi minus eius vel voluptatem sunt, doloremque magnam nobis dolor hic modi quisquam qui molestias! Quidem voluptas deserunt iste assumenda voluptatibus.
            </p>
            <div className='my-2 mt-6'>
              <p className='text-center'>#1</p>
              <p className='m-2'>
                100%
              </p>
            </div>
          </div>

          <div className='flex gap-2'>
            <p className='w-[40rem] m-5 bg-purple-600 rounded-md text-white text-justify p-5 leading-relaxed'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit expedita exercitationem rem assumenda, molestias iste! Laudantium, totam eaque nisi fuga placeat corporis unde. At eum maxime molestiae accusantium culpa ea! Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, excepturi minus eius vel voluptatem sunt, doloremque magnam nobis dolor hic modi quisquam qui molestias! Quidem voluptas deserunt iste assumenda voluptatibus.
            </p>

            <div className='my-2 mt-6'>
              <p className='text-center'>#2</p>
              <p className='m-2'>
                100%
              </p>
            </div>
          </div>

          <div className='flex gap-2'>
            <p className='p-2 w-[40rem] m-5 bg-purple-400 rounded-md'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit expedita exercitationem rem assumenda, molestias iste! Laudantium, totam eaque nisi fuga placeat corporis unde. At eum maxime molestiae accusantium culpa ea! Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, excepturi minus eius vel voluptatem sunt, doloremque magnam nobis dolor hic modi quisquam qui molestias! Quidem voluptas deserunt iste assumenda voluptatibus.
            </p>

            <div className='my-2 mt-6'>
              <p className='text-center'>#3</p>
              <p className='m-2'>
                100%
              </p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default FinalPrompts
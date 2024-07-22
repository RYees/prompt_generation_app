import React from 'react'
import pattern from '/pattern.png'
import circle from '/circle.png'
import { Link } from 'react-router-dom'

const Prompt = () => {
  return (
    <div className='bg-purple-50 -mt-1 box-border h-screen'>
        <Link to="/">
            <div className='m-2 cursor-pointer flex'>
                <img src={circle} alt="" className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-purple-50'/>
                <span className='-ml-5 mt-2 text-xl italic text-gray-800'>P<small>generator</small></span>
            </div>
        </Link>

        <div className='bg-white border border-t-4 border-t-purple-900 rounded shadow-sm mx-10 my-5 h-[86vh]'>
            {/* <div className='flex justify-end'>
                <img src={pattern} alt="" className='h-40 w-32' />
            </div> */}


        </div>

    </div>
  )
}

export default Prompt
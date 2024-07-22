import React from 'react'
import "../styles/home.css"
import { Link } from 'react-router-dom'
import tree from "/tree.png"

const Home = () => {
  const test = async() => {
    //console.log(await Api.fetchTest())
  }
  


  return (
    <>
    <div className='home h-screen flex flex-col justify-center items-center'>
        <div className='relative rotate-90 ml-96'>
            <img src={tree} alt="" className='h-[32rem] w-[49rem]'/>
        </div>

        <div className='absolute'>
          <div className='text-center mb-10'>
            {/* <button onClick={test}>test</button> */}
            <h1 className='text-5xl'>Prompt Generator</h1>
            <p className='text-gray-600'>Powered by Advanced AI Technology</p>
          </div>

          <div className='flex justify-center'>
            <Link to="/prompt">
              <button className='bg-white p-4 px-20 rounded-full text-xl text-gray-500 hover:text-gray-900 hover:shadow-md'>Get Started</button>
            </Link>
          </div>
        </div>
    </div>
    </>
  )
}

export default Home
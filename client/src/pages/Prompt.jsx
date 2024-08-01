import React, { useRef, useState } from 'react';
import pattern from '/pattern.png'
import circle from '/circle.png'
import { Link } from 'react-router-dom'
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import { TestCases, TestCasePrompts, FinalPrompts, UploadFile } from '../components';


const Prompt = () => {
    const fileInputRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);
    const formPages = [<TestCases />, <TestCasePrompts/>, <FinalPrompts />];

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleBack = () => {
        setCurrentPage(currentPage - 1);
    };
  
    return (
    <div className='bg-purple-50 -mt-1 box-border h-screen'>
        <Link to="/">
            <div className='m-2 cursor-pointer flex'>
                <img src={circle} alt="" className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-purple-50'/>
                <span className='-ml-5 mt-2 text-xl italic text-gray-800'>P<small>generator</small></span>
            </div>
        </Link>

        <div className='bg-white border border-t-4 border-t-purple-900 rounded shadow-sm mx-10 my-5 h-[86vh]'>          
            <div className='flex bg-purple-50 justify-between'>
                <UploadFile/>
                <div className='flex m-1'>
                    {currentPage > 0 && <FaChevronCircleLeft size={25} className='cursor-pointer' onClick={handleBack}/>}
                    {currentPage < formPages.length - 1 && <FaChevronCircleRight size={25} className='cursor-pointer' onClick={handleNext}/>}
                </div>     
            </div>

            <div>
                {formPages[currentPage]}
            </div>
        </div>
    </div>
  )
}

export default Prompt
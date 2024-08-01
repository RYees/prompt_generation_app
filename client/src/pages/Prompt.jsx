import React, { useRef, useState } from 'react';
import pattern from '/pattern.png'
import circle from '/circle.png'
import { Link } from 'react-router-dom'
import { MdAttachment, MdFireTruck } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";

const Prompt = () => {
    const [view, showView] = useState(false)
    const [show, showShow] = useState(false)
    const [generate, showGenerate] = useState(false)
    const fileInputRef = useRef(null);
    const [amount, setAmount] = useState(0);

    const generateAmount = () => {
      showShow(true);
    };
    
    const scenario = () => {
    //   showGenerate(true);
       showShow(true);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleAttachmentIconClick = () => {
        fileInputRef.current.click();
    };
    const handleFileUpload = (event) => {
        console.log('File uploaded:', event.target.files[0]);
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
          
            <div className='flex bg-purple-50'>
                <div className='flex'>
                    <i className="attachment-icon" onClick={handleAttachmentIconClick}> 📎 </i>
                    <input
                        type="file"
                        id="file-input"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                    />
                    <style>{`
                        .attachment-icon {
                        cursor: pointer;
                        font-size: 24px;
                        }
                    `}</style>

                    <div className='mt-2'>
                        {view? <p className='text-sm text-gray-600'>processing document...</p>:
                        <p className='text-sm'>Upload Document</p>}
                    </div>
                </div>        
            </div>

            <div className='flex m-10 gap-44'>
                <div className='bg-purple-50 h-96 w-96'>                     
                     <p className='m-10 text-2xl'>Start with providing scenarios</p>
                </div>

                <div className='m-5'>
                    <form action="">
                        <div className='flex flex-col'>
                            <label htmlFor="" className='mb-2'>Description</label>
                            <p className='text-sm text-gray-500 mb-2'>put your objective of the final prompt you desire to acquire</p>
                            <textarea type="text" className='border'/>
                        </div>
                    </form>

                    <form action="">
                       <div className='flex flex-col mt-8'>
                            <label htmlFor="" className='mb-2'>Test Cases</label>
                            <p className='text-sm text-gray-500 mb-2'>define the number of scenarios to be created based on your description to help generate better prompts</p>

                            <div className="flex">
                                {generate ? (
                                <button
                                    className="border border-purple-700 w-32 text-white p-1 rounded-lg bg-purple-600"
                                    onClick={() => {
                                    showGenerate(false);
                                    showShow(false);
                                    console.log(`Generated amount: ${amount}`);
                                    }}
                                >
                                    Generate
                                </button>
                                ) : (
                                <button
                                    className="border border-purple-700 w-32 p-1 rounded-lg"
                                    onClick={scenario}
                                >
                                    <p className="flex justify-center">
                                    <CiCirclePlus size={22} className="mt-1 text-purple-600" />
                                    <p className="mt-1">Scenario</p>
                                    </p>
                                </button>
                                )}

                                {show ? (
                                <input
                                    type="number"
                                    className="border w-12 h-9 mx-2 rounded-full px-2"
                                    value={amount}
                                    onChange={handleAmountChange}
                                />
                                ) : null}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Prompt
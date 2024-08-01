import React, {useState} from 'react'
import { CiCirclePlus } from "react-icons/ci";

const TestCases = () => {
    const [show, setShow] = useState(false)
    const [generate, setGenerate] = useState(false)
    const [amount, setAmount] = useState(0);

    const generateAmount = () => {
      setShow(true);
    };
    
    const scenario = () => {
       setGenerate(true);
       setShow((isOpen) => !isOpen);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };


  return (
    <div className='flex m-10 gap-44'>
        <div className='m-1 h-[34rem] overflow-y-auto'>
            <form action="">
                <div className='flex flex-col'>
                    <label htmlFor="" className='mb-2'>Description</label>
                    <p className='text-sm text-gray-500 mb-2'>put your objective of the final prompt you desire to acquire</p>
                    <textarea type="text" className='border'/>
                </div>
            </form>

            <div className='bg-purple-50 h-40 w-full'>                     
            <p className='m-10 text-4xl py-10 italic uppercase'>Start with providing scenarios</p>
            </div>

    
            <div className='flex flex-col mt-8'>
                <label htmlFor="" className='mb-2'>Test Cases</label>
                <p className='text-sm text-gray-500 mb-2'>define the number of scenarios to be created based on your description to help generate better prompts</p>                        
            </div>
            <div className="flex">
                        {generate ? (
                        <button
                            className="border border-purple-700 w-32 text-white p-1 rounded-lg bg-purple-600"
                            onClick={() => {
                            setGenerate(false);
                            setShow(false);
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
        
        <div className='flex flex-col gap-5 w-[27rem] h-[34rem] overflow-y-auto'>
            <div className='flex flex-col gap-2 '>
                <label htmlFor="">scenario 1</label>
                <input type="text" name="" id="" className='border p-1 w-96 rounded-lg'/>
            </div>
            <div className='flex flex-col gap-2 '>
                <label htmlFor="">scenario 1</label>
                <input type="text" name="" id="" className='border p-1 w-96 rounded-lg'/>
            </div>
            <div className='flex flex-col gap-2 '>
                <label htmlFor="">scenario 1</label>
                <input type="text" name="" id="" className='border p-1 w-96 rounded-lg'/>
            </div>
            <div className='flex flex-col gap-2 '>
                <label htmlFor="">scenario 1</label>
                <input type="text" name="" id="" className='border p-1 w-96 rounded-lg'/>
            </div>
            <div className='flex flex-col gap-2 '>
                <label htmlFor="">scenario 1</label>
                <input type="text" name="" id="" className='border p-1 w-96 rounded-lg'/>
            </div>
            <div className='flex flex-col gap-2 '>
                <label htmlFor="">scenario 1</label>
                <input type="text" name="" id="" className='border p-1 w-96 rounded-lg'/>
            </div>
            <div className='flex flex-col gap-2 '>
                <label htmlFor="">scenario 1</label>
                <input type="text" name="" id="" className='border p-1 w-96 rounded-lg'/>
            </div>
            <div className='flex flex-col gap-2 '>
                <label htmlFor="">scenario 1</label>
                <input type="text" name="" id="" className='border p-1 w-96 rounded-lg'/>
            </div>
            <div className='flex flex-col gap-2 '>
                <label htmlFor="">scenario 1</label>
                <input type="text" name="" id="" className='border p-1 w-96 rounded-lg'/>
            </div>
            <div className='flex flex-col gap-2 '>
                <label htmlFor="">scenario 1</label>
                <input type="text" name="" id="" className='border p-1 w-96 rounded-lg'/>
            </div>
            <div className='flex flex-col gap-2 '>
                <label htmlFor="">scenario 1</label>
                <input type="text" name="" id="" className='border p-1 w-96 rounded-lg'/>
            </div>

              <div className='flex flex-col gap-2 '>
                <label htmlFor="">scenario 1</label>
                <input type="text" name="" id="" className='border p-1 w-96 rounded-lg'/>
            </div>
            <div className='flex flex-col gap-2 '>
                <label htmlFor="">scenario 1</label>
                <input type="text" name="" id="" className='border p-1 w-96 rounded-lg'/>
            </div>
        </div>
    </div>
  )
}

export default TestCases
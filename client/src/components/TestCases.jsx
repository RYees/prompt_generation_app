import React, {useState} from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Api from '../services/service';

const TestCases = () => {
    const [view, setView] = useState(false);
    const [show, setShow] = useState(false);
    const [isanalyse, setAnalyse] = useState(false);
    const [generate, setGenerate] = useState(false);
    const [cases, setCases] = useState([{answer: "Defines the conditions under which the contract can be terminated", prompt: "Interpret the termination clause from the contract"}, 
        {
        answer: "Outlines who can share what information and the penalties if breached", prompt:  "Explain the confidentiality provision in the legal contract"}]);
    const [caseprompts, setCasesPrompt] = useState([]);
    const [amount, setAmount] = useState(2);
    const [description, setDescription] = useState('');

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

    async function generate_cases_prompt() {   
        try{
            setAnalyse(true)
            localStorage.removeItem("case_prompts");
            const requestOptions = {
                description: description,
                test_cases: cases,
                number_of_prompts: amount
            };
            const response = await Api.prompt_generation(requestOptions);
            setCasesPrompt(response.data)
            const case_prompts = localStorage.setItem("case_prompts", JSON.stringify(response.data));
            setAnalyse(false)
        } catch(error){
            console.log("error", error)
        }
    }

    async function generate_test_cases() {   
        try{
            const requestOptions = {
            description: description,
            number_of_tests: amount
            };
            const response = await Api.generate_test_cases(requestOptions);
            setCases(response.data)
            setView(true)
            setGenerate(false);
            setShow(false);
        } catch(error){
            console.log("error", error)
        }
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    
    const deletePrompt = (index) => {
        const updatedPrompts = [...cases];
        updatedPrompts.splice(index, 1);
        setCases(updatedPrompts);
    };
    
    
   return (
    <div className='flex m-10 gap-44'>
        <div className='m-1 h-[34rem] overflow-y-auto'>
            <form action="">
                <div className='flex flex-col'>
                    <label htmlFor="" className='mb-2'>Description</label>
                    <p className='text-sm text-gray-500 mb-2'>put your objective of the final prompt you desire to acquire</p>
                    <textarea
                        type="text"
                        className="border text-gray-600 p-2"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>
            </form>

            <div className='bg-purple-50 h-40 w-full'>                     
            <p className='m-10 text-2xl text-center py-10 italic uppercase'>Start with providing scenarios</p>
            </div>

    
            <div className='flex flex-col mt-8'>
                <label htmlFor="" className='mb-2'>Test Cases</label>
                <p className='text-sm text-gray-500 mb-2'>define the number of scenarios to be created based on your description to help generate better prompts</p>                        
            </div>
            <div className="flex">
                        {generate ? (
                        <button
                            className="border border-purple-700 w-32 text-white p-1 rounded-lg bg-purple-600"
                            onClick={generate_test_cases}
                        >
                            Generate
                        </button>
                        ) : (
                        <button
                            className="border border-purple-700 w-32 p-1 rounded-lg bg-purple-600"
                            onClick={scenario}
                        >
                            <p className="inline-block">
                                <CiCirclePlus size={22} className="mt-1 text-white" />                            
                            </p>
                            <span className="text-white font-bold">Scenario</span>
                        </button>
                        )}

                        {show ? (
                        <input
                            type="number"
                            min='0'
                            className="border w-12 h-9 mx-2 rounded-full px-2"
                            value={amount}
                            onChange={handleAmountChange}
                        />
                        ) : null}
                    </div>
        </div>
        
        {!view?
            <div>
                <div className='relative flex justify-between -mt-8 mb-3 p-1'>
                    <button 
                        onClick={generate_cases_prompt}
                        className='border p-2 rounded bg-white border-purple-700 hover:bg-purple-600 hover:shadow-xl hover:text-white'>
                        {isanalyse ? 'Analysing...':'Analyse Scenarios'}
                    </button>
                    <div className='flex justify-end mr-4 text-xl bg-purple-900 w-7 h-7 rounded-full px-2 text-white'>{cases?.length}</div>
                </div>
            
                <div className='flex flex-col gap-5 w-[38rem] h-[34rem] overflow-y-auto'>
                    {cases.map((item, index) => (
                        <div key={index} className='flex flex-col gap-2 border p-2 m-2 rounded'>
                            <label htmlFor={`scenario-${index}`}>Scenario</label>
                            <input 
                                type="text" 
                                name={`scenario-${item.prompt}`} 
                                id={`scenario-${index}`} 
                                defaultValue={item.prompt} 
                                className='border p-2 w-full rounded'
                            />
                            <hr className='mt-4'/>
                            <label htmlFor={`expected-output-${index}`}>Expected Output</label>
                            <input 
                                type="text" 
                                name={`expected-output-${item.answer}`} 
                                id={`expected-output-${index}`} 
                                defaultValue={item.answer} 
                                className='border p-2 w-full rounded'
                            />
                            <MdDelete onClick={() => deletePrompt(index)} size={20} className='text-purple-900 cursor-pointer'/>
                        </div>
                    ))}
                </div>
            </div>
        :null}
    </div>
  )
}

export default TestCases
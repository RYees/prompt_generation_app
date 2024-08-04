import React, {useEffect, useState} from 'react';
import { MdDelete } from "react-icons/md";
import Api from '../services/service';

const TestCasePrompts = () => {
  const [amount, setAmount] = useState(2);
  const [case_prompts, setCasePrompt] = useState([]);
  const [comparingIndex, setComparingIndex] = useState(-1);

  useEffect(() => {
    if(localStorage.getItem("case_prompts") !== null){
      const case_promptsString = localStorage.getItem("case_prompts");
      if (case_promptsString) {
        try {
          const case_promptsArray = JSON.parse(case_promptsString);
          setCasePrompt(case_promptsArray);
        } catch (error) {
          console.error("Error parsing case_prompts from localStorage:", error);
          setCasePrompt([]);
        }
      } else {
        setCasePrompt([]);
      }
    }
  }, []);
  
  async function generate_candidate_prompts(user_picked_prompt) {
    try {
      localStorage.removeItem("candidate_prompts");
      const requestOptions = {
        user_picked_prompt: user_picked_prompt,
        number_of_prompts: amount,
      };
      const response = await Api.candidate_prompts(requestOptions);
      const candidate_prompts = localStorage.setItem("candidate_prompts", JSON.stringify(response.data));
      setComparingIndex(-1);
    } catch (error) {
      console.log("error", error);
    }
  }

  const deletePrompt = (index) => {
    const updatedPrompts = [...case_prompts];
    updatedPrompts.splice(index, 1);
    setCasePrompt(updatedPrompts);
    // Update the data in localStorage
    localStorage.setItem("case_prompts", JSON.stringify(updatedPrompts));
  };


  return (
    <div className='flex gap-64'>

      <div className='bg-purple-50 rounded-br-full mt-3 rounded-tr-full shadow-xl'>
         <p className='text-3xl flex items-center justify-center h-full px-5'>Generated Prompts</p>
      </div>

      <div className='flex flex-col gap-2 h-[35rem] overflow-auto'>
        {case_prompts?.map((item, index) => (
          <div className='flex' key={index}>
            <p className='w-[40rem] my-2 bg-purple-600 rounded-md text-white text-justify p-5 leading-relaxed'>
              {item.test_case}
            </p>
            <div className='my-2 mt-6'>
              <p className='text-center'>#{index+1}</p>
              <p className='m-2 mx-4 text-center' title='monte carlo'>
               <small>MC</small> {item?.monte_carlo}
              </p>
              <p className='m-2 mx-4 text-center' title='elo rating'>
                 <small>ER</small> {item?.elo_rating}
              </p>
              <button
                className=' shadow-lg p-2 text-sm bg-gradient-to-l from-purple-800 to-purple-200 text-white font-bold rounded-full hover:brightness-110'
                onClick={() => {
                  generate_candidate_prompts(item.test_case);
                  setComparingIndex(index);
                }}
              >
                {comparingIndex === index ? 'comparing...' : 'Compare'}
              </button>
       
              <button 
                onClick={() => deletePrompt(index)}
                className='flex justify-end float-end mt-1'
              >
                <MdDelete size={25} className='text-purple-900 hover:brightness-110'/>
              </button>
            </div>
          </div>
          
        ))}
      </div>
    </div>
  )
}

export default TestCasePrompts
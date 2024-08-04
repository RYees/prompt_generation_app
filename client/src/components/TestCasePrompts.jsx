import React, {useEffect, useState} from 'react';
import { RiAiGenerate } from "react-icons/ri";
import Api from '../services/service';

const TestCasePrompts = () => {
  const [amount, setAmount] = useState(2);
  const [case_prompts, setCasePrompt] = useState(['As an AI, your role will be to interpret various clauses and provisions from a legal contract based on the question asked. Be thorough and specific with your explanations, providing the meaning of the clause or provision in a way that understandable to non-lawyers. Make sure you cover all critical aspects such as the conditions, responsibilities, obligations, penalties, or rights foreseen in the specific part of the contract thats being questioned. Remember, your job is to clarify legal jargon and translate contractual terms into plain, everyday language.']);

  useEffect(() => {
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
  }, []);
  
  async function generate_candidate_prompts(user_picked_prompt) {   
    try{
        localStorage.removeItem("candidate_prompts");
        const requestOptions = {
          user_picked_prompt: user_picked_prompt,
          number_of_prompts: amount
        };
        const response = await Api.candidate_prompts(requestOptions);
        const candidate_prompts = localStorage.setItem("candidate_prompts", JSON.stringify(response.data));
    } catch(error){
        console.log("error", error)
    }
}

  return (
    <div className='flex gap-64'>

      <div className='bg-purple-50 rounded-br-full mt-3 rounded-tr-full shadow-xl'>
         <p className='text-3xl flex items-center justify-center h-full px-5'>Generated Prompts</p>
      </div>

      <div className='flex flex-col gap-2 h-[35rem] overflow-auto'>
        {case_prompts?.map((item, index) => (
          <div className='flex '>
            <p className='w-[40rem] my-2 bg-purple-600 rounded-md text-white text-justify p-5 leading-relaxed'>
              {item}
            </p>
            <div className='my-2 mt-6'>
              <p className='text-center'>#{index+1}</p>
              <p className='m-2 mx-4' title='monte carlo'>
               <small>MC</small> {item?.monte_carlo}200%
              </p>
              <p className='m-2 mx-4' title='elo rating'>
                 <small>ER</small> {item?.elo_rating}100%
              </p>
              <button
                className='mx-8'
                onClick={()=>generate_candidate_prompts(item)}
              >
                <RiAiGenerate size={30} className='text-center text-purple-900' title='Generate'/>
              </button>
            </div>
          </div>
          
        ))}
      </div>
    </div>
  )
}

export default TestCasePrompts
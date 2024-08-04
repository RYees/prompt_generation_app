import React, {useState, useEffect} from 'react'
import { IoCopy } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import copy from 'copy-to-clipboard';

const FinalPrompts = () => {
  const [prompts, setCandidatePrompt] = useState([]);
  const [copiedStates, setCopiedStates] = useState({});

  useEffect(() => {
    if(localStorage.getItem("candidate_prompts") !== null){
      const candidate_promptsString = localStorage.getItem("candidate_prompts");
      if (candidate_promptsString) {
        try {
          const candidate_promptsArray = JSON.parse(candidate_promptsString);
          setCandidatePrompt(candidate_promptsArray);
        } catch (error) {
          console.error("Error parsing case_prompts from localStorage:", error);
          setCandidatePrompt([]);
        }
      } else {
        setCandidatePrompt([]);
      }
    }
  }, []);

  const handleCopy = (content) => {
    copy(content);
    const updatedCopiedStates = { ...prompts };
    updatedCopiedStates[content] = true;
    setCopiedStates(updatedCopiedStates);

    setTimeout(() => {
      const revertedCopiedStates = { ...prompts };
      revertedCopiedStates[content] = false;
      setCopiedStates(revertedCopiedStates);
    }, 2000); 
  };

  return (
    <div className='flex gap-36'>

      <div className='bg-purple-50 rounded-br-full mt-3 rounded-tr-full shadow-xl'>
         <p className='text-3xl flex flex-col items-center justify-center h-full px-5'>
          Final Prompts
         <small className='text-sm text-gray-500'>according to the document</small>
          </p>
        
      </div>

      <div className='flex flex-col gap-2 h-[35rem] overflow-auto'>
        {prompts?.map((item, index) => (
          <div className='flex gap-2' key={index}>
            <div className='w-[40rem] m-5 bg-purple-600 rounded-md text-white text-justify p-5 leading-relaxed'>
              <div className="copy" onClick={() => handleCopy(item.prompt)}>
                {copiedStates[item.prompt] ? (
                  <FaCheck className="cursor-pointer" />
                ) : (
                  <IoCopy className="cursor-pointer" />
                )}
              </div>
               {item.prompt}
            </div>
            <div className='my-2 mt-6'>
              <p className='text-center'>#{index+1}</p>
              <p className='m-2 mx-4' title='monte carlo'>
               <small>MC</small> {item?.monte_carlo}
              </p>
              <p className='m-2 mx-4' title='elo rating'>
                 <small>ER</small> {item?.elo_rating}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FinalPrompts
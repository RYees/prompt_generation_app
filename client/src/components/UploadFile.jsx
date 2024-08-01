import React, {useState, useRef} from 'react'
import { FileUploader } from "react-drag-drop-files";
import Api from '../services/service';

const fileTypes = ["JPG", "PNG", "GIF", "PDF"];

const UploadFile = () => {
  const [view, setView] = useState(false)
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState();
  const [load, setLoad] = useState(false);
  const fileInputRef = useRef(null);

  const handleAttachmentIconClick = () => {
      fileInputRef.current.click();
  };
  const handleFileUpload = (event) => {
      console.log('File uploaded:', event.target.files[0]);
  };


  async function upload_pdf_vector_db() {   
    setLoad(true)
    const requestOptions = {
      file_path: '../data/RaptorContract.pdf'
    };

    const response = await Api.uploadpdf(requestOptions);
    console.log("ov", response.data.response)
    setMessage("Analysing the document done! Ready to answer your questions.")
    setLoad(false)
     
}

  return (
    <>
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
    </>
  );
}

export default UploadFile


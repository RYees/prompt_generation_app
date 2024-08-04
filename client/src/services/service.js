import axios from 'axios' 

const Api = {
  uploadpdf: data => axios.post('http://127.0.0.1:5000/api/upload_documents', data),
  generate_test_cases: data => axios.post('http://127.0.0.1:5000/api/generate_test_cases', data),
  prompt_generation: data => axios.post('http://127.0.0.1:5000/api/prompt_generation_for_user_input', data),
  candidate_prompts: data => axios.post('http://127.0.0.1:5000/api/prompt_candidate_generation', data)
};

export default Api;
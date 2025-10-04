import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/microbiome';

export const uploadMicrobiomeData = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/upload`, data);
  return response.data;
};

export const fetchAllOverviews = async () => {
  const response = await axios.get(`${API_BASE_URL}/overviews`);
  return response.data;
};

export const fetchAnalysisById = async (analysisId) => {
  const response = await axios.get(`${API_BASE_URL}/${analysisId}`);
  return response.data;
};
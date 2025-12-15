import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllRecords = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/records`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(`Error in fetching records: ${error.message}`);
    return { success: false, message: error.message };
  }
};

export const createRecord = async (newRecord, token) => {
  try {
    const res = await axios.post(`${BASE_URL}/records`, newRecord, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(`Error in creating record: ${error.message}`);
    if (error.response?.data) {
      return error.response.data;
    }
    return { success: false, message: error.message };
  }
};
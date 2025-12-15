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
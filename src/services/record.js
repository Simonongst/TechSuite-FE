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

export const updateRecord = async (updatedRecord, recordId, token) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/equipment/${recordId}`,
      updatedRecord,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(`Error in updating record: ${error.message}`);
    if (error.response?.data) {
      return error.response.data;
    }
    return { success: false, message: error.message };
  }
};

export const deleteRecord = async (recordId, token) => {
  try {
    const res = await axios.delete(`${BASE_URL}/records/${recordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(`Error in deleting record: ${error.message}`);
  }
};
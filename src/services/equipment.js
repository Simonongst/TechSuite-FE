import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllEquipment = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/equipment`);
    console.log('Equipment', res);
    return res.data;
  } catch (error) {
    console.log(`Error in fetching equipment: ${error.message}`);
    return null;
  }
};
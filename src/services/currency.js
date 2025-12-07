import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllCurrency = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/currencies`);
    console.log('Currencies', res);
    return res.data;
  } catch (error) {
    console.log(`Error in fetching currencies: ${error.message}`);
    return null;
  }
};


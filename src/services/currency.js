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

export const createCurrency = async (newCurrency) => {
  try {
    const res = await axios.post(`${BASE_URL}/currencies`, newCurrency)
    console.log('Created currency', res);
    return res.data;
  } catch (error) {
    console.log(`Error in creating currency: ${error.message}`);
  }
};

export const updateCurrency = async (updatedCurrency, currencyId) => {
  try {
    const res = await axios.put(`${BASE_URL}/currencies/${currencyId}`, updatedCurrency)
    console.log('Updated currency', res);
    return res.data;
  } catch (error) {
    console.log(`Error in updating currency: ${error.message}`);
  }
};

export const deleteCurrency = async (currencyId) => {
  try {
    const res = await axios.delete(`${BASE_URL}/currencies/${currencyId}`)
    console.log('Deleted currency', res);
    return res.data;
  } catch (error) {
    console.log(`Error in deleting currency: ${error.message}`);
  }
};
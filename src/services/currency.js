import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllCurrency = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/currencies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(`Error in fetching currencies: ${error.message}`);
    return null;
  }
};

export const createCurrency = async (newCurrency, token) => {
  try {
    const res = await axios.post(`${BASE_URL}/currencies`, newCurrency, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(`Error in creating currency: ${error.message}`);
  }
};

export const updateCurrency = async (updatedCurrency, currencyId, token) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/currencies/${currencyId}`,
      updatedCurrency,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Updated currency', res);
    return res.data;
  } catch (error) {
    console.log(`Error in updating currency: ${error.message}`);
  }
};

export const deleteCurrency = async (currencyId, token) => {
  try {
    const res = await axios.delete(`${BASE_URL}/currencies/${currencyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Deleted currency', res);
    return res.data;
  } catch (error) {
    console.log(`Error in deleting currency: ${error.message}`);
  }
};

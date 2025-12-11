import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllUsers = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(`Error in fetching users: ${error.message}`);
    return null;
  }
};


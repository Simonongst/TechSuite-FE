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

export const createEquipment = async (newEquipment) => {
  try {
    const res = await axios.post(`${BASE_URL}/equipment`, newEquipment)
    console.log('Created equipment', res);
    return res.data;
  } catch (error) {
    console.log(`Error in creating equipment: ${error.message}`);
  }
};

export const updateEquipment = async (updatedEquipment, equipmentId) => {
  try {
    const res = await axios.put(`${BASE_URL}/equipment/${equipmentId}`, updatedEquipment)
    console.log('Updated equipment', res);
    return res.data;
  } catch (error) {
    console.log(`Error in updating equipment: ${error.message}`);
  }
};
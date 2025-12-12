import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllEquipment = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/equipment`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(`Error in fetching equipment: ${error.message}`);
    return { success: false, message: error.message };
  }
};

export const createEquipment = async (newEquipment, token) => {
  try {
    const res = await axios.post(`${BASE_URL}/equipment`, newEquipment, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(`Error in creating equipment: ${error.message}`);
    if (error.response?.data) {
      return error.response.data;
    }
    return { success: false, message: error.message };
  }
};

export const updateEquipment = async (updatedEquipment, equipmentId, token) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/equipment/${equipmentId}`,
      updatedEquipment,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(`Error in updating equipment: ${error.message}`);
    if (error.response?.data) {
      return error.response.data;
    }
    return { success: false, message: error.message };
  }
};

export const deleteEquipment = async (equipmentId, token) => {
  try {
    const res = await axios.delete(`${BASE_URL}/equipment/${equipmentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Deleted equipment', res);
    return res.data;
  } catch (error) {
    console.error(`Error in deleting equipment: ${error.message}`);
    if (error.response?.data) {
      return error.response.data;
    }
    return { success: false, message: error.message };
  }
};

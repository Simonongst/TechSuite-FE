import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllAudits = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/audits`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(`Error in fetching audits: ${error.message}`);
    return null;
  }
};

export const createAudit = async (newAudit, token) => {
  try {
    const res = await axios.post(`${BASE_URL}/audits`, newAudit, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(`Error in creating audit: ${error.message}`);
  }
};

export const updateAudit = async (updatedAudit, auditId, token) => {
  try {
    const res = await axios.put(`${BASE_URL}/audits/${auditId}`, updatedAudit, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Updated audit', res);
    return res.data;
  } catch (error) {
    console.log(`Error in updating audit: ${error.message}`);
  }
};

export const deleteAudit = async (auditId, token) => {
  try {
    const res = await axios.delete(`${BASE_URL}/audits/${auditId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Deleted audit', res);
    return res.data;
  } catch (error) {
    console.log(`Error in deleting audit: ${error.message}`);
  }
};
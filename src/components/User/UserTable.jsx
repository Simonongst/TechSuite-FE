import { useState } from 'react';
import { deleteUser } from '../../services/user.js'
import { useAuth } from '../../context/AuthContext.jsx'

function UserTable({
  selectedRow,
  setSelectedRow,
  userData,
  openDialog,
  setOpenDialog,
  selectedUser,
  setSelectedUser,
  fetchUsers,
}) {
  const { tokens } = useAuth();

  async function handleDelete() {
    try {
      await deleteUser(selectedUser._id, tokens.access);
      await fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

}

function UserTable() {
  return <div>UserTable</div>;
}

export default UserTable;

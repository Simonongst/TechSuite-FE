import * as Dialog from '@radix-ui/react-dialog';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { createUser, updateUser } from '../../services/user.js';
import { useAuth } from '../../context/AuthContext.jsx';

function UserDialog({
  openDialog,
  setOpenDialog,
  selectedUser,
  setSelectedUser,
  fetchUsers,
}) {
  /* ========== useStates and useEffect ========== */
  const { tokens } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [eidErrMsg, setEidErrMsg] = useState('');
  const [newUser, setNewUser] = useState({
    eid: '',
    username: '',
    password: '',
    email: '',
    role: 'User',
    isAPIT: false,
  });

  useEffect(() => {
    if (selectedUser) {
      setNewUser({
        eid: selectedUser.eid || '',
        username: selectedUser.username || '',
        password: '',
        email: selectedUser.email || '',
        role: selectedUser.role || 'User',
        isAPIT: selectedUser.isAPIT || false,
      });
      setIsEditMode(true);
    } else {
      resetValues();
      setIsEditMode(false);
    }
  }, [selectedUser]);

  /* ========== Arrays ========== */
  const roles = ['User', 'Editor', 'Admin'];
  const apitAssociate = ['Yes', 'No'];

  /* ========== Functions ========== */
  function resetValues() {
    setNewUser({
      eid: '',
      username: '',
      password: '',
      email: '',
      role: 'Viewer',
      isEmployed: true,
    });
    setEidErrMsg('');
    setIsEditMode(false);
    setSelectedUser(null);
  }

  return <div>UserDialog</div>;
}

export default UserDialog;

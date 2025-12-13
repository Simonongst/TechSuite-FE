import { MdOutlineEdit, MdDeleteOutline } from 'react-icons/md';
import UserDeleteAlert from './UserDeleteAlert.jsx';
import { deleteUser } from '../../services/user.js';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

function UserTable({
  selectedRow,
  setSelectedRow,
  userData,
  setOpenDialog,
  selectedUser,
  setSelectedUser,
  fetchUsers,
}) {
  const { tokens } = useAuth();
  const [openAlert, setOpenAlert] = useState(false);

  async function handleDelete() {
    try {
      await deleteUser(selectedUser._id, tokens.access);
      await fetchUsers();
      setOpenAlert(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  return (
    <div>
      <div className='overflow-x-auto rounded-lg border border-gray-200 shadow-sm'>
        <table className='min-w-full'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
                EID
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
                Username
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
                Email
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
                Role
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
                APIT
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {userData.map((row, idx) => {
              const isSelected = selectedRow === idx;
              return (
                <tr
                  key={row.eid}
                  onClick={() => setSelectedRow(idx)}
                  className={`transition-colors
                  ${isSelected ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
                >
                  <td className='px-6 py-4 text-sm text-gray-800'>{row.eid}</td>
                  <td className='px-6 py-4 text-sm text-gray-800'>
                    {row.username}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-800'>
                    {row.email}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-800'>
                    {row.role}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-800'>
                    {row.isAPIT ? 'Yes' : 'No'}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-800'>
                    <div className='flex gap-1'>
                      <button className='bg-blue-400 p-1 rounded-lg text-white cursor-pointer'>
                        <MdOutlineEdit
                          size={20}
                          onClick={() => {
                            setSelectedUser(row);
                            setOpenDialog(true);
                          }}
                        />
                      </button>
                      <button className='bg-red-400 p-1 rounded-lg text-white cursor-pointer'>
                        <MdDeleteOutline
                          size={20}
                          onClick={() => {
                            setSelectedUser(row);
                            setOpenAlert(true);
                          }}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <UserDeleteAlert
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default UserTable;

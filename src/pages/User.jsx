import { useState, useEffect } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { HiOutlineRefresh } from 'react-icons/hi';
import UserTable from '../components/User/UserTable';
import UserDialog from '../components/User/UserDialog';

function User({ userData, fetchUsers }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tableData, setTableData] = useState(userData);

  const filterItems = [
    { label: 'APIT: Yes', value: true },
    { label: 'APIT: No', value: false },
  ];
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    if (!filter) {
      setTableData(userData);
    } else {
      filterData(filter.value);
    }
  }, [userData, filter]);

  function filterData(status) {
    if (status === null) {
      setTableData(userData);
    } else {
      setTableData(userData.filter((user) => user.isAPIT === status));
    }
  }

  return (
    <div className='px-4 max-w-7xl mx-auto'>
      <h3 className='p-3 text-xl font-semibold'>User Table</h3>
      <div className='mb-2 flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <h3 className='text-sm pl-3'>Quick Filters: </h3>
          {filterItems.map((item, idx) => (
            <button
              key={idx}
              className={`text-sm px-3 py-1 rounded-3xl border border-transparent hover:border-slate-500 transition-transform duration-300 ease-in-out ${
                filter?.label === item.label
                  ? 'bg-slate-400 text-white'
                  : 'bg-slate-200'
              }`}
              onClick={() => {
                if (filter?.label === item.label) {
                  setFilter(null);
                  filterData(null);
                } else {
                  setFilter(item);
                  filterData(item.value);
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className='flex items-center'>
          <HiOutlineRefresh
            size={25}
            onClick={() => {
              setFilter(null);
              setSelectedRow(null);
              setSelectedUser(null);
              fetchUsers();
            }}
            className='transition-transform duration-200 hover:rotate-45'
          />
          <button
            className='flex items-center gap-2 m-3 bg-slate-500 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-sm hover:bg-red-400 transition-all duration-200 active:scale-95'
            onClick={() => {
              setSelectedUser(null);
              setOpenDialog(true);
            }}
          >
            <IoIosAddCircle />
            Add User
          </button>
        </div>
      </div>
      <UserTable
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        userData={tableData}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        setSelectedUser={setSelectedUser}
        fetchUsers={fetchUsers}
      />
      <UserDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        fetchUsers={fetchUsers}
      />
    </div>
  );
}

export default User;

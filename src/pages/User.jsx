import { useState, useEffect } from 'react';
import UserTable from '../components/User/UserTable';
import UserDialog from '../components/User/UserDialog';

function User({
  userData,
  fetchUsers,
}) {
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
      setTableData(
        userData.filter((user) => user.isAPIT === status)
      );
    }
  }

  return (
    <>
        <UserTable />
        <UserDialog />
    </>
  )
}

export default User
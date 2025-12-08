import { useState, useEffect } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { HiOutlineRefresh } from 'react-icons/hi';
import EquipmentTable from '../components/Equipment/EquipmentTable';
import EquipmentDialog from '../components/Equipment/EquipmentDialog';

function Equipment({ equipmentData, fetchEquipment }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [tableData, setTableData] = useState(equipmentData);

  useEffect(() => {
    if (!filter) {
      setTableData(equipmentData);
    } else {
      filterData(filter.value);
    }
  }, [equipmentData, filter]);

  function filterData(status) {
    if (status === null) {
      setTableData(equipmentData);
    } else {
      setTableData(
        equipmentData.filter((equipment) => equipment.isActive === status)
      );
    }
  }

  return (
    <>
      <EquipmentTable /> 
      <EquipmentDialog />
    </>
  );
}

export default Equipment;

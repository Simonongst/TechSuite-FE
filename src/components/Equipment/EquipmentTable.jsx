import { MdOutlineEdit, MdDeleteOutline } from 'react-icons/md';
import { deleteEquipment } from '../../services/equipment';

function EquipmentTable({
  selectedRow,
  setSelectedRow,
  setOpenDialog,
  setSelectedEquipment,
  equipmentData,
  fetchEquipment,
}) {
  if (!equipmentData || equipmentData.length === 0) {
    return <div className='p-4 text-slate-500'>No Equipment available.</div>;
  }
  async function handleDelete(equipment) {
    if (!equipment?._id) {
      console.error('No equipment selected for deletion');
      return;
    }
    try {
      await deleteEquipment(equipment._id);
      await fetchEquipment();
    } catch (err) {
      console.error('Error deleting equipment:', err);
    }
  }
  return <div>EquipmentTable</div>;
}

export default EquipmentTable;

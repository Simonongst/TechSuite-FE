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
  return (
    <div className='overflow-x-auto rounded-lg border border-gray-200 shadow-sm'>
      <table className='min-w-full'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
              Equipment
            </th>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
              Unit Cost
            </th>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
              Currency
            </th>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
              Active
            </th>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {equipmentData.map((row, idx) => {
            const isSelected = selectedRow === idx;
            return (
              <tr
                key={row.type}
                onClick={() => setSelectedRow(idx)}
                className={`transition-colors
                  ${isSelected ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
              >
                <td className='px-6 py-4 text-sm text-gray-800'>{row.type}</td>
                <td className='px-6 py-4 text-sm text-gray-800'>
                  {row.unitCost}
                </td>
                <td className='px-6 py-4 text-sm text-gray-800'>
                  {row.currency?.code || row.currency}
                </td>
                <td className='px-6 py-4 text-sm text-gray-800'>
                  {row.isActive ? <span>Yes</span> : <span>No</span>}
                </td>
                <td className='px-6 py-4 text-sm text-gray-800'>
                  <div className='flex gap-1'>
                    <button
                      className='bg-blue-400 p-1 rounded-lg text-white cursor-pointer'
                      onClick={() => {
                        setSelectedEquipment(row);
                        setOpenDialog(true);
                      }}
                    >
                      <MdOutlineEdit size={20} />
                    </button>
                    <button
                      className='p-1 rounded-lg text-white cursor-pointer bg-red-400'
                      onClick={() => {
                        handleDelete(row);
                      }}
                    >
                      <MdDeleteOutline size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default EquipmentTable;

import { MdDeleteOutline } from 'react-icons/md';
import { deleteRecord } from '../../services/record';
import { useAuth } from '../../context/AuthContext';

function RecordTable({
  selectedRow,
  setSelectedRow,
  recordData,
  fetchRecords,
}) {
  const { tokens } = useAuth();

  if (!recordData || recordData.length === 0) {
    return <div className='p-4 text-slate-500'>No Record available.</div>;
  }
  async function handleDelete(record) {
    if (!record?._id) {
      console.error('No record selected for deletion');
      return;
    }
    try {
      await deleteRecord(record._id, tokens.access);
      await fetchRecords();
    } catch (err) {
      console.error('Error deleting record:', err);
    }
  }
  return (
    <div className='overflow-x-auto rounded-lg border border-gray-200 shadow-sm'>
      <table className='min-w-full'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
              Date
            </th>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
              Employees
            </th>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
              Desktop
            </th>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
              Laptop
            </th>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
              Monitor
            </th>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
              Desk Phone
            </th>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
              Switch Ports
            </th>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
              Total Items
            </th>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
              Total Cost
            </th>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
              Currency
            </th>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {recordData.map((row, idx) => {
            const isSelected = selectedRow === idx;
            return (
              <tr
                key={row._id || idx}
                onClick={() => setSelectedRow(idx)}
                className={`transition-colors
                  ${isSelected ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
              >
                <td className='px-6 py-4 text-sm text-gray-800'>
                  {new Date(row.createdAt).toLocaleString()}
                </td>
                <td className='px-6 py-4 text-sm text-gray-800'>
                  {row.form.employees}
                </td>
                <td className='px-6 py-4 text-sm text-gray-800'>
                  {row.form.desktop}
                </td>
                <td className='px-6 py-4 text-sm text-gray-800'>
                  {row.form.laptop}
                </td>
                <td className='px-6 py-4 text-sm text-gray-800'>
                  {row.form.monitor}
                </td>
                <td className='px-6 py-4 text-sm text-gray-800'>
                  {row.form.deskPhone}
                </td>
                <td className='px-6 py-4 text-sm text-gray-800'>
                  {row.form.switchPorts}
                </td>
                <td className='px-6 py-4 text-sm text-gray-800'>
                  {row.summary.totalItems}
                </td>
                <td className='px-6 py-4 text-sm text-gray-800'>
                  {row.summary.total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className='px-6 py-4 text-sm text-gray-800'>
                  {row.form.currency}
                </td>
                <td className='px-6 py-4 text-sm text-gray-800'>
                  <div className='flex gap-1'>
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

export default RecordTable;

import { MdDeleteOutline } from 'react-icons/md';
import { deleteAudit } from '../../services/audit';
import { useAuth } from '../../context/AuthContext';

function AuditTable({ auditData, fetchAudits }) {
  const { tokens } = useAuth();

  async function handleDelete(audit) {
    if (!audit?._id) {
      return;
    }
    try {
      await deleteAudit(audit._id, tokens.access);
      await fetchAudits();
    } catch (err) {
      console.error('Error deleting audit:', err);
    }
  }

  return (
    <div className='overflow-x-auto rounded-lg border border-gray-200 shadow-sm'>
      <table className='min-w-full'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
              User
            </th>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
              Category
            </th>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
              Audit Item
            </th>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
              Date
            </th>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {!auditData || auditData.length === 0 ? (
            <tr>
              <td colSpan={5} className='p-4 text-center text-slate-500'>No audit available.</td>
            </tr>
          ) : (
            auditData.map((row, idx) => (
              <tr key={idx}>
                <td className='px-6 py-4 text-sm text-gray-800'>
                  {row.userId?.username || row.userId?.email}
                </td>
                <td className='px-6 py-4 text-sm text-gray-800'>
                  {row.category}
                </td>
                <td className='px-6 py-4 text-sm text-gray-800'>{row.label}</td>
                <td className='px-6 py-4 text-sm text-gray-800'>
                  {row.date ? new Date(row.date).toLocaleDateString() : '-'}
                </td>
                <td className='px-6 py-4 text-sm text-gray-800'>
                  <button
                    className='p-1 rounded-lg text-white cursor-pointer bg-red-400'
                    onClick={() => {
                      handleDelete(row);
                    }}
                  >
                    <MdDeleteOutline size={20} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AuditTable;

import { MdOutlineEdit, MdDeleteOutline } from 'react-icons/md';
import { deleteCurrency } from '../../services/currency';
import { useAuth } from '../../context/AuthContext';

function CurrencyTable({
  selectedRow,
  setSelectedRow,
  setOpenDialog,
  setSelectedCurrency,
  currencyData,
  fetchCurrencies,
}) {
  const { tokens } = useAuth();

  async function handleDelete(currency) {
    if (!currency?._id) {
      console.error('No currency selected for deletion');
      return;
    }
    try {
      await deleteCurrency(currency._id, tokens.access);
      await fetchCurrencies();
    } catch (err) {
      console.error('Error deleting currency:', err);
    }
  }
  return (
    <div className='overflow-x-auto rounded-lg border border-gray-200 shadow-sm'>
      <table className='min-w-full'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
              Code
            </th>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
              Label
            </th>
            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-700'>
              Rate to Base
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
          {!currencyData || currencyData.length === 0 ? (
            <tr>
              <td colSpan={5} className='p-4 text-center text-slate-500'>
                No currency available.
              </td>
            </tr>
          ) : (
            [...currencyData]
              .sort((a, b) => {
                if (a.code === 'USD') return -1;
                if (b.code === 'USD') return 1;
                return a.code.localeCompare(b.code);
              })
              .map((row, idx) => {
                const isSelected = selectedRow === idx;
                return (
                  <tr
                    key={row.code}
                    onClick={() => setSelectedRow(idx)}
                    className={`transition-colors
                  ${isSelected ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
                  >
                    <td className='px-6 py-4 text-sm text-gray-800'>
                      {row.code}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-800'>
                      {row.label}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-800'>
                      {row.rateToBase?.toLocaleString(undefined, {
                        minimumFractionDigits: row.rateToBase < 10 ? 4 : 2,
                        maximumFractionDigits: row.rateToBase < 10 ? 4 : 2,
                      })}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-800'>
                      {row.isActive ? <span>Yes</span> : <span>No</span>}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-800'>
                      <div className='flex gap-1'>
                        <button
                          className='bg-blue-400 p-1 rounded-lg text-white cursor-pointer'
                          onClick={() => {
                            setSelectedCurrency(row);
                            setOpenDialog(true);
                          }}
                        >
                          <MdOutlineEdit size={20} />
                        </button>
                        <button
                          className={`p-1 rounded-lg text-white cursor-pointer ${
                            row.code === 'USD'
                              ? 'bg-gray-300 cursor-not-allowed'
                              : 'bg-red-400'
                          }`}
                          disabled={row.code === 'USD'}
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
              })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CurrencyTable;

import { useEffect, useState } from 'react';
import { HiOutlineRefresh } from 'react-icons/hi';
import RecordTable from '../components/Record/RecordTable';

function Records({ recordData, fetchRecords }) {
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, [])

  return (
    <div className='px-4 max-w-7xl mx-auto'>
      <h3 className='p-3 text-xl font-semibold'>Record Table</h3>
      <div className='mb-2 flex justify-between items-center'>
        <div className='flex items-center'>
          <HiOutlineRefresh
            size={25}
            onClick={() => {
              setSelectedRow(null);
              fetchRecords();
            }}
            className='transition-transform duration-200 hover:rotate-45'
          />
        </div>
      </div>
      <RecordTable
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        recordData={recordData.records}
        fetchRecords={fetchRecords}
      />
    </div>
  );
}

export default Records;

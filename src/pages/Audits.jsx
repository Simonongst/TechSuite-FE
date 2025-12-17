import { HiOutlineRefresh } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import AuditTable from '../components/Audit/AuditTable';

function Audits({ auditData, fetchAudits }) {
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetchAudits();
  }, []);

  return (
    <div className='px-4 max-w-7xl mx-auto'>
      <div className='mb-2 flex items-center'>
        <h3 className='p-3 text-xl font-semibold'>Audit Table</h3>
        <div className='flex items-center'>
          <HiOutlineRefresh
            size={25}
            onClick={() => {
              setSelectedRow(null);
              fetchAudits();
            }}
            className='transition-transform duration-200 hover:rotate-45'
          />
        </div>
      </div>
      <AuditTable
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        auditData={auditData}
        fetchAudits={fetchAudits}
      />
    </div>
  );
}

export default Audits;

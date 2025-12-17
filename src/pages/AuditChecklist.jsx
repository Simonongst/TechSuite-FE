import { useState } from 'react';
import AuditChecklistPanel from '../components/Audit/AuditChecklistPanel';
import AuditProgress from '../components/Audit/AuditProgress';

const checklistItems = [
  {
    category: 'Backup & Recovery',
    label: 'Backup jobs completed successfully',
  },
  { category: 'Backup & Recovery', label: 'Disaster recovery plan updated' },

  {
    category: 'Compliance & Documentation',
    label: 'Hardware inventory updated',
  },
  {
    category: 'Compliance & Documentation',
    label: 'IT policies and procedures documented',
  },

  {
    category: 'Network Infrastructure',
    label: 'Network switches firmware updated',
  },
  {
    category: 'Network Infrastructure',
    label: 'Wi-Fi access points functioning correctly',
  },

  {
    category: 'Security & Access Control',
    label: 'Password policies enforced (complexity, expiration)',
  },
  {
    category: 'Security & Access Control',
    label: 'User access rights reviewed and updated',
  },

  { category: 'Servers & Hardware', label: 'Server operating systems updated' },
  { category: 'Servers & Hardware', label: 'UPS batteries tested' },

  { category: 'User Management', label: 'Admin/privileged accounts audited' },
  { category: 'User Management', label: 'Inactive user accounts disabled' },
  { category: 'User Management', label: 'User training records up to date' },
];

function AuditChecklist() {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleToggle = (item) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 py-4 max-w-7xl mx-auto'>
      <div className='lg:col-span-2 bg-white rounded-lg shadow-md p-6'>
        <AuditChecklistPanel
          checklistItems={checklistItems}
          checkedItems={checkedItems}
          handleToggle={handleToggle}
        />
      </div>
      <div className='lg:col-span-1 bg-white rounded-lg shadow-md p-6'>
        <AuditProgress
          checklistItems={checklistItems}
          checkedItems={checkedItems}
        />
      </div>
    </div>
  );
}
export default AuditChecklist;

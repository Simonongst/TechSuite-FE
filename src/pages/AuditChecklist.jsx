import AuditChecklistPanel from '../components/Audit/AuditChecklistPanel';
import AuditProgress from '../components/Audit/AuditProgress';

function AuditChecklist() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 py-4 max-w-7xl mx-auto'>
      <div className='lg:col-span-2 bg-white rounded-lg shadow-md p-6'>
        <AuditChecklistPanel />
      </div>
      <div className='lg:col-span-1 bg-white rounded-lg shadow-md p-6'>
        <AuditProgress />
      </div>
    </div>
  );
}
export default AuditChecklist;

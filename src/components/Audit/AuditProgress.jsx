import { useAuth } from "../../context/AuthContext";

function AuditProgress({ checklistItems, auditData }) {
  const { user } = useAuth();

  const userAudits = auditData.filter(audit => audit.userId._id === user._id);

  const totalItems = checklistItems.length;
  const completedItems = userAudits.length;
  const progress =
    totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const categories = checklistItems.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className='space-y-6 text-gray-700'>
      <div className='space-y-2'>
        <h2 className='font-semibold'>Audit Progress</h2>
        <p className='text-sm mb-8'>Overall completion status</p>
        <p className='text-slate-600 text-center text-4xl mt-1'>{progress}%</p>
        <div className='w-full bg-slate-200 rounded-full h-3'>
          <div
            className='bg-green-500 h-3 rounded-full transition-all'
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className='text-slate-700 text-center text-sm'>
          {completedItems} of {totalItems} items completed
        </p>
      </div>

      <div className='space-y-4'>
        <h3 className='font-semibold text-sm'>Category Breakdown</h3>
        {Object.entries(categories).map(([category, items]) => {
          const completed = items.filter((item) =>
            userAudits.some(audit => audit.label === item.label)
          ).length;
          const percent = Math.round((completed / items.length) * 100);

          return (
            <div key={category} className='space-y-2 rounded-lg shadow-md p-4'>
              <div className='flex justify-between text-sm'>
                <span>{category}</span>
                <span>
                  {completed}/{items.length}
                </span>
              </div>
              <div className='w-full bg-slate-200 rounded-full h-2'>
                <div
                  className='bg-emerald-500 h-2 rounded-full transition-all'
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AuditProgress;

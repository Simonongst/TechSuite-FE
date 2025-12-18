import { useAuth } from "../../context/AuthContext";

function AuditChecklistPanel({ checklistItems, auditData, handleToggle }) {
  const { user } = useAuth();

  const categories = checklistItems.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className='space-y-2 text-gray-700'>
      <h2 className='font-semibold'>IT Audit Checklist</h2>
      <p className='text-sm mb-10'>
        Comprehensive checklist for IT infrastructure audits
      </p>

      {Object.entries(categories).map(([category, items]) => (
        <div key={category}>
          <h3 className='font-semibold text-slate-900 mb-2 text-sm'>
            {category}
          </h3>
          <div className='space-y-2 ml-4 mb-8'>
            {items.map((item) => (
              <div key={item.label} className='flex items-center text-sm gap-4'>
                <input
                  type='checkbox'
                  checked={auditData.some(
                    (i) =>
                      i.label === item.label &&
                      i.category === item.category &&
                      i.userId._id === user._id
                  )}
                  onChange={(e) =>
                    handleToggle(item.label, item.category, e.target.checked)
                  }
                  className='h-4 w-4'
                />
                <label
                  className={`cursor-pointer ${
                    auditData.includes(item.label)
                      ? 'line-through text-slate-500'
                      : 'text-slate-900'
                  }`}
                >
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AuditChecklistPanel;

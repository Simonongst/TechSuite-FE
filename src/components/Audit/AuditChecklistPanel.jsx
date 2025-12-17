function AuditChecklistPanel({ checklistItems, checkedItems, handleToggle }) {
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
          <h3 className='font-semibold text-slate-900 mb-2 text-sm'>{category}</h3>
          <div className='space-y-2 ml-4 mb-8'>
            {items.map((item) => (
              <div key={item.label} className='flex items-center text-sm gap-4'>
                <input
                  type='checkbox'
                  checked={checkedItems.includes(item.label)}
                  onChange={() => handleToggle(item.label)}
                  className='h-4 w-4'
                />
                <label
                  className={`cursor-pointer ${
                    checkedItems.includes(item.label)
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

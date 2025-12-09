function EquipmentSummary({ summary, form }) {
  return (
    <div className='space-y-2 text-gray-700'>
      <h2 className='font-semibold'>Equipment Summary</h2>
      <p className='text-sm'>Live calculation results</p>

      <div className='mt-4 space-y-4'>
        {summary.items.map((item, idx) => (
          <div
            key={idx}
            className='text-sm border rounded-lg border-gray-300 p-2 flex justify-between'
          >
            <div className='font-medium ml-2'>
              <div className="font-semibold">{item.label}</div>
              <div>
                {item.qty} x ${item.unitCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className='flex items-center bg-gray-100 rounded px-4'>
              ${item.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        ))}
        <div className='space-y-2 border rounded-lg border-gray-300 pl-4 text-sm'>
          <div className='mt-4 font-semibold'>Total Estimated Cost</div>
          <div className='font-semibold'>
            {`${form.currency} $${summary.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          </div>
          <div className='mb-4 text-gray-600'>
            {summary.totalItems} items total
          </div>
        </div>
      </div>
    </div>
  );
}

export default EquipmentSummary;

import { useState, useEffect } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { HiOutlineRefresh } from 'react-icons/hi';

function Currency({ currencyData, fetchCurrencies }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [tableData, setTableData] = useState(currencyData);

  const filterItems = [
    { label: 'Active: Yes', value: true },
    { label: 'Active: No', value: false },
  ];
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    if (!filter) {
      setTableData(currencyData);
    } else {
      filterData(filter.value);
    }
  }, [currencyData, filter]);

  function filterData(status) {
    if (status === null) {
      setTableData(currencyData);
    } else {
      setTableData(
        currencyData.filter((currency) => currency.isActive === status)
      );
    }
  }

  return (
    <div className='px-4 max-w-7xl mx-auto'>
      <h3 className='p-3 text-xl font-semibold'>Currency Table</h3>
      <div className='mb-2 flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <h3 className='text-sm pl-3'>Quick Filters: </h3>
          {filterItems.map((item, idx) => (
            <button
              key={idx}
              className={`text-sm px-3 py-1 rounded-3xl border border-transparent hover:border-slate-500 transition-transform duration-300 ease-in-out ${
                filter?.label === item.label
                  ? 'bg-slate-400 text-white'
                  : 'bg-slate-200'
              }`}
              onClick={() => {
                if (filter?.label === item.label) {
                  setFilter(null);
                  filterData(null);
                } else {
                  setFilter(item);
                  filterData(item.value);
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className='flex items-center'>
          <HiOutlineRefresh
            size={25}
            onClick={() => {
              setFilter(null);
              setSelectedRow(null);
              setSelectedCurrency(null);
              fetchCurrencies();
            }}
            className='transition-transform duration-200 hover:rotate-45'
          />
          <button
            className='flex items-center gap-2 m-3 bg-slate-500 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-sm hover:bg-red-400 transition-all duration-200 active:scale-95'
            onClick={() => {
              setSelectedCurrency(null);
              setOpenDialog(true);
            }}
          >
            <IoIosAddCircle />
            Add Currency
          </button>
        </div>
      </div>
    </div>
  );
}

export default Currency;

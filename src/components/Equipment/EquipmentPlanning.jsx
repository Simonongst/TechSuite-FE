import { useState } from 'react';

function EquipmentPlanning({ currencyData, form, setForm }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleReset = () => {
    setForm({
      currency: 'USD',
      employees: 0,
      desktop: 0,
      laptop: 0,
      monitor: 0,
      deskPhone: 0,
      switchPorts: '',
    });
  };

  return (
    <div className='space-y-2 text-gray-700'>
      <h2 className='font-semibold'>Equipment Planning Inputs</h2>
      <p className='text-sm'>
        Enter your organization's requirements to calculate equipment needs
      </p>

      <fieldset className='mb-4'>
        <label className='text-sm font-medium' htmlFor='currency'>
          <h3 className='mt-4 font-semibold'>$ Currency:</h3>
          <select
            id='currency'
            name='currency'
            value={form.currency}
            onChange={handleChange}
            className='mt-2 py-2 px-2 block w-full border-gray-300 rounded-md shadow-sm'
            required
          >
            {currencyData
              .slice()
              .sort((a, b) => a.code.localeCompare(b.code))
              .map((currency, idx) => (
                <option key={idx} value={currency.code}>
                  {`${currency.code} - ${
                    currency.label
                  } (Rate: ${currency.rateToBase.toLocaleString(undefined, {
                    minimumFractionDigits: currency.rateToBase < 10 ? 4 : 2,
                    maximumFractionDigits: currency.rateToBase < 10 ? 4 : 2,
                  })})`}
                </option>
              ))}
          </select>
        </label>
      </fieldset>
      <fieldset className='mb-4'>
        <label className='text-sm font-medium' htmlFor='employees'>
          <h3 className='mt-4 font-semibold'>Number of Employees:</h3>
          <input
            id='employees'
            type='number'
            name='employees'
            value={form.employees}
            onChange={handleChange}
            className='mt-2 py-2 px-2 block w-full border-gray-300 rounded-md shadow-sm'
            required
          ></input>
        </label>
      </fieldset>
      <fieldset className='mt-8 mb-4'>
        <legend className='text-sm font-semibold'>Computer:</legend>

        <div className='grid grid-cols-2 gap-4'>
          <label className='text-sm font-medium' htmlFor='desktop'>
            <h3 className='mt-4'>Desktop:</h3>
            <input
              id='desktop'
              type='number'
              name='desktop'
              value={form.desktop}
              onChange={handleChange}
              className='mt-2 py-2 px-2 block w-full border-gray-300 rounded-md shadow-sm'
              required
            ></input>
          </label>
          <label className='text-sm font-medium' htmlFor='laptop'>
            <h3 className='mt-4'>Laptop:</h3>
            <input
              id='laptop'
              type='number'
              name='laptop'
              value={form.laptop}
              onChange={handleChange}
              className='mt-2 py-2 px-2 block w-full border-gray-300 rounded-md shadow-sm'
              required
            ></input>
          </label>
        </div>
      </fieldset>
      <fieldset className='mb-4'>
        <label className='text-sm font-medium' htmlFor='monitor'>
          <h3 className='mt-4 font-semibold'>Monitor:</h3>
          <input
            id='monitor'
            type='number'
            name='monitor'
            value={form.monitor}
            onChange={handleChange}
            className='mt-2 py-2 px-2 block w-full border-gray-300 rounded-md shadow-sm'
            required
          ></input>
        </label>
      </fieldset>
      <fieldset className='mb-4'>
        <label className='text-sm font-medium' htmlFor='deskPhone'>
          <h3 className='mt-4 font-semibold'>Desk Phone:</h3>
          <input
            id='deskPhone'
            type='number'
            name='deskPhone'
            value={form.deskPhone}
            onChange={handleChange}
            className='mt-2 py-2 px-2 block w-full border-gray-300 rounded-md shadow-sm'
            required
          ></input>
        </label>
      </fieldset>
      <fieldset className='mb-4'>
        <label className='text-sm font-medium' htmlFor='switchPorts'>
          <h3 className='mt-4 font-semibold'>Network Switch Ports:</h3>
          <select
            id='switchPorts'
            name='switchPorts'
            value={form.switchPorts}
            onChange={handleChange}
            className='mt-2 py-2 px-2 block w-full border-gray-300 rounded-md shadow-sm'
            required
          >
            <option value=''>Select Switch Type</option>
            <option value='24'>24</option>
            <option value='48'>48</option>
          </select>
        </label>
      </fieldset>
      <div className='mt-12 mb-4 flex justify-end gap-4'>
        <button
          type='button'
          onClick={handleReset}
          className='text-sm px-4 py-2 bg-gray-100 text-gray-800 rounded shadow hover:bg-gray-200'
        >
              Reset
        </button>
      </div>
    </div>
  );
}

export default EquipmentPlanning;

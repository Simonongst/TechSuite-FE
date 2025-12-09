import { useState } from 'react';
import EquipmentPlanning from '../components/Equipment/EquipmentPlanning';
import EquipmentSummary from '../components/Equipment/EquipmentSummary';
import calculateSummary from '../utils/calculateSummary';

function EquipmentCalculator({ currencyData, equipmentData }) {
  const [form, setForm] = useState({
    currency: 'USD',
    employees: 0,
    desktop: 0,
    laptop: 0,
    monitor: 0,
    deskPhone: 0,
    switchPorts: '',
  });

  const summary = calculateSummary(form, equipmentData, currencyData);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 py-4 max-w-7xl mx-auto'>
      <div className='lg:col-span-2 bg-white rounded-lg shadow-md p-6'>
        <EquipmentPlanning currencyData={currencyData} form={form} setForm={setForm} />
      </div>
      <div className='lg:col-span-1 bg-white rounded-lg shadow-md p-6'>
        <EquipmentSummary summary={summary} form={form}/>
      </div>
    </div>
  );
}

export default EquipmentCalculator;

import EquipmentPlanning from '../components/Equipment/EquipmentPlanning';
import EquipmentSummary from '../components/Equipment/EquipmentSummary';

function EquipmentCalculator({
    currencyData,
}) {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 py-4 max-w-7xl mx-auto'>
      <div className='lg:col-span-2 bg-white rounded-lg shadow-md p-6'>
        <EquipmentPlanning currencyData={currencyData}/>
      </div>
      <div className='lg:col-span-1 bg-white rounded-lg shadow-md p-6'>
        <EquipmentSummary />
      </div>
    </div>
  );
}

export default EquipmentCalculator;

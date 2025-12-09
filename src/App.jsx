import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TopNavBar from './components/NavBars/TopNavBar';
import UserNavBar from './components/NavBars/UserNavBar';
import MainTabs from './components/Tabs/MainTabs';
import { getAllCurrency } from './services/currency';
import { getAllEquipment } from './services/equipment';
import EquipmentCalculator from './pages/EquipmentCalculator';
import Currency from './pages/Currency';
import Equipment from './pages/Equipment';

function App() {
  const [currencyData, setCurrencyData] = useState([]);
  const [equipmentData, setEquipmentData] = useState([]);
  const location = useLocation();

  async function fetchCurrencies() {
    try {
      const data = await getAllCurrency();
      console.log(data);
      if (data) setCurrencyData(data);
    } catch (error) {
      console.log('Error fetching currency data from BE:', error);
    }
  }

  async function fetchEquipment() {
    try {
      const data = await getAllEquipment();
      console.log(data);
      if (data) setEquipmentData(data);
    } catch (error) {
      console.log('Error fetching equipment data from BE:', error);
    }
  }

  useEffect(() => {
    fetchCurrencies();
    fetchEquipment();
  }, []);

  return (
    <div className='h-screen w-full bg-gray-50'>
      <TopNavBar />
      <div className='flex-1'>
        <UserNavBar />
      </div>

      {location.pathname !== '/currencies' &&
        location.pathname !== '/equipment' && (
          <div>
            <MainTabs />
          </div>
        )}

      <Routes>
        <Route
          path='/'
          element={
            <EquipmentCalculator
              currencyData={currencyData.filter(
                (currency) => currency.isActive
              )}
              equipmentData={equipmentData}
            />
          }
        />
        <Route
          path='/equipment'
          element={
            <Equipment
              equipmentData={equipmentData}
              fetchEquipment={fetchEquipment}
              currencyData={currencyData}
              fetchCurrencies={fetchCurrencies}
            />
          }
        />
        <Route
          path='/currencies'
          element={
            <Currency
              currencyData={currencyData}
              fetchCurrencies={fetchCurrencies}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

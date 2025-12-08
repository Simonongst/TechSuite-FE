import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TopNavBar from './components/NavBars/TopNavBar';
import UserNavBar from './components/NavBars/UserNavBar';
import MainTabs from './components/Tabs/MainTabs';
import { getAllCurrency } from './services/currency';
import EquipmentCalculator from './pages/EquipmentCalculator';
import Currency from './pages/Currency';

function App() {
  const [currencyData, setCurrencyData] = useState([]);
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

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return (
    <div className='h-screen w-full bg-gray-50'>
      <TopNavBar />
      <div className='flex-1'>
        <UserNavBar />
      </div>

      {location.pathname !== '/currencies' && (
        <div>
          <MainTabs />
        </div>
      )}

      <Routes>
        <Route
          path='/'
          element={<EquipmentCalculator currencyData={currencyData.filter((currency) => currency.isActive)} />}
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

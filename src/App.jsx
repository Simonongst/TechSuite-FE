import { useEffect, useState } from 'react';
import TopNavBar from './components/NavBars/TopNavBar';
import UserNavBar from './components/NavBars/UserNavBar';
import MainTabs from './components/Tabs/MainTabs';
import { getAllCurrency } from './services/currency';
import EquipmentCalculator from './pages/EquipmentCalculator';

function App() {
  const [currencyData, setCurrencyData] = useState([]);

  async function fetchCurrencies() {
      try {
      const data = await getAllCurrency();
      console.log(data);
      if (data) setCurrencyData(data);
    } catch (error) {
      console.log("Error fetching currency data from BE:", error);
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
      <div>
        <MainTabs />
      </div>
      <div>
        <EquipmentCalculator currencyData={currencyData}/>
      </div>
    </div>
  );
}

export default App;

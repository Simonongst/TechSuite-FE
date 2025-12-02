import TopNavBar from './components/NavBars/TopNavBar';
import UserNavBar from './components/NavBars/UserNavBar';
import MainTabs from './components/Tabs/MainTabs';

function App() {
  return (
    <div className='h-screen w-full bg-gray-50'>
      <TopNavBar />
      <div className='flex-1'>
        <UserNavBar />
      </div>
      <div>
        <MainTabs />
      </div>
    </div>
  );
}

export default App;

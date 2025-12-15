import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from './context/AuthContext.jsx';
import TopNavBar from './components/NavBars/TopNavBar';
import UserNavBar from './components/NavBars/UserNavBar';
import MainTabs from './components/Tabs/MainTabs';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import ProtectedRoute from './components/Routes/ProtectedRoute.jsx';
import RoleProtectedRoute from './components/Routes/RoleProtectedRoute.jsx';
import { getAllCurrency } from './services/currency';
import { getAllEquipment } from './services/equipment';
import { getAllUsers } from './services/user';
import { getAllRecords } from './services/record';
import EquipmentCalculator from './pages/EquipmentCalculator';
import Currency from './pages/Currency';
import Equipment from './pages/Equipment';
import User from './pages/User';
import Records from './pages/Records.jsx';
import Settings from './pages/Settings.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

function App() {
  const [currencyData, setCurrencyData] = useState([]);
  const [equipmentData, setEquipmentData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [recordData, setRecordData] = useState([]);
  const { isAuthenticated, loading, tokens } = useAuth();
  const location = useLocation();

  async function fetchCurrencies() {
    try {
      const data = await getAllCurrency(tokens.access);
      console.log(data);
      if (data) setCurrencyData(data);
    } catch (error) {
      console.log('Error fetching currency data from BE:', error);
    }
  }

  async function fetchEquipment() {
    try {
      const data = await getAllEquipment(tokens.access);
      console.log(data);
      if (data) setEquipmentData(data);
    } catch (error) {
      console.log('Error fetching equipment data from BE:', error);
    }
  }

  async function fetchUsers() {
    try {
      const data = await getAllUsers(tokens.access);
      console.log(data);
      if (data) setUserData(data);
    } catch (error) {
      console.log('Error fetching users data from BE:', error);
    }
  }

  async function fetchRecords() {
    try {
      const data = await getAllRecords(tokens.access);
      console.log(data);
      if (data) setRecordData(data);
    } catch (error) {
      console.log('Error fetching records data from BE:', error);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchCurrencies();
      fetchEquipment();
      fetchUsers();
      fetchRecords();
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-lg'>Loading...</div>
      </div>
    );
  }

  const authPaths = [
    '/signin',
    '/signup',
    '/forgot-password',
    '/reset-password',
  ];

  return (
    <div
      className={
        authPaths.includes(location.pathname) ? '' : 'min-h-screen w-full'
      }
    >
      {!authPaths.includes(location.pathname) && (
        <>
          <TopNavBar />
          <UserNavBar />
          {location.pathname !== '/currencies' &&
            location.pathname !== '/equipment' &&
            location.pathname !== '/users' &&
            location.pathname !== '/records' &&
            location.pathname !== '/settings' && <MainTabs />}
        </>
      )}

      <Routes>
        {/* Public routes */}
        <Route
          path='/signin'
          element={isAuthenticated ? <Navigate to='/' replace /> : <SignIn />}
        />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route
          path='/signup'
          element={isAuthenticated ? <Navigate to='/' replace /> : <SignUp />}
        />

        <Route
          path='/users'
          element={
            <RoleProtectedRoute allowedRoles={['Admin']}>
              <User userData={userData} fetchUsers={fetchUsers} />
            </RoleProtectedRoute>
          }
        />
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
            <RoleProtectedRoute allowedRoles={['Admin']}>
              <Equipment
                equipmentData={equipmentData}
                fetchEquipment={fetchEquipment}
                currencyData={currencyData}
                fetchCurrencies={fetchCurrencies}
              />
            </RoleProtectedRoute>
          }
        />
        <Route
          path='/currencies'
          element={
            <RoleProtectedRoute allowedRoles={['Admin']}>
              <Currency
                currencyData={currencyData}
                fetchCurrencies={fetchCurrencies}
              />
            </RoleProtectedRoute>
          }
        />
        <Route
          path='/records'
          element={
            <ProtectedRoute>
              <Records
                recordData={recordData}
                fetchRecords={fetchRecords}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path='/settings'
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </div>
  );
}

export default App;

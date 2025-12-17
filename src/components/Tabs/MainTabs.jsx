import * as Tabs from '@radix-ui/react-tabs';
import { BsCalculatorFill } from 'react-icons/bs';
import { GoChecklist } from 'react-icons/go';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

function MainTabs() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const tabValue =
    location.pathname === '/audit-checklist'
      ? 'audit-checklist'
      : 'equipment-calculator';

  return (
    <div className='container mx-auto px-4 py-4 max-w-7xl'>
      <Tabs.Root
        value={tabValue}
        onValueChange={(value) => {
          value === 'audit-checklist'
            ? navigate('/audit-checklist')
            : navigate('/equipment-calculator');
        }}
      >
        <Tabs.List className='inline-flex bg-gray-200 p-1 rounded-full shadow-md'>
          <Tabs.Trigger
            value='equipment-calculator'
            className='flex items-center gap-2 px-10 py-1 rounded-full font-medium
             data-[state=active]:bg-white'
          >
            <BsCalculatorFill size={20} />
            Equipment Calculator
          </Tabs.Trigger>
          {user.role !== 'User' && (
            <Tabs.Trigger
              value='audit-checklist'
              className='flex items-center gap-2 px-14 py-1 rounded-full font-medium
             data-[state=active]:bg-white'
            >
              <GoChecklist size={20} />
              Audit Checklist
            </Tabs.Trigger>
          )}
        </Tabs.List>
      </Tabs.Root>
    </div>
  );
}

export default MainTabs;

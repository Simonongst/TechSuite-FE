import { IoSettingsOutline } from 'react-icons/io5';
import { LuUserRoundCog } from 'react-icons/lu';
import { MdCurrencyExchange, MdComputer } from 'react-icons/md';
import { AiOutlineDatabase, AiOutlineAudit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function UserNavBar() {
  const { user } = useAuth();

  const allNavItems = [
    {
      name: 'User',
      icon: <LuUserRoundCog size={25}/>,
      path: '/users',
      roles: ['Admin'],
    },
    {
      name: 'Equipment',
      icon: <MdComputer size={25}/>,
      path: '/equipment',
      roles: ['Admin'],
    },
    {
      name: 'Currency',
      icon: <MdCurrencyExchange size={25}/>,
      path: '/currencies',
      roles: ['Admin'],
    },
    {
      name: 'Audits',
      icon: <AiOutlineAudit size={25}/>,
      path: '/audits',
      roles: ['Admin', 'Reviewer'],
    },
    {
      name: 'Records',
      icon: <AiOutlineDatabase size={25}/>,
      path: '/records',
      roles: ['Admin', 'Reviewer', 'Editor'],
    },
    {
      name: 'Settings',
      icon: <IoSettingsOutline size={25}/>,
      path: '/settings',
      roles: ['Admin', 'Reviewer', 'Editor', 'User'],
    },
  ];

  const allowedNavItems = allNavItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <div className='container mx-auto px-4 py-4 max-w-7xl'>
      <div className='flex justify-end gap-3'>
      {allowedNavItems.map((item, idx) => (
        <Link key={idx} to={item.path} title={item.name}>
          <span className='transition-transform duration-300 ease-in-out hover:scale-110'>
            {item.icon}
          </span>
        </Link>
      ))}
      </div>
    </div>
  );
}

export default UserNavBar;

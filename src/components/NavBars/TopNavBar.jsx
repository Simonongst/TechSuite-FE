import { Link, useNavigate } from 'react-router-dom';
import avatarBoy from '../../assets/avatar-sample-boy.png';
import techsuite from '../../assets/techsuite.png';
import { useAuth } from '../../context/AuthContext';

function TopNavBar() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  async function handleLogout(e) {
    e.preventDefault();
    await signOut();
    navigate('/signin');
  }

  return (
    <div className='bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50'>
      <div className='container mx-auto px-4 py-4 max-w-7xl'>
        <div className='flex items-center justify-between gap-3'>
          <div className='flex items-center'>
            <Link to='/'>
              <img src={techsuite} className='w-20 h-20' alt='TechSuite Logo' />
            </Link>
            <div className='flex flex-col'>
              <h1 className='text-slate-900 font-bold text-2xl'>TechSuite</h1>
              <p className='text-slate-500 text-sm'>
                Information Technology Toolkit
              </p>
            </div>
          </div>

          {user && (
          <div className='flex flex-col items-end'>
            <div className='flex items-center space-x-2'>
              <img
                src={avatarBoy}
                alt='Profile Picture'
                className='w-10 h-10 mr-2 rounded-full'
              />
              <h1>{user.username}</h1>
              <p>|</p>
              <h1 className='text-slate-400'>{user.role}</h1>
            </div>
            <button
              onClick={handleLogout}
              className='text-blue-500 text-sm hover:underline'
            >
              Logout
            </button>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopNavBar;

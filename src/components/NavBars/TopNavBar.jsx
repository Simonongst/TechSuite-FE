import avatarBoy from '../../assets/avatar-sample-boy.png';
import techsuite from '../../assets/techsuite.png';

function TopNavBar() {
  return (
    <div className='bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50'>
      <div className='container mx-auto px-4 py-4 max-w-7xl'>
        <div className='flex items-center justify-between gap-3'>
          <div className='flex items-center'>
            <img src={techsuite} className='w-20 h-20' alt='TechSuite Logo' />
            <div className='flex flex-col'>
              <h1 className='text-slate-900 font-bold text-2xl'>TechSuite</h1>
              <p className='text-slate-500 text-sm'>
                Information Technology Toolkit
              </p>
            </div>
          </div>

          <div className='flex flex-col items-end'>
            <div className='flex items-center space-x-2'>
              <img src={avatarBoy} alt='Profile Picture' className='w-10 mr-2' />
              <h1>Simon Ong</h1>
              <p>|</p>
              <h1 className='text-slate-400'>Admin</h1>
            </div>
            <a href='/logout' className='text-blue-500 text-sm hover:underline'>Logout</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopNavBar;

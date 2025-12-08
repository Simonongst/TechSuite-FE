import { IoSettingsOutline } from 'react-icons/io5';
import { LuUserRoundCog } from 'react-icons/lu';
import { MdCurrencyExchange } from 'react-icons/md';
import { AiOutlineDatabase, AiOutlineAudit } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function UserNavBar() {
  return (
    <div className='container mx-auto px-4 py-4 max-w-7xl'>
      <div className='flex justify-end gap-3'>
        <LuUserRoundCog
          size={25}
          title='Users'
          className='transition-transform duration-300 ease-in-out hover:scale-110'
        />
        <Link to='/currencies'>
          <MdCurrencyExchange
            size={25}
            title='Currency'
            className='transition-transform duration-300 ease-in-out hover:scale-110'
          />
        </Link>
        <AiOutlineAudit
          size={25}
          title='Audits'
          className='transition-transform duration-300 ease-in-out hover:scale-110'
        />
        <AiOutlineDatabase
          size={25}
          title='Records'
          className='transition-transform duration-300 ease-in-out hover:scale-110'
        />
        <IoSettingsOutline
          size={25}
          title='Settings'
          className='transition-transform duration-300 ease-in-out hover:scale-110'
        />
      </div>
    </div>
  );
}

export default UserNavBar;

import { IoSettingsOutline } from 'react-icons/io5';
import { LuUserRoundCog } from "react-icons/lu";
import { RiCurrencyLine } from "react-icons/ri";
import { AiOutlineDatabase, AiOutlineAudit } from 'react-icons/ai';

function UserNavBar() {
  return (
    <div className='container mx-auto px-4 py-4 max-w-7xl'>
      <div className='flex justify-end gap-3'>
        <LuUserRoundCog
          size={25}
          title='Users'
          className='transition-transform duration-300 ease-in-out hover:scale-110'
        />
        <RiCurrencyLine
          size={25}
          title='Currency'
          className='transition-transform duration-300 ease-in-out hover:scale-110'
        />                                
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

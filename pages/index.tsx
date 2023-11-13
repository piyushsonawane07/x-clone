import { FaXTwitter } from 'react-icons/fa6';
import { GoHomeFill } from 'react-icons/go';
import { LuSearch } from 'react-icons/lu';
import { FiMail } from 'react-icons/fi';
import { GoChecklist } from 'react-icons/go';
import { LuUsers, LuBell } from 'react-icons/lu';
import { BiUser } from 'react-icons/bi';
import { CgMoreO } from 'react-icons/cg';
import XCard from '@/components/XCard';

interface TwitterSideBarButton {
  title: string;
  icon: React.ReactNode;
}

const sidebarMenuItems: TwitterSideBarButton[] = [
  {
    title: 'Home',
    icon: <GoHomeFill />
  },
  {
    title: 'Explore',
    icon: <LuSearch />
  },
  {
    title: 'Notifications',
    icon: <LuBell />
  },
  {
    title: 'Messages',
    icon: <FiMail />
  },
  {
    title: 'Lists',
    icon: <GoChecklist />
  },
  {
    title: 'Communities',
    icon: <LuUsers />
  },
  {
    title: 'Premium',
    icon: <FaXTwitter />
  },
  {
    title: 'Profile',
    icon: <BiUser />
  },
  {
    title: 'More',
    icon: <CgMoreO />
  },

]

export default function Home() {
  return (
    <div>
      <div className='grid grid-cols-12 h-screen w-screen px-48'>
        <div className='col-span-3 p-2'>
          <div className="
            text-3xl 
            h-fit 
            hover:bg-[#181919] 
            rounded-full 
            p-3 
            w-fit 
            cursor-pointer 
            transition">
            <FaXTwitter></FaXTwitter>
          </div>
          <div className='mt-3'>
            <ul>
              {sidebarMenuItems.map((item, index) => <li className={`
                flex 
                justify-start 
                items-center 
                mt-2 
                gap-3 
                text-xl 
                hover:bg-[#181919] 
                rounded-full 
                ps-3 pe-6 py-2 
                w-fit 
                cursor-pointer 
                ${index === 0 ? 'font-bold' : ''}`} key={item.title}><span>{item.icon}</span><span>{item.title}</span></li>)}
            </ul>
          </div>
          <div className='mt-5'>
            <button className='
              bg-[#1A8CD8] 
              p-4 
              rounded-full 
              w-60 
              text-base 
              font-bold 
              cursor-pointer 
              hover:bg-[#1a8cd8f0]'>Post</button>
          </div>
        </div>
        <div className='
          col-span-6 
          border-r 
          border-l border-l-[#2f3336c8] border-r-[#2f3336c8]
          h-screen
          overflow-y-scroll
          no-scrollbar'>
            <XCard/>
            <XCard/>
            <XCard/>
            <XCard/>
            <XCard/>
            <XCard/>
            <XCard/>
          </div>
        <div className='col-span-3'></div>
      </div>
    </div>
  )
}

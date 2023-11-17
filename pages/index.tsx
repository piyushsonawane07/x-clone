import { FaX, FaXTwitter } from 'react-icons/fa6';
import { GoHomeFill } from 'react-icons/go';
import { LuSearch } from 'react-icons/lu';
import { FiMail } from 'react-icons/fi';
import { GoChecklist } from 'react-icons/go';
import { LuUsers, LuBell } from 'react-icons/lu';
import { BiUser } from 'react-icons/bi';
import { CgMoreO } from 'react-icons/cg';
import XCard from '@/components/XCard';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { graphql } from '@/gql';
import { graphqlClient } from '@/clients/api';
import { verifyGoogleUserGoogleTokenQuery } from '@/graphql/query/user';

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

  const handleGoogleLogin = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential;
    if(!googleToken) return toast.error('Google token not found !');

    const { verifyGoogleToken } = await graphqlClient.request(verifyGoogleUserGoogleTokenQuery, {token: googleToken});

    toast.success('Verified Successfully.')
    console.log(verifyGoogleToken);
    if(verifyGoogleToken) 
      window.localStorage.setItem("__twitter_token", verifyGoogleToken)

   }, [])

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
              {
                sidebarMenuItems.map((item, index) => <li className={`
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
                ${index === 0 ? 'font-bold' : ''}`} 
                key={item.title}><span>{item.icon}</span><span>{item.title}</span></li>)}
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
          <XCard />
          <XCard />
        </div>
        <div className='col-span-3 ps-5 pt-5 pb-5'>
          <div className='ps-3 pb-4 pt-4 bg-[#2f3336c8] rounded-lg'>
            <div className='flex mb-2'>New to <span className='ms-2 mt-1 me-1'><FaXTwitter /></span> ? </div>
            <GoogleLogin onSuccess={handleGoogleLogin} />
          </div>
        </div>
      </div>
    </div>
  )
}

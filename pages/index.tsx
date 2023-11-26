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
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { graphql } from '@/gql';
import { graphqlClient } from '@/clients/api';
import { verifyGoogleUserGoogleTokenQuery } from '@/graphql/query/user';
import { useCurrentUser } from '@/hooks/user';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { FiMoreHorizontal } from "react-icons/fi";
import { FiImage } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import { useCreateTweet, useGetAllTweets } from '@/hooks/tweet';
import { Tweet } from '@/gql/graphql';

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

  const { user } = useCurrentUser();
  const { tweets = []} = useGetAllTweets();
  const queryClient: any = useQueryClient();
  const { mutate } = useCreateTweet();
  const [content, setContent]  = useState("");

  const handleSelectImage = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute("type","file");
    input.setAttribute("accept","image/*")
    input.click();
  },[])

  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
    });
    setContent("");
  }, [content, mutate])


  const handleGoogleLogin = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential;
    console.log(googleToken);

    if (!googleToken) return toast.error('Google token not found !');

    const { verifyGoogleToken } = await graphqlClient.request(verifyGoogleUserGoogleTokenQuery, { token: googleToken });
    toast.success('Verified Successfully.')
    console.log(verifyGoogleToken);

    if (verifyGoogleToken)
      window.localStorage.setItem("__twitter_token", verifyGoogleToken)

    await queryClient.invalidateQueries(["current-user"])
  }, [queryClient])

  return (
    <div>
      <div className='grid grid-cols-12 h-screen w-screen px-48 relative'>
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
                gap-3 
                text-lg 
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
          {user && (
            <div className='absolute bottom-3 flex gap-4 items-center hover:bg-[#181919]  rounded-full ps-3 pe-6 pt-3 pb-3'>
              {
                user && user.profileImageURL &&
                (<Image className='rounded-full' src={user?.profileImageURL} alt="user-image" width={50} height={50} />
                )}
              <h3 className='font-medium text-base'>{user.firstName + ' ' + user.lastName}</h3>
              <FiMoreHorizontal />
            </div>
          )}

        </div>
        <div className='
          col-span-6 
          border-r 
          border-l border-l-[#2f3336c8] border-r-[#2f3336c8]
          h-screen
          overflow-y-scroll
          no-scrollbar'>
          <div className="border-t border-t-[#2F3336] p-3">
            <div className='grid grid-cols-12'>
              <div className="col-span-1">
                {user?.profileImageURL && <Image
                  className="rounded-full mt-2"
                  src={user?.profileImageURL}
                  alt="user-image"
                  height={50}
                  width={50}
                />}
              </div>
              <div className='col-span-11 ms-4 pt-4'>
                <div className='flex border w-fit pe-3 rounded-full border-[#3e4347]'>
                  <div className='text-[#1D9BF0] px-4 py-1 font-semibold text-xs '>Everyone </div> 
                  <div className='pt-1 text-[#1D9BF0]'><FaChevronDown/></div>
                </div>
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className='w-full bg-transparent mt-5 text-lg px-3 py-2 border-b border-b-[#2F3336] no-scrollbar'
                  rows={3}
                  placeholder="What's happening ?!">
                </textarea>
                <div className='mt-1 flex justify-between'>
                  <div className='hover:bg-[#0A171F] hover:text-[#1D9BF0] rounded-full p-3 cursor-pointer'>
                    <FiImage onClick={handleSelectImage} className='text-xl font-bold text-[#1D9BF0]' />
                  </div>
                  <button
                  onClick={handleCreateTweet} 
                  className='
                  bg-[#1A8CD8] 
                  py-1
                  h-7
                  px-5
                  me-4
                  mt-3
                  rounded-full 
                  text-sm 
                  cursor-pointer 
                  hover:bg-[#1a8cd8f0]'>Post</button>
                </div>
              </div>
            </div>
          </div>
          {
            tweets?.map(tweet => tweet ? <XCard key={tweet?.id} data={tweet as Tweet} /> : null
          )}
        </div>
        <div className='col-span-3 ps-5 pt-5 pb-5'>
          {!user && (<div className='ps-3 pb-4 pt-4 bg-[#2f3336c8] rounded-lg'>
            <div className='flex mb-2'>New to <span className='ms-2 mt-1 me-1'><FaXTwitter /></span> ? </div>
            <GoogleLogin onSuccess={handleGoogleLogin} />
          </div>)}
        </div>
      </div>
    </div>
  )
}

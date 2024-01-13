import React, { useCallback, useMemo } from 'react';
import { BiUser } from 'react-icons/bi';
import { FaXTwitter } from 'react-icons/fa6';
import { FiMail, FiMoreHorizontal } from 'react-icons/fi';
import { GoChecklist, GoHomeFill } from 'react-icons/go';
import { LuBell, LuSearch, LuUsers } from 'react-icons/lu';
import { CgMoreO } from 'react-icons/cg';
import { useCurrentUser } from '@/hooks/user';
import Image from 'next/image';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { graphqlClient } from '@/clients/api';
import { verifyGoogleUserGoogleTokenQuery } from '@/graphql/query/user';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';


interface TwitterSideBarButton {
    title: string;
    icon: React.ReactNode;
    link: string;
}



interface TwitterLayoutProps {
    children: React.ReactNode
}

const TwitterLayout: React.FC<TwitterLayoutProps> = (props) => {

    const { user } = useCurrentUser();
    const queryClient: any = useQueryClient();

    const sidebarMenuItems: TwitterSideBarButton[] = useMemo(() => [
        {
            title: 'Home',
            icon: <GoHomeFill />,
            link: '/'
        },
        {
            title: 'Explore',
            icon: <LuSearch />,
            link: ''
        },
        {
            title: 'Notifications',
            icon: <LuBell />,
            link: ''
        },
        {
            title: 'Messages',
            icon: <FiMail />,
            link: ''
        },
        {
            title: 'Lists',
            icon: <GoChecklist />,
            link: ''
        },
        {
            title: 'Communities',
            icon: <LuUsers />,
            link: ''
        },
        {
            title: 'Premium',
            icon: <FaXTwitter />,
            link: ''
        },
        {
            title: 'Profile',
            icon: <BiUser />,
            link: `/${user?.id}`
        },
        {
            title: 'More',
            icon: <CgMoreO />,
            link: ''
        },
    ], [user?.id]);

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
                <div className='col-span-3 flex justify-end pr-4 relative'>
                    <div>
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
                                    sidebarMenuItems.map((item, index) => <li key={item.title}>
                                        <Link className={`
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
                                            ${index === 0 ? 'font-bold' : ''}`} href={item.link}>
                                            <span>{item.icon}</span><span>{item.title}</span>
                                        </Link>
                                    </li>)}
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
                    {props.children}
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

export default TwitterLayout;
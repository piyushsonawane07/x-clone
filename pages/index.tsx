import XCard from '@/components/XCard';
import { useCallback, useState } from 'react';
import { useCurrentUser } from '@/hooks/user';
import Image from 'next/image';
import { FiImage } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import { useCreateTweet, useGetAllTweets } from '@/hooks/tweet';
import { Tweet } from '@/gql/graphql';
import TwitterLayout from '@/components/Layout/XLayout';

export default function Home() {

  const { user } = useCurrentUser();
  const { tweets = [] } = useGetAllTweets();
  const { mutate } = useCreateTweet();
  const [content, setContent] = useState("");

  const handleSelectImage = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*")
    input.click();
  }, [])

  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
    });
    setContent("");
  }, [content, mutate])

  return (
    <div>
      <TwitterLayout>
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
                <div className='pt-1 text-[#1D9BF0]'><FaChevronDown /></div>
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
      </TwitterLayout>
    </div>
  )
}

// export const getServerSideProps: GetServerSideProps<HomeProps> =async (context) => {
//   const allTweets = await graphqlClient.request(getAllTweetsQuery);
//   return {
//     props: {
//       tweets: allTweets.getAllTweets as Tweet[],
//     }
//   }
  
// }

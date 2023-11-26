import React from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import { HiOutlineUpload } from "react-icons/hi";
import { IoIosStats } from "react-icons/io";
import { Tweet } from "@/gql/graphql";

interface XCardProps {
    data: Tweet
}

const inter = Inter({ subsets: ['latin'] });

const XCard: React.FC<XCardProps> = (props) => {
    const { data } = props;
    return <div className="border-t border-t-[#2F3336] p-3">
            <div className="grid grid-cols-12">
                <div className="col-span-1">
                    { data.author?.profileImageURL && <Image
                        className="rounded-full mt-2"
                        src={data.author.profileImageURL}
                        alt="user-image"
                        height={50}
                        width={50}
                    />}
                </div>
                <div className="col-span-11 p-2 ms-2">
                    <h5 className="font-bold text-base"> {data.author?.firstName} {data.author?.lastName}<span className="text-[#a0a0a0] text-sm ms-1 font-light">@piyush_s0nawane</span></h5>
                    <p className="text-sm">
                        {data.content}
                    </p>
                    <div className="flex justify-between mt-5 text-xl items-center text-[#7b7b7b] pr-1 ">
                        <div className="hover:bg-[#0A171F] hover:text-[#1D9BF0] rounded-full p-1">
                            <BiMessageRounded />
                        </div>
                        <div className="hover:bg-[#071A14] hover:text-[#00BA7C] rounded-full p-1">
                            <FaRetweet/>
                        </div>
                        <div className="hover:bg-[#080808] hover:text-[#DE1672] rounded-full p-1">
                            <FaRegHeart/>
                        </div>
                        <div className="hover:bg-[#0A171F] hover:text-[#1D9BF0] rounded-full p-1">
                            <IoIosStats/>
                        </div>
                        <div className="flex ms-6">
                            <span className="hover:bg-[#0A171F] hover:text-[#1D9BF0] rounded-full p-2"><FiBookmark/></span>
                            <span className="ms-4 hover:bg-[#0A171F] hover:text-[#1D9BF0] rounded-full p-2"><HiOutlineUpload/></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
}

export default XCard;
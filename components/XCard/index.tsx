import React from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { AiOutlineHeart } from "react-icons/ai";
import { FiBookmark } from "react-icons/fi";
import { HiOutlineUpload } from "react-icons/hi";
import { IoIosStats } from "react-icons/io";


const inter = Inter({ subsets: ['latin'] });

const XCard: React.FC = () => {
    return <div className="border-t border-t-[#2F3336] p-3">
            <div className="grid grid-cols-12">
                <div className="col-span-1">
                    <Image
                        className="rounded-full mt-2"
                        src="https://pbs.twimg.com/profile_images/1721779424088174592/2Ag1vpLd_400x400.jpg"
                        alt="user-image"
                        height={50}
                        width={50}
                    />
                </div>
                <div className="col-span-11 p-2 ms-2">
                    <h5 className="font-bold text-base">Piyush Sonawane <span className="text-[#a0a0a0] text-sm ms-1 font-light">@piyush_s0nawane</span></h5>
                    <p className="text-sm">
                        {"Introverts talk. They can talk your ears off. But it's gotta be meaningful. No small talk. No chit-chat. No this & that. Talk stars, aliens, spirituality. Talk deep shit. Talk about something they're interested in and they won't shut up for days."}
                    </p>
                    <div className="flex justify-between mt-3 text-xl items-center text-[#7b7b7b] pr-1 ">
                        <div className="hover:bg-[#0A171F] hover:text-[#1D9BF0] rounded-full p-2">
                            <BiMessageRounded />
                        </div>
                        <div className="hover:bg-[#071A14] hover:text-[#00BA7C] rounded-full p-2">
                            <FaRetweet/>
                        </div>
                        <div className="hover:bg-[#080808] hover:text-[#DE1672] rounded-full p-2">
                            <AiOutlineHeart/>
                        </div>
                        <div className="hover:bg-[#0A171F] hover:text-[#1D9BF0] rounded-full p-2">
                            <IoIosStats/>
                        </div>
                        <div className="flex ms-5">
                            <span className="hover:bg-[#0A171F] hover:text-[#1D9BF0] rounded-full p-2"><FiBookmark/></span>
                            <span className="ms-4 hover:bg-[#0A171F] hover:text-[#1D9BF0] rounded-full p-2"><HiOutlineUpload/></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
}

export default XCard;
import TwitterLayout from "@/components/Layout/XLayout";
import XCard from "@/components/XCard";
import { Tweet, User } from "@/gql/graphql";
import { useCurrentUser } from "@/hooks/user";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/router";
import { graphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/query/user";

interface ServerProps {
    userInfo?: User
}

const UserProfilePage: NextPage<ServerProps> = (props) => {
    // const {user} = useCurrentUser();
    const router = useRouter();
    return (
        <div>
            <TwitterLayout>
                <div>
                    <nav className="flex items-center gap-4 py-3 px-3">
                        <IoArrowBack className="text-2xl"/>
                        <div className="px-4">
                            <h1 className="font-semibold text-xl">Piyush Sonawane</h1>
                            <h1 className="font-medium text-base text-[#404548]">{props.userInfo?.tweets?.length} Tweets</h1>
                        </div>
                    </nav>
                    <div className="p-4 border-b border-b-[#2F3336]">
                        {
                            props.userInfo?.profileImageURL 
                            && 
                            <Image className="rounded-full" src={props.userInfo?.profileImageURL} alt="progile image" width={100} height={100}/>
                        }
                        <h1 className="font-medium text-xl mt-4">Piyush Sonawane</h1>
                    </div>
                    <div>
                        {props.userInfo?.tweets?.map((tweet:any) => (
                            <XCard data={tweet as Tweet} key={tweet?.id}/>
                        ))}
                    </div>
                </div>
            </TwitterLayout>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async(context) => {
    const id = context.query.id as string | undefined;

    if(!id) return {notFound: true, props: {user: undefined}}

    const userInfo = await graphqlClient.request(getUserByIdQuery, {id});
    if(!userInfo?.getUserById) return {notFound: true}
    return {
        props: {
            userInfo: userInfo.getUserById as User,
        },
    };
}

export default UserProfilePage;
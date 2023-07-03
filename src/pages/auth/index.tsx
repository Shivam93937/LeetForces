import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar"
import { authModelState } from "../../atoms/authmodelatom";
import {useRecoilValue} from "recoil";
import Authmodel from "@/components/Models/Authmodel";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import Image from "next/image";
type AuthpageProps = {};

const Authpage: React.FC<AuthpageProps> = () => {
  const authModel=useRecoilValue(authModelState);
  const [user,loading,error]=useAuthState(auth);
  const [pageLoading, setPageLoading]=useState(true);
  const router=useRouter();

  useEffect(()=>{
    if(user) router.push("/")
    if(!loading && !user) setPageLoading(false);
  },[user,router,loading]);

  if(pageLoading) return null;

  return (
    <div className="bg-gradient-to-b from-gray-600 to-black h-screen relative">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
            <Image src="/hero.png" alt="Hero" height={700} width={700}/>
        </div>
        {authModel.isOpen && <Authmodel/>}
        {/* <Authmodel/> */}
      </div>
    </div>
  );
};
export default Authpage;

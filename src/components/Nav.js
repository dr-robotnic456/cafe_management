import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { FaHome, FaSun, FaFilter } from "react-icons/fa"
import { IoMdSettings } from "react-icons/io"

const MenuData = ({ showMenu, profileId }) => {
  const router = useRouter()
  const logout = () => {
    localStorage.removeItem("token");
    router.push("/Login")
  };

  return (
    <div className="flex w-full justify-end">
      {showMenu && (
        <div className="bg-white w-[100px] text-black">
            <Link href={`/profile/${profileId}`} className="w-full">
          <div className="px-3 py-1 hover:bg-[#4598FE]">
              Profile
          </div>
            </Link>
          <div onClick={logout} className="px-3 py-1 hover:bg-[#4598FE] cursor-pointer">LogOut</div>
        </div>
      )}
    </div>
  );
};

function Nav() {
  const [showMenu, setShowMenu] = useState(false);
  const handleMenuClick = (e) => {

    e.stopPropagation(); // Prevent click event from propagating
    setShowMenu(!showMenu);
  };
  return (
    <nav className='top-0 sticky w-full flex justify-between items-center z-10 px-10 bg-[#f1f1f1] text-slate-400 h-20 border-b-2 border-slate-700'>
        <div className='w-[35%] flex items-center space-x-4'>
            <div className='w-20 h-16 relative'>
                <Image src = {"/logo.jpg"} fill objectFit = "cover" alt='logo'/>
            </div>
            <div className='w-full'>
            <input type="search" name="search" id="search" className='w-full py-2 px-2 rounded-xl'/>
            </div>
        </div>
        <ul className='flex space-x-10 items-center'>
            <li><FaHome size={30}/></li>
            <li><FaFilter size={28}/></li>
            <li><IoMdSettings size={30} role='button' onClick={handleMenuClick}/></li>
            <li className='hover:text-[#FFD700] cursor-pointer'><FaSun size={30}/></li>
        </ul>
        {showMenu && <MenuData showMenu={showMenu}/>}
    </nav>
  )
}

export default Nav
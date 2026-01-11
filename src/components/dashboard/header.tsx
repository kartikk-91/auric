import { Bell, Menu, RefreshCw } from 'lucide-react'
import React from 'react'
import ProfileDropdown from './profile-dropdown'

const Header = () => {
    return (
        <div className='w-[calc(100%-122px)] bg-white h-16 fixed top-0 px-6 pr-10 flex items-center justify-between z-10'>
            <div className='text-gray-700 flex space-x-4'>
                <div className='p-2 rounded-full hover:text-[#fe4e00] hover:bg-[#fe4e001a] cursor-pointer transition-all duration-200'>
                    <Menu />
                </div>
                <div className='p-2 rounded-full hover:text-[#fe4e00] hover:bg-[#fe4e001a] cursor-pointer transition-all duration-200'>
                    <RefreshCw />
                </div>
            </div>
            <div className='text-gray-700 flex space-x-4 items-center'>
                <div className='p-2 rounded-full hover:text-[#fe4e00] hover:bg-[#fe4e001a] cursor-pointer transition-all duration-200'>
                    <Bell />
                </div>
                <ProfileDropdown/>
            </div>
        </div>
    )
}

export default Header

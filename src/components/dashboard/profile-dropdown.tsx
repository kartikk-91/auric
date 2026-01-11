import Image from 'next/image'
import React from 'react'
import { DropdownMenu, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu'
import { Gem, Mail, UserPen } from 'lucide-react'
import { Button } from '../ui/button'
import { signOut } from '@/auth'

const ProfileDropdown = () => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='w-10 h-10 rounded-full p-[2px] overflow-hidden cursor-pointer bg-[#fe4e007a]'>
                <Image src={"/demo-pfp.png"} alt="auric" width={20} height={20} className='h-full w-full pr-0 object-center rounded-full' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-90 h-100 mt-4 bg-white py-4 rounded-lg" align={"end"}>
                <div className='w-full h-full space-y-4'>
                    <div className='text-xl font-semibold px-6'>
                        User Profile
                    </div>
                    <div className='flex gap-4 px-6'>
                        <div className='w-20 h-20 rounded-full p-1 overflow-hidden cursor-pointer bg-[#fe4e007a]'>
                            <Image src={"/demo-pfp.png"} alt="auric" width={20} height={20} className='h-full w-full pr-0 object-center rounded-full' />
                        </div>
                        <div>
                            <div className='text-lg font-semibold'>Quantix Labs</div>
                            <div className='text-sm'><span className='font-[500]'>Admin:</span> Kartik Pokhriyal</div>
                            <div className='flex gap-1 text-[14px] items-center'><Mail size={15} />kartikpokhriyal538@gmail.com</div>
                        </div>
                    </div>
                    <div className='w-[90%] h-[1px] bg-gray-300 mx-auto'>
                    </div>
                    <div>
                        <div className='w-full h-18 flex gap-4 px-6 items-center hover:bg-[#fe4e0011] cursor-pointer'>
                            <div className='text-[#fe4e00] border border-[#fe4e0033] bg-[#fe4e001a] w-fit  p-3 rounded-md flex items-center justify-center'>
                                <UserPen />
                            </div>
                            <div>
                                <div className='font-semibold text-[15px]'>
                                    My Profile
                                </div>
                                <div className='text-[12px]'>
                                    Account Settings
                                </div>
                            </div>
                        </div>
                        <div className='w-full h-18 flex gap-4 px-6 items-center hover:bg-[#fe4e0011] cursor-pointer'>
                            <div className='text-[#fe4e00] border border-[#fe4e0033] bg-[#fe4e001a] w-fit  p-3 rounded-md flex items-center justify-center'>
                                <Gem />
                            </div>
                            <div>
                                <div className='font-semibold text-[15px]'>
                                    Subscription
                                </div>
                                <div className='text-[12px]'>
                                    Billing Information
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='px-6'>
                        <form action={async () => {
                            "use server";
                            await signOut({
                                redirectTo: "/auth/login"
                              });
                        }}>
                        <Button
                            type='submit'
                            variant={"destructive"} size={"lg"} className='w-full hover:bg-[#fe4e009e] bg-[#fe4e00] cursor-pointer'>
                            Log out
                        </Button>
                    </form>
                </div>
            </div>
        </DropdownMenuContent>
        </DropdownMenu >
    )
}

export default ProfileDropdown

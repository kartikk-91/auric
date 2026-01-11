import HeroBackground from "@/components/landing/hero-background";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className='w-full h-fit pt-28 bg-[#F4F2F1]'>
            <HeroBackground />
            <div className='w-full overflow-hidden h-fit relative z-10  flex flex-col items-center gap-4 py-10'>
                <div className='text-9xl font-switzer font-semibold text-center leading-tight'>
                    404
                </div>
                <div className='text-4xl font-switzer font-semibold text-center leading-tight'>
                    Oops! This path leads to the past.
                </div>
                <div className='text-[#808080] font-[500] max-w-xl text-center'>
                    We regret to inform you that the Pavyon you&apos;re searching for seems to be beyond our grasp. We apologize for any inconvenience this may cause.
                </div>
                <div>
                    <Link href={'/'}>
                        <Button className='text-lg px-6 py-7 mt-5 cursor-pointer'>
                            Back to Home Page
                        </Button>
                    </Link>
                </div>

            </div>
        </div>
    );
}

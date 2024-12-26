'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const HomeIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
        />
    </svg>
);

const links = [
    {
        name: 'Profile',
        href: '/profile',
        icon: HomeIcon,
    },
    {
        name: 'Settings',
        href: '/settings',
        icon: HomeIcon,
    },
    {
        name: 'Logout',
        href: '/logout',
        icon: HomeIcon,
    },
];

export default function MenuProfile() {
    const pathname = usePathname();
    return (
        <div className="bg-zinc-900 w-full h-full rounded-md">
            <ol className="p-4">
                {links.map((link, index) => (
                        <Link href={link.href} className="flex items-center gap-2 w-full p-4 rounded-md hover:bg-zinc-800">
                                <link.icon />
                                <span className="text-white">{link.name}</span>
                        </Link>
                    
                ))}
            </ol>
        </div>
    );
}

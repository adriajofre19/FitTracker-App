'use client';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";

const links = [
    { href: "/", label: "Home" },
    { href: "/exercises", label: "Mis rutinas" },
    { href: "/dashboard", label: "Contact" },
    { href: "/profile", label: "Profile" },
];

export default function Navbar() {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const ProfileImg = session?.user?.image ? session.user.image : '/profile.png';
    if (session) {
        return (
            <nav className="bg-zinc-900 h-16 w-full flex items-center justify-between px-8 shadow-md">
                <div className="w-1/6 h-full flex items-center justify-center">
                    <img src="/logo.png" alt="logo" className="w-10 h-10" />
                </div>
                <div className="w-3/6 h-full">
                    <ul className="flex items-center justify-center gap-5 h-full">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className={`text-gray-200 p-2 rounded-md text-sm hover:bg-zinc-600
                                ${pathname === link.href ? "bg-zinc-800" : ""}
                                    `}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-1/6 h-full flex items-center justify-center gap-5">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <img src={ProfileImg} alt="profile" className="w-8 h-8 rounded-full" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent sideOffset={5} alignOffset={5}>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Link href="/profile">Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => signOut()}>Sign out</DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                </div>
            </nav>
        )
    }
}
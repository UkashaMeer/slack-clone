import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCurrentUser } from "../api/user-current-user"
import { Loader, LogOut } from "lucide-react"
import { useAuthActions } from "@convex-dev/auth/react"

export const UserButton = () => {

    const {data, isLoading} = useCurrentUser()
    const { signOut } = useAuthActions()

    if(isLoading){
        return <Loader className="size-4 animate-spin text-muted-foreground" />
    }

    if (!data){
        return null
    }

    const {image, name, email} = data

    const avatarFallback = name!.charAt(0).toUpperCase()

    return(
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
                <Avatar className="size-10 hover:opacity-75 transition">
                    <AvatarImage src={image} className="outline-none" />
                    <AvatarFallback className="bg-gray-400 text-white">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="bottom" className="w-60">
                <DropdownMenuItem>
                    {name}
                </DropdownMenuItem>
                <DropdownMenuItem>
                    {email}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
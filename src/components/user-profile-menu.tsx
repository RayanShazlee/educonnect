import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Settings, User } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export function UserProfileMenu() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  const handleSignOut = () => {
    signOut();
    router.push('/');
  };

  return (
    <motion.div 
      className="flex items-center gap-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="relative h-10 w-10 rounded-full text-[var(--retro-text)] opacity-80 hover:text-[var(--retro-accent)] hover:opacity-100 transition-colors"
          >
            <Avatar className="h-10 w-10 border-2 border-[var(--retro-primary)]">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback className="bg-[var(--retro-primary)] text-[var(--retro-text)]">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-56 bg-[var(--retro-bg)] border-2 border-[var(--retro-primary)] text-[var(--retro-text)]" 
          align="end" 
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-vt323 font-medium leading-none text-[var(--retro-text)]">{user.name}</p>
              <p className="text-xs font-vt323 leading-none opacity-70">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="border-[var(--retro-primary)]" />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer font-vt323 hover:bg-[var(--retro-primary)]/10 text-[var(--retro-text)] opacity-80 hover:text-[var(--retro-accent)] hover:opacity-100"
              onClick={() => router.push('/profile')}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer font-vt323 hover:bg-[var(--retro-primary)]/10 text-[var(--retro-text)] opacity-80 hover:text-[var(--retro-accent)] hover:opacity-100"
              onClick={() => router.push('/settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="border-[var(--retro-primary)]" />
          <DropdownMenuItem
            className="cursor-pointer font-vt323 text-[var(--retro-accent)] hover:bg-[var(--retro-accent)] hover:text-[var(--retro-text)]"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  )
} 
import { useAuth } from "@/app/providers/auth/useAuth";
import { AppUser } from "@/entities/user/types";
import { authService } from "@/features/auth/api/auth-api";
import { Button } from "@/shared/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface UserMenuProps {
  user: AppUser;
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const navigate = useNavigate();
  const {logout} = useAuth();

  const handleLogout = async () => {
    try {
      await authService.logout();
      logout();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <span>{user.username}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
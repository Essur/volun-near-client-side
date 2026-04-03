import { useAuth } from "@/app/providers/auth/useAuth";
import { Button } from "@/shared/ui/button";

import { Label } from "@/shared/ui/label";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/shared/ui/navigation-menu";
import { Link } from "react-router-dom";
import { UserMenu } from "./UserMenu";
import { ThemeToggle } from "@/widgets/theme-toggle/ui/ThemeToggle";

export const NavBar = () => {
  const { user, isLoading } = useAuth();
  return (
    <div className="mb-10 pb-2 border-b-1 border-black">
      <NavigationMenu className="max-w-full w-full justify-stretch">
        <NavigationMenuList className="max-w-full w-full flex-row">

          <NavigationMenuItem >
            <Label className="px-4 font-bold">VolunNear App</Label>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link to="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

        </NavigationMenuList>

        <div className="flex-1"></div>

        {isLoading ? (
          <div className="w-20 h-8 bg-gray-200 animate-pulse rounded" />
        ) : user ? (
          <UserMenu user={user}/>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link to="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/auth/registration">Sign Up</Link>
            </Button>
          </div>
        )}
        <div className="ml-4">
          <ThemeToggle />
        </div>
      </NavigationMenu>
    </div>
  )
}
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/features/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { setAuth } from "@/slices/authSlice";

import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface UserAccountNavProps {
  name?: string;
  email: string;
}

const UserAccountNav = ({ email, name = "" }: UserAccountNavProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("user");
    dispatch(setAuth(null));
    navigate("/login");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {name && <p className="font-medium">{name}</p>}
            {email && (
              <p className="w-[200px] truncate text-sm text-zinc-700">
                {email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/">Dashboard</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();

            signOut();
          }}
          className="text-red-600 cursor-pointer"
        >
          Sign out
          <LogOut className="w-4 h-4 ml-2 " />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;

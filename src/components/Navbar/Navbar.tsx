import UserAccountNav from "@/components/UserAccountNav";
// import { ThemeToggle } from "./ThemeToggle";
import SignInButton from "@/components/SignInButton";
import { Link } from "react-router-dom";

const Navbar = () => {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  return (
    <div className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300  py-2 ">
      <div className="flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl">
        {/* Logo */}
        <Link to={"/"} className="flex items-center gap-2">
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
            Quizzzy
          </p>
        </Link>
        <div className="flex items-center">
          {/* <ThemeToggle className="mr-4" /> */}
          {user ? (
            <UserAccountNav email={user.email} />
          ) : (
            <SignInButton text={"Sign In"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { Avatar, AvatarFallback, AvatarImage } from "@/features/ui/avatar";

const UserAvatar = () => {
  return (
    <Avatar>
      <AvatarImage alt="avatar image" src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;

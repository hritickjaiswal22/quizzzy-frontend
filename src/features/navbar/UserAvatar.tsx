import { Avatar, AvatarFallback, AvatarImage } from "@/features/ui/avatar";

const UserAvatar = () => {
  return (
    <Avatar>
      <AvatarImage alt="avatar image" src="/avatar.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;

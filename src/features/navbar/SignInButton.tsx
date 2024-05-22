import { Button } from "@/features/ui/button";

import { useNavigate } from "react-router-dom";

type SignInButtonProps = { text: string };

const SignInButton = ({ text }: SignInButtonProps) => {
  const navigate = useNavigate();

  return <Button onClick={() => navigate("/login")}>{text}</Button>;
};

export default SignInButton;

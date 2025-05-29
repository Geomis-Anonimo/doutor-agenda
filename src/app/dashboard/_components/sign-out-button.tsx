'use client';

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const router = useRouter();
  return <Button onClick={() => {authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        router.push('/authentication');
      }
    }
  })}}>Sair</Button>
}
export default SignOutButton;
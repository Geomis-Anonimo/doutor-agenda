'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, {message: "E-mail é obrigatório"})
    .email({message: "Email é inválido"}),
  password: z.string().trim().min(8, {message: "Senha deve ter pelo menos 8 caracteres"})
})

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    await authClient.signIn.email({
      email: values.email,
      password: values.password,
    }, {
      onSuccess: () => {
        router.push("/dashboard")
      },
      onError: (error) => {
        toast.error("E-mail ou senha inválidos.");
      }
    })
  }
  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Faça login para continuar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu e-mail"
                      {...field}
                      autoComplete="email"  // Adicione esta linha
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Digite sua senha"
                      {...field}
                      autoComplete="current-password"  // Adicione esta linha
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ): (
                "Entrar"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
export default LoginForm;
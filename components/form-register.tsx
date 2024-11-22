"use client";

import { z } from "zod";
import { registerSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AtSign, KeyRound, User, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerAction } from "@/actions/auth.action";
import { Alert, AlertDescription } from "@/components/ui/alert";

const FormRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setError(null);
    startTransition(async () => {
      const response = await registerAction(values);
      if (response.error) {
        setError(response.error);
      } else {
        router.push("/login?registered=true");
      }
    });
  }

  return (
    <div className="p-6 space-y-4">
      <div className="space-y-1.5 text-center">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-indigo-100 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
          Create an account
        </h1>
        <p className="text-sm text-indigo-200 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
          Enter your information below to create your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-indigo-100 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
                  Username
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <User className="absolute left-2.5 top-2 h-4 w-4 text-gray-600 transition-colors group-hover:text-indigo-600" />
                    <Input 
                      placeholder="johndoe" 
                      className="pl-8 h-9 text-sm bg-white/80 hover:bg-white/90 focus:bg-white border-indigo-100/30 
                               text-gray-800 placeholder:text-gray-500 shadow-sm transition-all
                               focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50"
                      {...field} 
                      value={field.value ?? ""}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-rose-200 drop-shadow-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-indigo-100 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
                  Email
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <AtSign className="absolute left-2.5 top-2 h-4 w-4 text-gray-600 transition-colors group-hover:text-indigo-600" />
                    <Input 
                      placeholder="john.doe@example.com" 
                      type="email"
                      className="pl-8 h-9 text-sm bg-white/80 hover:bg-white/90 focus:bg-white border-indigo-100/30 
                               text-gray-800 placeholder:text-gray-500 shadow-sm transition-all
                               focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50"
                      {...field} 
                      value={field.value ?? ""}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-rose-200 drop-shadow-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-indigo-100 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <KeyRound className="absolute left-2.5 top-2 h-4 w-4 text-gray-600 transition-colors group-hover:text-indigo-600" />
                    <Input 
                      placeholder="••••••••" 
                      type="password"
                      className="pl-8 h-9 text-sm bg-white/80 hover:bg-white/90 focus:bg-white border-indigo-100/30 
                               text-gray-800 placeholder:text-gray-500 shadow-sm transition-all
                               focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50"
                      {...field} 
                      value={field.value ?? ""}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-rose-200 drop-shadow-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-indigo-100 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <KeyRound className="absolute left-2.5 top-2 h-4 w-4 text-gray-600 transition-colors group-hover:text-indigo-600" />
                    <Input 
                      placeholder="••••••••" 
                      type="password"
                      className="pl-8 h-9 text-sm bg-white/80 hover:bg-white/90 focus:bg-white border-indigo-100/30 
                               text-gray-800 placeholder:text-gray-500 shadow-sm transition-all
                               focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50"
                      {...field} 
                      value={field.value ?? ""}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-rose-200 drop-shadow-sm" />
              </FormItem>
            )}
          />

          {error && (
            <Alert variant="destructive" className="bg-rose-500/10 text-rose-200 border-rose-500/20 py-2 text-sm">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full h-9 text-sm bg-indigo-500/90 hover:bg-indigo-600/90 text-white font-semibold
                     shadow-md hover:shadow-lg transition-all duration-200 border-none
                     focus:ring-2 focus:ring-indigo-400/50"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>
      </Form>

      <div className="space-y-3 pt-2">
        <div className="text-xs text-indigo-200 text-center drop-shadow-sm">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="text-indigo-100 font-medium underline underline-offset-4 
                                      hover:text-white transition-colors">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-indigo-100 font-medium underline underline-offset-4 
                                        hover:text-white transition-colors">
            Privacy Policy
          </Link>
        </div>
        <div className="text-xs text-indigo-200 text-center drop-shadow-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-100 font-medium underline underline-offset-4 
                     hover:text-white transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormRegister;

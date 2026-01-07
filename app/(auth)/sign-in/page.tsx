"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Loader2, Key } from "lucide-react";
import { signIn } from "@/lib/auth/auth-client";
import Link from "next/link";
import { SocialSignIn } from "./social-signIn";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-lg md:text-xl">Connexion</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                    Connectez-vous pour accéder à votre compte
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            value={email}
                        />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Link
                                href="/forgot-password"
                                className="ml-auto inline-block text-sm underline"
                            >
                                Mot de passe oublié?
                            </Link>
                        </div>

                        <Input
                            id="password"
                            type="password"
                            placeholder="password"
                            autoComplete="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="remember"
                            onClick={() => {
                                setRememberMe(!rememberMe);
                            }}
                        />
                        <Label htmlFor="remember">Se souvenir de moi</Label>
                    </div>



                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                        onClick={async () => {
                            await signIn.email(
                                {
                                    email,
                                    password
                                },
                                {
                                    onRequest: (ctx) => {
                                        setLoading(true);
                                    },
                                    onResponse: (ctx) => {
                                        setLoading(false);
                                    },
                                },
                            );
                        }}
                    >
                        {loading ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <p> Se connecter </p>
                        )}
                    </Button>



                    <SocialSignIn />
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex justify-center w-full border-t py-4">
                    <p className="text-center text-xs text-neutral-500">
                        Je n'ai pas de compte{" "}
                        <Link
                            href="/sign-up"
                            className="underline"
                            target="_blank"
                        >
                            <span className="dark:text-white/70 cursor-pointer">
                                S'inscrire
                            </span>
                        </Link>
                    </p>
                </div>
            </CardFooter>
        </Card>
    );
}
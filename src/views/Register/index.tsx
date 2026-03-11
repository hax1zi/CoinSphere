import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export function Register() {
    return (
        <main className="flex w-full items-center justify-center overflow-hidden">
            <section className="relative w-full h-[calc(100vh-130px)] flex items-center overflow-hidden rounded-2xl bg-background/40 p-4 backdrop-blur-sm sm:p-8 max-sm:h-screen">
                <div className="pointer-events-none absolute -left-24 -top-24 h-52 w-52 rounded-full bg-primary/15 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-28 -right-20 h-52 w-52 rounded-full bg-secondary/15 blur-3xl" />

                <div className="relative grid gap-20 md:grid-cols-[1.05fr_0.95fr] md:items-center">
                    <article className="space-y-4 text-center md:text-left">
                        <p className="text-sm uppercase tracking-[0.2em] text-primary">CoinSphere Access</p>
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl ">
                            Crie sua conta e comece sua jornada.
                        </h2>
                        <p className="max-w-xl text-sm opacity-85 sm:text-base">
                            Monte sua base de acompanhamento, salve preferências e deixe seu painel preparado para seguir
                            as oportunidades em tempo real.
                        </p>
                        <div className="flex items-center justify-center gap-2 md:justify-start">
                            <img src="/logo.svg" alt="Logo CoinSphere" className="h-8 w-8" />
                            <span className="font-semibold">Painel CoinSphere</span>
                        </div>
                    </article>

                    <Card className="border-[#383838] bg-[#090e11]/90 py-0 shadow-lg">
                        <CardHeader className="pb-0 pt-6">
                            <CardTitle className="text-2xl">Registro</CardTitle>
                            <CardDescription>Crie sua conta para personalizar sua experiência.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pb-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">
                                    Nome
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Seu nome"
                                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">
                                    E-mail
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="voce@exemplo.com"
                                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium">
                                    Senha
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Crie uma senha"
                                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
                                />
                            </div>

                            <Button className="mt-1 w-full font-semibold">Criar conta</Button>

                            <p className="text-center text-xs text-muted-foreground">
                                Tela visual sem cadastro implementado.
                            </p>

                            <p className="text-center text-sm">
                                Já tem conta?{" "}
                                <Link
                                    to="/entrar"
                                    className="font-semibold text-primary transition-colors hover:text-secondary"
                                >
                                    Fazer login
                                </Link>
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </main>
    );
}

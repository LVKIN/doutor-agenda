"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerFormSchema = z.object({
    name: z.string().trim().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }).max(50, { message: "Nome deve ter no máximo 50 caracteres" }),
    email: z.string().email({ message: "E-mail inválido" }),
    password: z.string().trim().min(8, { message: "Senha deve ter pelo menos 8 caracteres" })
});

const SignUpForm = () => {
    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const onSubmit = (data: z.infer<typeof registerFormSchema>) => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="space-y-4">
                    <CardHeader>
                        <CardTitle>Crie sua conta</CardTitle>
                        <CardDescription>
                            Crie sua conta para acessar o sistema.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome Completo</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Nome e sobrenome" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="test@example.us" />
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
                                        <Input type="password" {...field} placeholder="Crie uma senha segura" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button>Criar conta</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}

export default SignUpForm;
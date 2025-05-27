"use client"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";

export default function Authentication() {

    return (
        <div className="w-screen h-screen flex items-center justify-center">    
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Criar conta</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <SignInForm />
                </TabsContent>
                <TabsContent value="register">
                    <SignUpForm />
                </TabsContent>
            </Tabs>
        </div>
    );
}
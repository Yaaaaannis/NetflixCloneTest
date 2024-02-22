"use client"
import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { useAuth } from '@/hooks/useauth';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const LogIn = () => {
    const { signInWithGoogle, user, signOutUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/'); // Spécifiez le chemin vers votre page d'accueil
        }
    }, [user, router]);


    return (
        <div className="bg-black min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('../img/netflix-collection.jpg')" }}>
            {!user ? (

                <Card className='fixed flex flex-col transform- transform: -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 items-center bg-black border-solid border-4 border-black h-80 w-80'>
                    <CardContent>
                        <Image className="flex justify-center items-center mt-[10%] w-40 h-40" src='/img/netflix-avatar.png' width={40} height={40} alt="logo" />
                    </CardContent>
                    <CardFooter>
                        <Button
                            className='h-[40px] leading-[40px] mt-[50px] py-0 px-[30px] border-none rounded bg-red-600 text-white font-bold cursor-pointer hover:bg-red-700 transition duration-200 ease-in-out'
                            onClick={signInWithGoogle}>Se connecter avec Google</Button>
                    </CardFooter>
                </Card>

            ) : (
                <Card className='fixed flex flex-col transform- transform: -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 items-center bg-black border-solid border-4 border-black h-80 w-80'>
                    <CardHeader>
                        <CardTitle className='text-white'>Bonjour, {user.displayName} vous êtes connecté</CardTitle>
                    </CardHeader>
                </Card>
            )}
        </div>
    );


}

export default LogIn;

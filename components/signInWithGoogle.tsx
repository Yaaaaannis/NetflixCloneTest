
"use client"

import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/hooks/useauth'; // Ajustez le chemin selon votre structure de fichiers

const SignInWithGoogle = () => {
    const { signInWithGoogle, user, signOutUser } = useAuth();


    return (
        <div>
            {!user ? (
                // Si l'utilisateur n'est pas connecté, afficher le bouton de connexion
                <button onClick={signInWithGoogle}>Se connecter avec Google</button>
            ) : (
                // Si l'utilisateur est connecté, afficher son nom et sa photo de profil
                <div>
                    <p>Bonjour, {user.displayName}!</p>
                    <p>{user.email}</p>
                    {user.photoURL && (
                        <div className="w-10 h-10 relative">
                            <Image
                                src={user.photoURL}
                                alt="Photo de profil"
                                layout="fill" // Utilisez fill pour couvrir le div, ajustez selon besoin
                                className="rounded-full object-cover" // Arrondit les coins et couvre la zone du div
                            />
                            <button onClick={signOutUser}>Se deconnecter</button>
                        </div>

                    )}
                </div>
            )}
        </div>
    );
};


export default SignInWithGoogle;

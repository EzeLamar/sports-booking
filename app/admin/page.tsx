'use client'
import { useEffect } from "react";
import { AuthContent, useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const { user }: AuthContent = useAuthContext();
    const router = useRouter();

    useEffect((): void => {
        if (user === null) router.push("/");
    }, [user, router]);

    return (
        <div>
            <h1>Hi {user?.email}</h1>
            <p>Only logged in users can view this page</p>
        </div>
    );
}


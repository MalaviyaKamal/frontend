'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { Spinner } from '@/components/common';

interface Props {
    children: React.ReactNode;
}

export default function LoginLayout({ children }: Props) {
    const router = useRouter();
    const { isLoading, isAuthenticated } = useAppSelector(state => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, router]);

    return (
         (
            <>{children}</>
        )
    );
}

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Admin() {
    const user = await currentUser();
    // confere de novo aqui: o README do front-login lembra que o proxy sozinho não basta
    if (user?.publicMetadata?.role !== 'admin') redirect('/');

    return (
        <main style={{ padding: 32 }}>
            <h1>Painel admin</h1>
            <p>Olá, {user.firstName}</p>
        </main>
    );
}
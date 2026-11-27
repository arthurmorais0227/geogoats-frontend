import { sair } from '@/actions/login';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export default async function Admin() {
    const usuario = jwt.decode((await cookies()).get('token')?.value);

    return (
        <main style={{ padding: 32 }}>
            <h1>Olá, {usuario?.nome}</h1>
            <form action={sair}><button type="submit">Sair</button></form>
        </main>
    );
}
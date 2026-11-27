'use server';

import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const TEMPO_VIDA = 60 * 60; 

export async function entrar({ email, senha }) {
    let token;
    try {
        const resp = await axios.post(
            `${process.env.API_URL}/usuarios/login`,
            { email, senha },
            { headers: { 'x-api-key': process.env.API_KEY }, timeout: 30000 },
        );
        token = resp.data.token;
    } catch (error) {
        if (error.response?.status === 401) return { erro: 'Email ou senha incorretos' };
        return { erro: 'Erro ao conectar com o servidor' };
    }

    (await cookies()).set('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: TEMPO_VIDA,
    });

    redirect('/admin'); 
}

export async function sair() {
    (await cookies()).delete('token');
    redirect('/login');
}
import axios from 'axios';
import { NextResponse } from 'next/server';

export const revalidate = 60;

export async function GET() {
    try {
        const resp = await axios.get(`${process.env.API_URL}/noticias`, {
            headers: { 'x-api-key': process.env.API_KEY },
            timeout: 30000,
        });

        if (!Array.isArray(resp.data)) {
            throw new Error('A API de notícias retornou um formato inesperado.');
        }

        const noticias = resp.data.sort(
            (a, b) =>
                new Date(b.dataPublicacao).getTime() -
                new Date(a.dataPublicacao).getTime(),
        );

        return NextResponse.json(noticias);
    } catch (error) {
        console.error('Erro ao buscar notícias:', error.message);
        return NextResponse.json(
            { error: 'Não foi possível carregar as notícias.' },
            { status: 502 },
        );
    }
}

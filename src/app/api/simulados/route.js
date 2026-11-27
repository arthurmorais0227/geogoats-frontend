import axios from 'axios';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    const slug = new URL(request.url).searchParams.get('slug')?.trim();
    if (!slug) {
        return NextResponse.json(
            { error: 'Informe o slug do tema para buscar as questões.' },
            { status: 400 },
        );
    }

    try {
        const headers = { 'x-api-key': process.env.API_KEY };
        const [simuladosResp, temasResp] = await Promise.all([
            axios.get(`${process.env.API_URL}/simulado`, {
                headers,
                timeout: 30000,
            }),
            axios.get(`${process.env.API_URL}/temas`, {
                headers,
                timeout: 30000,
            }),
        ]);

        if (!Array.isArray(simuladosResp.data) || !Array.isArray(temasResp.data)) {
            throw new Error('A API retornou um formato inesperado para temas ou simulados.');
        }

        const tema = temasResp.data.find((item) => item.slug === slug);
        if (!tema) {
            return NextResponse.json(
                { error: 'O tema solicitado não foi encontrado.' },
                { status: 404 },
            );
        }

        const nomeTema = tema.nome.trim().toLocaleLowerCase('pt-BR');
        const questoes = simuladosResp.data.filter(
            (item) => {
                const mesmoTemaPorId =
                    item.temaId != null && String(item.temaId) === String(tema.id);
                const mesmoTemaPorSlug = item.tema?.slug === slug;
                const mesmoTemaPorNome = [item.materia, item.conteudo].some(
                    (valor) =>
                        typeof valor === 'string' &&
                        valor.trim().toLocaleLowerCase('pt-BR') === nomeTema,
                );

                return mesmoTemaPorId || mesmoTemaPorSlug || mesmoTemaPorNome;
            },
        );

        return NextResponse.json(questoes);
    } catch (error) {
        console.error(
            `Erro ao buscar simulados para ${slug}:`,
            error.response?.status,
            error.message,
        );
        return NextResponse.json(
            { error: 'Não foi possível carregar as questões deste tema.' },
            { status: 502 },
        );
    }
}

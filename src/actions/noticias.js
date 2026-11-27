'use server';

import { auth } from '@clerk/nextjs/server';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

// Cliente da API com o token do Clerk de quem está logado.
// Quem decide se pode ou não é o BACKEND (ele confere se o usuário é admin).
async function api() {
    const { getToken } = await auth();
    const token = await getToken();

    return axios.create({
        baseURL: process.env.API_URL,
        timeout: 30000,
        headers: {
            'x-api-key': process.env.API_KEY,
            Authorization: `Bearer ${token}`,
        },
    });
}

function falha(error) {
    const resposta = error.response?.data;
    const erroApi =
        typeof resposta === 'string'
            ? /<(!doctype|html|body|pre)\b/i.test(resposta)
                ? undefined
                : resposta
            : (resposta?.error ?? resposta?.message ?? resposta?.erro);
    const status = error.response?.status;

    console.error(
        `Erro na API de notícias (${status ?? error.code ?? 'sem resposta'}):`,
        error.message,
    );

    return {
        ok: false,
        erro:
            erroApi ??
            (status === 500
                ? 'A API retornou erro interno (HTTP 500). Verifique os logs do backend.'
                : status
                  ? `A API respondeu com erro HTTP ${status}.`
                : error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT'
                  ? 'A API demorou demais para responder. Tente de novo.'
                  : `Falha de conexão com a API: ${error.message}`),
    };
}

// a página pública de notícias e o painel mostram os dados novos na hora
function atualizarPaginas() {
    revalidatePath('/admin');
    revalidatePath('/noticias');
    revalidatePath('/api/noticias');
}

export async function criarNoticia(dados) {
    try {
        const resp = await (await api()).post('/noticias', dados);
        atualizarPaginas();
        return { ok: true, mensagem: resp.data.message };
    } catch (error) {
        return falha(error);
    }
}

export async function editarNoticia(id, dados) {
    try {
        const resp = await (await api()).put(`/noticias/${id}`, dados);
        atualizarPaginas();
        return { ok: true, mensagem: resp.data.message };
    } catch (error) {
        return falha(error);
    }
}

export async function excluirNoticia(id) {
    try {
        const resp = await (await api()).delete(`/noticias/${id}`);
        atualizarPaginas();
        return { ok: true, mensagem: resp.data.message };
    } catch (error) {
        return falha(error);
    }
}
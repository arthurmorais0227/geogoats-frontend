'use client';

import { useState } from 'react';
import {
    Building2,
    Compass,
    Earth,
    Globe,
    Leaf,
    Map,
    Mountain,
    Users,
} from 'lucide-react';
import styles from './CardSimulado.module.css';

const ICONES_TEMA = {
    'geografia-agraria': Mountain,
    'questoes-ambientais-biomas': Leaf,
    urbanizacao: Building2,
    globalizacao: Globe,
    'demografia-migracoes': Users,
    cartografia: Map,
    clima: Earth,
    relevo: Mountain,
    geopolitica: Compass,
};

export default function CardSimulado({ tema, selecionado, onSelect }) {
    const [questoes, setQuestoes] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');
    const Icone = ICONES_TEMA[tema.slug] ?? Map;

    const carregarQuestoes = async () => {
        setErro('');

        try {
            let dados = questoes;
            if (dados === null) {
                setCarregando(true);
                const resposta = await fetch(
                    `/api/simulados?slug=${encodeURIComponent(tema.slug)}`,
                );
                const corpo = await resposta.json();
                if (!resposta.ok) {
                    throw new Error(
                        corpo.error || `Falha ao carregar questões (${resposta.status}).`,
                    );
                }

                dados = corpo;
                if (!Array.isArray(dados)) {
                    throw new Error('A API retornou um formato inesperado para as questões.');
                }
                setQuestoes(dados);
            }

            onSelect({
                titulo: tema.nome,
                slug: tema.slug,
                quantidade: dados.length,
                questoesRaw: dados,
            });
        } catch (erroCarregamento) {
            console.error(`Erro ao carregar questões de ${tema.slug}:`, erroCarregamento);
            setErro(erroCarregamento.message || 'Falha ao carregar questões.');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <button
            type="button"
            className={`${styles.card} ${selecionado ? styles.selecionado : ''}`}
            onClick={carregarQuestoes}
            disabled={carregando}
            aria-pressed={selecionado}
            aria-label={`${tema.nome}: ${carregando ? 'carregando questões' : 'carregar questões'}`}
        >
            <span className={styles.icone}>
                <Icone size={25} aria-hidden="true" />
            </span>
            <span className={styles.nome}>{tema.nome}</span>
            <span className={styles.descricao}>{tema.descricao}</span>
            <span className={styles.rodape} aria-live="polite">
                {carregando
                    ? 'Carregando questões...'
                    : erro
                      ? `${erro} Tente novamente.`
                      : questoes === null
                        ? 'Carregar questões'
                        : questoes.length === 0
                          ? 'Nenhuma questão disponível'
                          : `${questoes.length} ${questoes.length === 1 ? 'questão' : 'questões'}`}
                {!carregando && !erro && (
                    <span className={styles.seta} aria-hidden="true">
                        →
                    </span>
                )}
            </span>
        </button>
    );
}

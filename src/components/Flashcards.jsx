'use client';

import { ChevronLeft, ChevronRight, Lightbulb, RotateCcw, Shuffle } from 'lucide-react';
import { useEffect, useState } from 'react';
import styles from '@/app/dicas/dicas.module.css';

export default function Flashcards({ dicas, temas }) {
    const [ordem, setOrdem] = useState(dicas);
    const [temaAtivo, setTemaAtivo] = useState(null);
    const [atual, setAtual] = useState(0);
    const [virado, setVirado] = useState(false);

    const nomeDoTema = Object.fromEntries(temas.map((tema) => [tema.id, tema.nome]));
    const temasComDicas = temas.filter((tema) => dicas.some((dica) => dica.temaId === tema.id));
    const visiveis = temaAtivo ? ordem.filter((dica) => dica.temaId === temaAtivo) : ordem;
    const total = visiveis.length;
    const dica = visiveis[atual];

    function irPara(indice) {
        if (indice < 0 || indice >= total) return;
        setAtual(indice);
        setVirado(false);
    }

    function filtrar(temaId) {
        setTemaAtivo(temaId);
        setAtual(0);
        setVirado(false);
    }

    function embaralhar() {
        const copia = [...ordem];
        for (let i = copia.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copia[i], copia[j]] = [copia[j], copia[i]];
        }
        setOrdem(copia);
        setAtual(0);
        setVirado(false);
    }

    // teclado: ← e → trocam de cartão
    useEffect(() => {
        function aoTeclar(evento) {
            if (evento.target.closest('input, textarea')) return;
            if (evento.key === 'ArrowRight') irPara(atual + 1);
            if (evento.key === 'ArrowLeft') irPara(atual - 1);
        }
        window.addEventListener('keydown', aoTeclar);
        return () => window.removeEventListener('keydown', aoTeclar);
    });

    return (
        <div className={styles.estudo}>
            <div className={styles.filtros} role="group" aria-label="Filtrar dicas por tema">
                <button
                    type="button"
                    className={styles.filtro}
                    aria-pressed={temaAtivo === null}
                    onClick={() => filtrar(null)}
                >
                    Todos
                </button>
                {temasComDicas.map((tema) => (
                    <button
                        key={tema.id}
                        type="button"
                        className={styles.filtro}
                        aria-pressed={temaAtivo === tema.id}
                        onClick={() => filtrar(tema.id)}
                    >
                        {tema.nome}
                    </button>
                ))}
            </div>

            <div className={styles.estudoConteudo}>
                {/* progresso */}
                <div className={styles.progresso}>
                    <span>
                        Cartão <strong>{atual + 1}</strong> de {total}
                    </span>
                    <div
                        className={styles.barraProgresso}
                        role="progressbar"
                        aria-valuemin={1}
                        aria-valuemax={total}
                        aria-valuenow={atual + 1}
                    >
                        <div style={{ width: `${((atual + 1) / total) * 100}%` }} />
                    </div>
                </div>

                {/* o cartão (a key faz ele "entrar" de novo a cada troca) */}
                <button
                    key={dica.id}
                    type="button"
                    className={`${styles.flashcard} ${virado ? styles.virado : ''}`}
                    aria-pressed={virado}
                    aria-label={virado ? 'Mostrar a dica' : 'Mostrar a explicação'}
                    onClick={() => setVirado((v) => !v)}
                >
                    <span className={styles.interno}>
                        <span className={`${styles.face} ${styles.frente}`} aria-hidden={virado}>
                            <span className={styles.topo}>
                                {nomeDoTema[dica.temaId] && (
                                    <span className={styles.tag}>{nomeDoTema[dica.temaId]}</span>
                                )}
                                <span className={styles.numero}>
                                    #{String(atual + 1).padStart(2, '0')}
                                </span>
                            </span>

                            <span className={styles.centro}>
                                <span className={styles.icone}>
                                    <Lightbulb size={30} aria-hidden="true" />
                                </span>
                                <span className={styles.pergunta}>{dica.titulo}</span>
                            </span>

                            <span className={styles.dica}>
                                <RotateCcw size={16} aria-hidden="true" />
                                Clique para ver a explicação
                            </span>
                        </span>

                        <span className={`${styles.face} ${styles.verso}`} aria-hidden={!virado}>
                            <span className={styles.rotuloVerso}>Explicação</span>
                            <span className={styles.centro}>
                                <span className={styles.resposta}>{dica.conteudo}</span>
                            </span>
                            <span className={styles.dica}>
                                <RotateCcw size={16} aria-hidden="true" />
                                Clique para voltar
                            </span>
                        </span>
                    </span>
                </button>

                {/* navegação */}
                <div className={styles.navegacao}>
                    <button
                        type="button"
                        className={styles.seta}
                        onClick={() => irPara(atual - 1)}
                        disabled={atual === 0}
                        aria-label="Cartão anterior"
                    >
                        <ChevronLeft size={22} aria-hidden="true" />
                    </button>

                    <button type="button" className={styles.acao} onClick={embaralhar}>
                        <Shuffle size={16} aria-hidden="true" />
                        Embaralhar
                    </button>

                    <button
                        type="button"
                        className={styles.seta}
                        onClick={() => irPara(atual + 1)}
                        disabled={atual === total - 1}
                        aria-label="Próximo cartão"
                    >
                        <ChevronRight size={22} aria-hidden="true" />
                    </button>
                </div>

                <p className={styles.atalho}>Use as setas ← → do teclado para trocar de cartão</p>
            </div>
        </div>
    );
}
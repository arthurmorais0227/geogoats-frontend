'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, Earth, RotateCcw, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import styles from './exame.module.css';

const ALTERNATIVAS = ['A', 'B', 'C', 'D', 'E'];

export default function ExamePage() {
    const router = useRouter();
    const [simulado, setSimulado] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [indiceQuestao, setIndiceQuestao] = useState(0);
    const [alternativaSelecionada, setAlternativaSelecionada] = useState('');
    const [respostaConfirmada, setRespostaConfirmada] = useState(false);
    const [respostas, setRespostas] = useState([]);
    const [concluido, setConcluido] = useState(false);

    useEffect(() => {
        try {
            const salvo = sessionStorage.getItem('simuladoSelecionado');
            if (!salvo) {
                setErro('Não há um simulado selecionado. Escolha um tema para começar.');
                return;
            }

            const dados = JSON.parse(salvo);
            if (
                typeof dados.titulo !== 'string' ||
                !Array.isArray(dados.questoesRaw) ||
                dados.questoesRaw.length === 0
            ) {
                setErro('Os dados do simulado estão incompletos. Selecione outro tema.');
                return;
            }

            setSimulado(dados);
        } catch (erroLeitura) {
            console.error('Erro ao abrir o simulado salvo:', erroLeitura);
            setErro('Não foi possível abrir o simulado. Volte e selecione o tema novamente.');
        } finally {
            setCarregando(false);
        }
    }, []);

    const questoes = simulado?.questoesRaw ?? [];
    const questaoAtual = questoes[indiceQuestao];
    const progresso = questoes.length
        ? ((indiceQuestao + 1) / questoes.length) * 100
        : 0;

    const confirmarResposta = () => {
        if (!questaoAtual || !alternativaSelecionada || respostaConfirmada) return;

        setRespostas((atuais) => {
            const atualizadas = [...atuais];
            atualizadas[indiceQuestao] = {
                alternativa: alternativaSelecionada,
                correta: alternativaSelecionada === questaoAtual.respostaCorreta,
            };
            return atualizadas;
        });
        setRespostaConfirmada(true);
    };

    const avancarQuestao = () => {
        if (indiceQuestao === questoes.length - 1) {
            setConcluido(true);
            return;
        }

        setIndiceQuestao((atual) => atual + 1);
        setAlternativaSelecionada('');
        setRespostaConfirmada(false);
    };

    const reiniciarSimulado = () => {
        setIndiceQuestao(0);
        setAlternativaSelecionada('');
        setRespostaConfirmada(false);
        setRespostas([]);
        setConcluido(false);
    };

    const voltarAosTemas = () => {
        sessionStorage.removeItem('simuladoSelecionado');
        router.push('/simulado');
    };

    const acertos = respostas.filter((resposta) => resposta?.correta).length;

    return (
        <main className={styles.pagina}>
            <header className={styles.hero}>
                <Navbar />
                <div className={styles.heroConteudo}>
                    <span className={styles.pilula}>
                        <Earth size={16} aria-hidden="true" />
                        Simulado de Geografia
                    </span>
                    <h1>{simulado?.titulo ?? 'Vamos praticar?'}</h1>
                    {!carregando && !erro && !concluido && (
                        <p>
                            Questão {indiceQuestao + 1} de {questoes.length}
                        </p>
                    )}
                </div>
            </header>

            <section className={styles.conteudo} aria-live="polite">
                {carregando ? (
                    <p className={styles.aviso} role="status">
                        Abrindo suas questões...
                    </p>
                ) : erro ? (
                    <div className={styles.estadoVazio}>
                        <p className={styles.aviso} role="alert">
                            {erro}
                        </p>
                        <button
                            type="button"
                            className={styles.botaoSecundario}
                            onClick={voltarAosTemas}
                        >
                            <ArrowLeft size={18} aria-hidden="true" />
                            Voltar aos temas
                        </button>
                    </div>
                ) : concluido ? (
                    <div className={styles.resultado}>
                        <span className={styles.resultadoIcone}>
                            <Check size={30} aria-hidden="true" />
                        </span>
                        <p className={styles.etiqueta}>Simulado concluído</p>
                        <h2>
                            Você acertou {acertos} de {questoes.length} questões
                        </h2>
                        <p className={styles.resultadoTexto}>
                            Continue praticando para aprofundar seus conhecimentos em{' '}
                            {simulado.titulo}.
                        </p>
                        <div className={styles.acoesResultado}>
                            <button
                                type="button"
                                className={styles.botaoPrimario}
                                onClick={reiniciarSimulado}
                            >
                                <RotateCcw size={17} aria-hidden="true" />
                                Refazer simulado
                            </button>
                            <button
                                type="button"
                                className={styles.botaoSecundario}
                                onClick={voltarAosTemas}
                            >
                                <ArrowLeft size={17} aria-hidden="true" />
                                Escolher outro tema
                            </button>
                        </div>
                    </div>
                ) : (
                    <article className={styles.questaoCard}>
                        <div className={styles.progressoCabecalho}>
                            <span>Seu progresso</span>
                            <span>
                                {indiceQuestao + 1}/{questoes.length}
                            </span>
                        </div>
                        <div
                            className={styles.progressoTrilho}
                            role="progressbar"
                            aria-label="Progresso do simulado"
                            aria-valuemin={0}
                            aria-valuemax={questoes.length}
                            aria-valuenow={indiceQuestao + 1}
                        >
                            <span
                                className={styles.progressoValor}
                                style={{ width: `${progresso}%` }}
                            />
                        </div>

                        <p className={styles.numeroQuestao}>
                            Questão {indiceQuestao + 1}
                        </p>
                        <h2 className={styles.pergunta}>{questaoAtual.pergunta}</h2>

                        <div className={styles.alternativas} role="group" aria-label="Alternativas">
                            {ALTERNATIVAS.map((letra) => {
                                const correta =
                                    respostaConfirmada &&
                                    letra === questaoAtual.respostaCorreta;
                                const incorreta =
                                    respostaConfirmada &&
                                    letra === alternativaSelecionada &&
                                    !correta;

                                return (
                                    <button
                                        key={letra}
                                        type="button"
                                        className={[
                                            styles.alternativa,
                                            alternativaSelecionada === letra
                                                ? styles.alternativaSelecionada
                                                : '',
                                            correta ? styles.alternativaCorreta : '',
                                            incorreta ? styles.alternativaIncorreta : '',
                                        ]
                                            .filter(Boolean)
                                            .join(' ')}
                                        onClick={() => setAlternativaSelecionada(letra)}
                                        disabled={respostaConfirmada}
                                        aria-pressed={alternativaSelecionada === letra}
                                    >
                                        <span className={styles.letra}>{letra}</span>
                                        <span className={styles.textoAlternativa}>
                                            {questaoAtual[`opcao${letra}`]}
                                        </span>
                                        {correta && <Check size={19} aria-label="Resposta correta" />}
                                        {incorreta && <X size={19} aria-label="Resposta incorreta" />}
                                    </button>
                                );
                            })}
                        </div>

                        {respostaConfirmada && (
                            <div
                                className={`${styles.feedback} ${
                                    respostas[indiceQuestao]?.correta
                                        ? styles.feedbackCorreto
                                        : styles.feedbackIncorreto
                                }`}
                                role="status"
                            >
                                <strong>
                                    {respostas[indiceQuestao]?.correta
                                        ? 'Resposta correta!'
                                        : `Resposta incorreta. A alternativa correta é ${questaoAtual.respostaCorreta}.`}
                                </strong>
                                {questaoAtual.explicacao && <p>{questaoAtual.explicacao}</p>}
                            </div>
                        )}

                        <div className={styles.acoes}>
                            {!respostaConfirmada ? (
                                <button
                                    type="button"
                                    className={styles.botaoPrimario}
                                    onClick={confirmarResposta}
                                    disabled={!alternativaSelecionada}
                                >
                                    Confirmar resposta
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className={styles.botaoPrimario}
                                    onClick={avancarQuestao}
                                >
                                    {indiceQuestao === questoes.length - 1
                                        ? 'Ver resultado'
                                        : 'Próxima questão'}
                                    <span aria-hidden="true">→</span>
                                </button>
                            )}
                        </div>
                    </article>
                )}
            </section>
        </main>
    );
}

'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import {
    Compass,
    Earth,
    Flame,
    Leaf,
    Map as MapIcon,
    Mountain,
    Search,
    SearchX,
    Waves,
} from 'lucide-react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import CardNoticia from '@/components/CardNoticia';
import Navbar from '@/components/Navbar';
import ScrollEffects from '@/components/ScrollEffects';
import { climateCrisis } from '../fonts';
import styles from './noticias.module.css';

gsap.registerPlugin(useGSAP, SplitText);

const iconesNoticia = [Leaf, Earth, MapIcon, Mountain, Waves, Compass];

// "Água" e "agua" batem igual: ignora acentos e maiúsculas
const normalizar = (texto) =>
    texto
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase();

function buscarNoticias(noticias, termo) {
    const busca = normalizar(termo.trim());
    if (!busca) return [];
    return noticias.filter(({ titulo, resumo, conteudo }) =>
        normalizar(`${titulo} ${resumo} ${conteudo}`).includes(busca),
    );
}

// Troca suave do rótulo e do aviso de "sem resultados" (Motion)
const troca = {
    initial: { opacity: 0, y: 10, filter: 'blur(4px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -10, filter: 'blur(4px)' },
    transition: { duration: 0.25 },
};

export default function NoticiasPage() {
    const raizRef = useRef(null);
    const [termo, setTermo] = useState('');
    const [noticias, setNoticias] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [carregamentoFalhou, setCarregamentoFalhou] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function carregarNoticias() {
            try {
                const resp = await fetch('/api/noticias', {
                    cache: 'no-store',
                    signal: controller.signal,
                });

                if (!resp.ok) {
                    throw new Error(
                        `Falha ao carregar notícias (HTTP ${resp.status}).`,
                    );
                }

                const dados = await resp.json();
                if (!Array.isArray(dados)) {
                    throw new Error(
                        'A API de notícias retornou um formato inesperado.',
                    );
                }

                dados.sort(
                    (a, b) =>
                        new Date(b.dataPublicacao).getTime() -
                        new Date(a.dataPublicacao).getTime(),
                );
                setNoticias(dados);
            } catch (error) {
                if (error.name === 'AbortError') return;

                console.error('Erro ao buscar notícias:', error.message);
                setCarregamentoFalhou(true);
            } finally {
                if (!controller.signal.aborted) {
                    setCarregando(false);
                }
            }
        }

        carregarNoticias();
        return () => controller.abort();
    }, []);

    const buscando = termo.trim() !== '';
    const resultados = buscando ? buscarNoticias(noticias, termo) : noticias;
    let mensagemSemResultados =
        'Nenhuma notícia corresponde à busca. Tente outro termo.';

    if (carregando) {
        mensagemSemResultados = 'Carregando notícias...';
    } else if (noticias.length === 0) {
        mensagemSemResultados = carregamentoFalhou
            ? 'Não foi possível carregar as notícias. Atualize a página para tentar novamente.'
            : 'Nenhuma notícia disponível.';
    }

    // ===== GSAP: entrada da hero =====
    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                const titulo = SplitText.create('[data-hero="titulo"]', {
                    type: 'words,chars',
                    mask: 'chars',
                });

                gsap.set('[data-hero="titulo"]', { autoAlpha: 1 });

                gsap.timeline({ defaults: { ease: 'power3.out' } })
                    .fromTo(
                        '[data-hero="eyebrow"]',
                        { autoAlpha: 0, y: 14, letterSpacing: '0.4em' },
                        {
                            autoAlpha: 1,
                            y: 0,
                            letterSpacing: '0.14em',
                            duration: 0.8,
                        },
                    )
                    .from(
                        titulo.chars,
                        {
                            yPercent: 110,
                            rotate: 8,
                            duration: 0.8,
                            stagger: 0.05,
                        },
                        '-=0.5',
                    )
                    .fromTo(
                        '[data-hero="texto"]',
                        { autoAlpha: 0, y: 16 },
                        { autoAlpha: 1, y: 0, duration: 0.7 },
                        '-=0.35',
                    );
                // os textos revelados no scroll ficam no ScrollEffects
            });
        },
        { scope: raizRef },
    );

    return (
        <MotionConfig reducedMotion="user">
            <div ref={raizRef}>
                <title>Notícias | GeoGoats</title>
                <meta
                    name="description"
                    content="Notícias e atualidades relacionadas à Geografia."
                />

                <ScrollEffects />

                <header className={styles.hero}>
                    <Navbar />
                    <Image
                        src="/images/noticias-hero.png"
                        alt=""
                        fill
                        priority
                        unoptimized
                        sizes="100vw"
                        className={styles.heroImage}
                    />

                    <div className={styles.heroContent}>
                        <div className={styles.brand}>
                            <h1 data-hero="titulo" className={climateCrisis.className}>
                                NOTÍCIAS
                            </h1>
                        </div>
                    </div>

                </header>

                <main className={styles.main}>
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2 data-revelar-texto="letras">
                                Notícias de Geografia
                            </h2>
                            <p data-revelar-texto="palavras">
                                Acompanhe notícias sobre território, clima,
                                cidades e atualidades.
                            </p>
                        </div>

                        <div
                            data-revelar
                            className={`${styles.mascote} ${styles.mascoteDireita}`}
                        >
                            <Image
                                src="/images/mascote-feliz.png"
                                alt="Mascote GeoGoats comemorando"
                                width={700}
                                height={745}
                            />
                        </div>

                        <search className={styles.search}>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <Search size={18} />
                                <input
                                    type="search"
                                    placeholder="Pesquisar notícias..."
                                    aria-label="Pesquisar"
                                    value={termo}
                                    onChange={(e) => setTermo(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Escape') setTermo('');
                                    }}
                                />
                            </form>
                        </search>

                        <div className={styles.rotuloArea} aria-live="polite">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={buscando ? 'busca' : 'recentes'}
                                    className={styles.rotulo}
                                    {...troca}
                                >
                                    {buscando ? (
                                        <>
                                            <Search size={16} />
                                            Resultados para “{termo.trim()}”
                                        </>
                                    ) : (
                                        <>
                                            <Flame size={16} />
                                            Mais recentes
                                        </>
                                    )}
                                </motion.span>
                            </AnimatePresence>
                        </div>

                        <motion.div layout className={styles.cards}>
                            <AnimatePresence mode="popLayout">
                                {resultados.map((noticia, indice) => (
                                    <CardNoticia
                                        key={noticia.id}
                                        indice={indice}
                                        {...noticia}
                                        Icon={
                                            iconesNoticia[
                                                indice % iconesNoticia.length
                                            ]
                                        }
                                    />
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        <AnimatePresence>
                            {resultados.length === 0 && (
                                <motion.p
                                    className={styles.semResultados}
                                    {...troca}
                                >
                                    <SearchX size={20} />
                                    {mensagemSemResultados}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </section>
                </main>

            </div>
        </MotionConfig>
    );
}

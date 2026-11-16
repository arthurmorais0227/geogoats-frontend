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
import { useRef, useState } from 'react';
import CardNoticia from '@/components/CardNoticia';
import Navbar from '@/components/Navbar';
import ScrollEffects from '@/components/ScrollEffects';
import { climateCrisis } from '../fonts';
import styles from './noticias.module.css';

gsap.registerPlugin(useGSAP, SplitText);

const noticias = [
    {
        id: 1,
        categoria: 'Meio ambiente',
        titulo: 'A Amazônia e seu papel no equilíbrio do planeta',
        descricao:
            'Entenda como a floresta influencia o clima, a biodiversidade e a vida de milhões de pessoas.',
        href: '/noticias/amazonia',
        Icon: Leaf,
    },
    {
        id: 2,
        categoria: 'Clima',
        titulo: 'Por que as ondas de calor estão mais frequentes?',
        descricao:
            'Conheça os fatores que afetam as temperaturas e como eles se manifestam em diferentes regiões.',
        href: '/noticias/ondas-de-calor',
        Icon: Earth,
    },
    {
        id: 3,
        categoria: 'Cartografia',
        titulo: 'Mapas também contam histórias',
        descricao:
            'Veja como mapas ajudam a revelar transformações nas cidades e nas paisagens ao longo do tempo.',
        href: '/noticias/mapas-e-historias',
        Icon: MapIcon,
    },
    {
        id: 4,
        categoria: 'Relevo',
        titulo: 'Montanhas: muito além de grandes paisagens',
        descricao:
            'Descubra como o relevo influencia os rios, o clima e a ocupação humana.',
        href: '/noticias/montanhas',
        Icon: Mountain,
    },
    {
        id: 5,
        categoria: 'Água',
        titulo: 'O caminho da água da nascente até o mar',
        descricao:
            'Uma viagem pelos rios e pelas bacias hidrográficas que conectam diferentes territórios.',
        href: '/noticias/caminho-da-agua',
        Icon: Waves,
    },
    {
        id: 6,
        categoria: 'Sociedade',
        titulo: 'Como a Geografia nos ajuda a entender o mundo',
        descricao:
            'Do lugar onde vivemos às conexões globais: explore as relações entre pessoas e espaço.',
        href: '/noticias/geografia-e-mundo',
        Icon: Compass,
    },
];

// "Água" e "agua" batem igual: ignora acentos e maiúsculas
const normalizar = (texto) =>
    texto
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase();

function buscarNoticias(termo) {
    const busca = normalizar(termo.trim());
    if (!busca) return [];
    return noticias.filter(({ titulo, descricao, categoria }) =>
        normalizar(`${titulo} ${descricao} ${categoria}`).includes(busca),
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

    const buscando = termo.trim() !== '';
    const resultados = buscando ? buscarNoticias(termo) : noticias;

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
                    content="Fique por dentro das notícias e curiosidades mais recentes da Geografia."
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
                            <span
                                data-hero="eyebrow"
                                className={styles.heroEyebrow}
                            >
                                GeoGoats • Atualidades
                            </span>
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
                                Geografia em Pauta
                            </h2>
                            <p data-revelar-texto="palavras">
                                Histórias, ideias e descobertas para entender
                                melhor o planeta e as pessoas que vivem nele.
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
                                    Nada encontrado. Tente outro termo.
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </section>
                </main>

                <footer className={styles.footer}>
                    <p>GeoGoats &copy; {new Date().getFullYear()}</p>
                    <p>Aprender Geografia é descobrir o mundo.</p>
                </footer>
            </div>
        </MotionConfig>
    );
}

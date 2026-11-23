    'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import {
    Compass,
    Earth,
    Flame,
    Globe,
    Map as MapIcon,
    Mountain,
    Search,
    SearchX,
    Users,
} from 'lucide-react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import CardConteudo from '@/components/CardConteudo';
import Navbar from '@/components/Navbar';
import ScrollEffects from '@/components/ScrollEffects';
import { climateCrisis } from './fonts';
import styles from './page.module.css';

gsap.registerPlugin(useGSAP, SplitText);

const caminhos = [
    {
        titulo: 'Geografia Física',
        descricao:
            'Relevo, clima, hidrografia e vegetação: como a natureza molda o planeta.',
        href: '/fisica',
        Icon: Mountain,
    },
    {
        titulo: 'Geografia Humana',
        descricao:
            'População, cidades, economia e cultura: como a sociedade ocupa o espaço.',
        href: '/humana',
        Icon: Users,
    },
    {
        titulo: 'Cartografia',
        descricao:
            'Mapas, escalas e projeções: como representamos o espaço geográfico.',
        href: '/cartografia',
        Icon: MapIcon,
    },
];

const emAlta = [
    {
        titulo: 'O que é Geografia?',
        descricao:
            'Entenda o objeto de estudo da Geografia e seus principais conceitos.',
        href: '/conteudos/o-que-e-geografia',
        Icon: Globe,
    },
    {
        titulo: 'Orientação e Coordenadas',
        descricao:
            'Pontos cardeais, latitude e longitude para se localizar no mundo.',
        href: '/conteudos/coordenadas',
        Icon: Compass,
    },
    {
        titulo: 'A Terra no Universo',
        descricao:
            'Movimentos de rotação e translação, estações do ano e fusos horários.',
        href: '/conteudos/terra',
        Icon: Earth,
    },
];

const todos = [...caminhos, ...emAlta];

// "Cartográfia" e "cartografia" batem igual: ignora acentos e maiúsculas
const normalizar = (texto) =>
    texto
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase();

function buscarConteudos(termo) {
    const busca = normalizar(termo.trim());
    if (!busca) return [];
    return todos.filter(({ titulo, descricao }) =>
        normalizar(`${titulo} ${descricao}`).includes(busca),
    );
}

const contornoNuvem =
    'M0 760V130a63 63 0 1 1 100 52a101 101 0 0 1 170 109a56 56 0 1 1 95 30a123 123 0 0 1 220 108a66 66 0 1 1 115 24a96 96 0 0 1 180 67a59 59 0 1 1 105 7a123 123 0 0 1 240 51a67 67 0 1 1 120-8a48 48 0 0 1 95 18a57 57 0 1 1 100-18a85 85 0 0 1 170 2a56 56 0 1 1 95-29a111 111 0 0 1 220-29a70 70 0 1 1 115-48a93 93 0 0 1 180-46a67 67 0 1 1 105-59a130 130 0 0 1 240-99a82 82 0 1 1 120-83a53 53 0 0 1 95-49V760Z';

function CamadaNuvens({ className }) {
    return (
        <div
            className={`${styles.camadaNuvens} ${className}`}
            aria-hidden="true"
        >
            <svg viewBox="0 0 2880 760" aria-hidden="true">
                <path d={contornoNuvem} />
            </svg>
            <span />
        </div>
    );
}

// Troca suave do rótulo e do texto curto (Motion)
const troca = {
    initial: { opacity: 0, y: 10, filter: 'blur(4px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -10, filter: 'blur(4px)' },
    transition: { duration: 0.25 },
};

export default function Page() {
    const raizRef = useRef(null);
    const [termo, setTermo] = useState('');

    const buscando = termo.trim() !== '';
    const resultados = buscando ? buscarConteudos(termo) : emAlta;

    // ===== GSAP: entrada da hero =====
    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            // Quem prefere menos movimento não vê nada disso (o CSS já mostra tudo)
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                // --- Entrada da hero ---
                // words + chars: as letras animam, mas a palavra nunca quebra no meio
                const titulo = SplitText.create('[data-hero="titulo"]', {
                    type: 'words,chars',
                    mask: 'chars',
                });

                // os elementos começam escondidos pelo CSS (evita "piscar" antes do JS)
                gsap.set('[data-hero="titulo"]', {
                    autoAlpha: 1,
                });

                gsap.timeline({ defaults: { ease: 'power3.out' } })
                    .fromTo(
                        '[data-hero="logo"]',
                        { autoAlpha: 0, scale: 0.4, rotate: -25 },
                        {
                            autoAlpha: 1,
                            scale: 1,
                            rotate: 0,
                            duration: 0.9,
                            ease: 'back.out(1.8)',
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
                        '-=0.55',
                    );
                // os textos revelados no scroll ficam no ScrollEffects
            });
        },
        { scope: raizRef },
    );

    return (
        <MotionConfig reducedMotion="user">
            <div ref={raizRef}>
                <ScrollEffects />

                <header className={styles.hero}>
                    <Navbar />
                    <Image
                        src="/images/hero.webp"
                        alt=""
                        width={2560}
                        height={1441}
                        priority
                        unoptimized
                        className={styles.heroImage}
                    />

                    <div className={styles.heroContent}>
                        <div className={styles.brand}>
                            <div data-hero="logo" className={styles.logoWrap}>
                                <Image
                                    src="/images/logo.png"
                                    alt="Logo GeoGoats"
                                    width={572}
                                    height={572}
                                    priority
                                    className={styles.logo}
                                />
                            </div>
                            <h1
                                data-hero="titulo"
                                className={climateCrisis.className}
                            >
                                GEOGOATS
                            </h1>
                        </div>
                    </div>

                    <CamadaNuvens className={styles.nuvensFundo} />
                    <CamadaNuvens className={styles.nuvensFrente} />
                </header>

                <main className={styles.main}>
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2 data-revelar-texto="letras">
                                Por Onde Começar?
                            </h2>
                            <p data-revelar-texto="palavras">
                                Três caminhos complementares para entender a
                                Terra: a natureza, a sociedade e a forma como
                                representamos o espaço.
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

                        <div className={styles.cards}>
                            {caminhos.map((card, indice) => (
                                <CardConteudo
                                    key={card.href}
                                    indice={indice}
                                    {...card}
                                />
                            ))}
                        </div>
                    </section>

                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2 data-revelar-texto="letras">
                                Conteúdos em Destaque
                            </h2>
                            <p data-revelar-texto="palavras">
                                Temas introdutórios que servem de base para o
                                restante dos estudos.
                            </p>
                        </div>

                        <div
                            data-revelar
                            className={`${styles.mascote} ${styles.mascoteEsquerda}`}
                        >
                            <Image
                                src="/images/mascote-coracao.png"
                                alt="Mascote GeoGoats apaixonado"
                                width={766}
                                height={766}
                            />
                        </div>

                        <form
                            className={styles.search}
                            role="search"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <Search size={18} />
                            <input
                                type="search"
                                placeholder="Pesquisar conteúdos..."
                                aria-label="Pesquisar"
                                value={termo}
                                onChange={(e) => setTermo(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Escape') setTermo('');
                                }}
                            />
                        </form>

                        {/* rótulo "Em alta" ⇄ "Resultados para ..." */}
                        <div className={styles.rotuloArea} aria-live="polite">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={buscando ? 'busca' : 'alta'}
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
                                            Em alta
                                        </>
                                    )}
                                </motion.span>
                            </AnimatePresence>
                        </div>

                        {/* layout: os cards que ficam deslizam para o novo lugar;
                            popLayout: os que saem não empurram o resto enquanto somem */}
                        <motion.div layout className={styles.cards}>
                            <AnimatePresence mode="popLayout">
                                {resultados.map((card, indice) => (
                                    <CardConteudo
                                        key={card.href}
                                        indice={indice}
                                        {...card}
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
                    <p>Next.js - React - Lucide - GSAP - Motion</p>
                </footer>
            </div>
        </MotionConfig>
    );
}

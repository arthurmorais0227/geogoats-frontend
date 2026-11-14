import {
    Compass,
    Earth,
    Globe,
    Map,
    Mountain,
    Search,
    Users,
} from 'lucide-react';
import { Dosis } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import ScrollEffects from '@/components/ScrollEffects';
import styles from './page.module.css';

const dosis = Dosis({ subsets: ['latin'], weight: ['700', '800'] });

const caminhos = [
    {
        id: 1,
        titulo: 'Geografia Física',
        descricao:
            'Relevo, clima, hidrografia e vegetação: como a natureza molda o planeta.',
        href: '/fisica',
        Icon: Mountain,
    },
    {
        id: 2,
        titulo: 'Geografia Humana',
        descricao:
            'População, cidades, economia e cultura: como a sociedade ocupa o espaço.',
        href: '/humana',
        Icon: Users,
    },
    {
        id: 3,
        titulo: 'Cartografia',
        descricao:
            'Mapas, escalas e projeções: como representamos o espaço geográfico.',
        href: '/cartografia',
        Icon: Map,
    },
];

const destaques = [
    {
        id: 1,
        titulo: 'O que é Geografia?',
        descricao:
            'Entenda o objeto de estudo da Geografia e seus principais conceitos.',
        href: '/conteudos/o-que-e-geografia',
        Icon: Globe,
    },
    {
        id: 2,
        titulo: 'Orientação e Coordenadas',
        descricao:
            'Pontos cardeais, latitude e longitude para se localizar no mundo.',
        href: '/conteudos/coordenadas',
        Icon: Compass,
    },
    {
        id: 3,
        titulo: 'A Terra no Universo',
        descricao:
            'Movimentos de rotação e translação, estações do ano e fusos horários.',
        href: '/conteudos/terra',
        Icon: Earth,
    },
];

// Contorno de um trecho de nuvens (1440 de largura); é repetido 2x lado a lado
const contornoNuvem =
    'M0 220V160a60 60 0 0 1 110-20a80 80 0 0 1 150 0a55 55 0 0 1 100 15a90 90 0 0 1 170-25a70 70 0 0 1 130 20a100 100 0 0 1 190-10a65 65 0 0 1 120 15a85 85 0 0 1 160-20a60 60 0 0 1 110 25a100 100 0 0 1 200 5V220Z';

// Faixa de nuvens em SVG (vetor = sempre nítida) na base da hero, que sobe ao rolar
function CamadaNuvens({ className }) {
    return (
        <div
            className={`${styles.camadaNuvens} ${className}`}
            aria-hidden="true"
        >
            <svg viewBox="0 0 2880 220" aria-hidden="true">
                <path d={contornoNuvem} />
                <path d={contornoNuvem} transform="translate(1440 0)" />
            </svg>
            <span />
        </div>
    );
}

function Card({ titulo, descricao, href, Icon }) {
    return (
        <Link href={href} className={styles.card}>
            <span className={styles.cardIcon}>
                <Icon size={32} />
            </span>
            <h3>{titulo}</h3>
            <p>{descricao}</p>
            <span className={styles.cardLink}>Saiba mais →</span>
        </Link>
    );
}

export default function Page() {
    return (
        <>
            <ScrollEffects />

            <header className={styles.hero}>
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
                    <form className={styles.search} role="search">
                        <Search size={18} />
                        <input
                            type="search"
                            placeholder="Pesquisar conteúdos..."
                            aria-label="Pesquisar"
                        />
                    </form>

                    <div className={styles.brand}>
                        <Image
                            src="/images/logo.png"
                            alt="Logo GeoGoats"
                            width={572}
                            height={572}
                            priority
                            className={styles.logo}
                        />
                        <h1 className={dosis.className}>GEOGOATS</h1>
                        <p>
                            Fique conectado com as notícias mais recentes da
                            geografia.
                        </p>
                    </div>
                </div>

                <CamadaNuvens className={styles.nuvensFundo} />
                <CamadaNuvens className={styles.nuvensFrente} />
            </header>

            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Por Onde Começar?</h2>
                        <p>
                            Três caminhos complementares para entender a Terra:
                            a natureza, a sociedade e a forma como representamos
                            o espaço.
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
                        {caminhos.map(({ id, ...card }) => (
                            <Card key={id} {...card} />
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Conteúdos em Destaque</h2>
                        <p>
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

                    <div className={styles.cards}>
                        {destaques.map(({ id, ...card }) => (
                            <Card key={id} {...card} />
                        ))}
                    </div>
                </section>
            </main>

            <footer className={styles.footer}>
                <p>GeoGoats &copy; {new Date().getFullYear()}</p>
                <p>Next.js - React - Lucide</p>
            </footer>
        </>
    );
}

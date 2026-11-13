import Image from 'next/image';
import Link from 'next/link';
import { Compass, Earth, Globe, Map, Mountain, Search, Users } from 'lucide-react';
import styles from './page.module.css';

const caminhos = [
    {
        id: 1,
        titulo: 'Geografia Física',
        descricao: 'Relevo, clima, hidrografia e vegetação: como a natureza molda o planeta.',
        href: '/fisica',
        Icon: Mountain,
    },
    {
        id: 2,
        titulo: 'Geografia Humana',
        descricao: 'População, cidades, economia e cultura: como a sociedade ocupa o espaço.',
        href: '/humana',
        Icon: Users,
    },
    {
        id: 3,
        titulo: 'Cartografia',
        descricao: 'Mapas, escalas e projeções: como representamos o espaço geográfico.',
        href: '/cartografia',
        Icon: Map,
    },
];

const destaques = [
    {
        id: 1,
        titulo: 'O que é Geografia?',
        descricao: 'Entenda o objeto de estudo da Geografia e seus principais conceitos.',
        href: '/conteudos/o-que-e-geografia',
        Icon: Globe,
    },
    {
        id: 2,
        titulo: 'Orientação e Coordenadas',
        descricao: 'Pontos cardeais, latitude e longitude para se localizar no mundo.',
        href: '/conteudos/coordenadas',
        Icon: Compass,
    },
    {
        id: 3,
        titulo: 'A Terra no Universo',
        descricao: 'Movimentos de rotação e translação, estações do ano e fusos horários.',
        href: '/conteudos/terra',
        Icon: Earth,
    },
];

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
            <header className={styles.hero}>
                <Image
                    src="/images/hero.png"
                    alt=""
                    width={1440}
                    height={963}
                    priority
                    className={styles.heroImage}
                />

                <div className={styles.heroContent}>
                    <form className={styles.search} role="search">
                        <Search size={18} />
                        <input type="search" placeholder="Pesquisar conteúdos..." aria-label="Pesquisar" />
                    </form>

                    <div className={styles.brand}>
                        {/* Troca este ícone pela logo do projeto (ex: /images/logo.png) */}
                        <Earth size={64} className={styles.logo} />
                        <h1>GEOGOATS</h1>
                        <p>Fique conectado com as notícias mais recentes da geografia.</p>
                    </div>
                </div>
            </header>

            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Por Onde Começar?</h2>
                        <p>
                            Três caminhos complementares para entender a Terra: a natureza, a sociedade e a
                            forma como representamos o espaço.
                        </p>
                    </div>

                    <Image
                        src="/images/mascote-feliz.png"
                        alt="Mascote GeoGoats comemorando"
                        width={260}
                        height={260}
                        className={`${styles.mascote} ${styles.mascoteDireita}`}
                    />

                    <div className={styles.cards}>
                        {caminhos.map(({ id, ...card }) => (
                            <Card key={id} {...card} />
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Conteúdos em Destaque</h2>
                        <p>Temas introdutórios que servem de base para o restante dos estudos.</p>
                    </div>

                    <Image
                        src="/images/mascote-coracao.png"
                        alt="Mascote GeoGoats apaixonado"
                        width={220}
                        height={220}
                        className={`${styles.mascote} ${styles.mascoteEsquerda}`}
                    />

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

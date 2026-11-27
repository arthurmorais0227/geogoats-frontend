import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';

const placeholders = {
    fisica: {
        title: 'Geografia física',
        description: 'Relevo, clima, hidrografia e vegetação.',
    },
    humana: {
        title: 'Geografia humana',
        description: 'População, cidades, economia e cultura.',
    },
    cartografia: {
        title: 'Cartografia',
        description: 'Mapas, escalas e projeções cartográficas.',
    },
    simulado: {
        title: 'Simulado',
        description: 'Questões para revisar conteúdos de Geografia.',
    },
    dicas: {
        title: 'Dicas de estudo',
        description: 'Orientações para organizar os estudos de Geografia.',
    },
    videos: {
        title: 'Vídeos',
        description: 'Videoaulas e materiais audiovisuais de Geografia.',
    },
};

export const dynamicParams = false;

export function generateStaticParams() {
    return Object.keys(placeholders).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const page = placeholders[slug];

    if (!page) return {};

    return {
        title: `${page.title} | GeoGoats`,
        description: page.description,
    };
}

export default async function PlaceholderPage({ params }) {
    const { slug } = await params;
    const page = placeholders[slug];

    if (!page) notFound();

    return (
        <main className={styles.page}>
            <Navbar />
            <section
                className={styles.content}
                aria-labelledby="placeholder-title"
            >
                <h1 id="placeholder-title">{page.title}</h1>
                <p>
                    Esta seção ainda está em construção. Volte à página inicial
                    para acessar os conteúdos disponíveis.
                </p>
                <Link href="/" className={styles.link}>
                    Voltar ao início
                </Link>
            </section>
        </main>
    );
}

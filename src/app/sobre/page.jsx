import axios from 'axios';
import { BookOpen, Compass, Sparkles } from 'lucide-react';
import Image from 'next/image';
import CardParticipante from '@/components/CardParticipante';
import Navbar from '@/components/Navbar';
import ScrollEffects from '@/components/ScrollEffects';
import TituloAnimado from '@/components/TituloAnimado';
import { climateCrisis } from '../fonts';
import styles from './sobre.module.css';

const valores = [
    {
        titulo: 'Aprender explorando',
        descricao:
            'Acreditamos que a Geografia fica mais fácil quando é descoberta como uma aventura.',
        Icon: Compass,
    },
    {
        titulo: 'Conteúdo claro',
        descricao:
            'Explicações simples e diretas, feitas para quem está começando ou revisando.',
        Icon: BookOpen,
    },
    {
        titulo: 'Feito com carinho',
        descricao:
            'Cada detalhe do site foi pensado para tornar o estudo mais leve e divertido.',
        Icon: Sparkles,
    },
];

// busca de novo no backend a cada 60s (sem isso, a lista ficaria congelada no build)
export const revalidate = 60;

export default async function Page() {
    let participantes = [];

    // Busca feita no servidor (SSR): a api-key não aparece no navegador
    try {
        const resp = await axios.get(`${process.env.API_URL}/participantes`, {
            headers: { 'x-api-key': process.env.API_KEY },
            timeout: 30000, // Render free "dorme" e o 1º acesso pode demorar
        });

        participantes = Array.isArray(resp.data) ? resp.data : [];
    } catch (error) {
        console.error('Erro ao buscar participantes:', error.message);
    }

    return (
        <>
            <ScrollEffects />

            <header className={styles.hero}>
                <Navbar />
                <Image
                    src="/images/sobre-hero.png"
                    alt=""
                    fill
                    priority
                    unoptimized
                    className={styles.heroImage}
                />
                <div className={styles.heroContent}>
                    <span className={styles.heroEyebrow}>Conheça o projeto</span>
                    <TituloAnimado className={climateCrisis.className}>
                        SOBRE NÓS
                    </TituloAnimado>
                    <p>
                        Somos o GeoGoats, um projeto feito para deixar o estudo
                        de Geografia mais simples e divertido.
                    </p>
                </div>
            </header>

            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionEyebrow}>Quem somos</span>
                        <h2 data-revelar-texto="letras">
                            Nossa missão
                        </h2>
                        <p data-revelar-texto="palavras">
                            O GeoGoats nasceu como um projeto escolar com uma
                            ideia simples: reunir em um só lugar matérias,
                            notícias, carreiras e dicas de Geografia, com uma
                            linguagem fácil e um visual que dá vontade de
                            explorar.
                        </p>
                    </div>

                    <div className={styles.cards}>
                        {valores.map(({ titulo, descricao, Icon }) => (
                            <article
                                key={titulo}
                                className={styles.card}
                                data-revelar="card"
                            >
                                <span className={styles.cardIcon}>
                                    <Icon size={26} />
                                </span>
                                <h3>{titulo}</h3>
                                <p>{descricao}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionEyebrow}>
                            Nossa equipe
                        </span>
                        <h2 data-revelar-texto="letras">
                            Participantes
                        </h2>
                    </div>

                    {participantes.length === 0 ? (
                        <p className={styles.vazio}>
                            Não foi possível carregar os participantes agora.
                        </p>
                    ) : (
                        <div className={styles.equipe}>
                            {participantes.map((participante) => (
                                <CardParticipante
                                    key={participante.id}
                                    participante={participante}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <footer className={styles.footer}>
                <p>GeoGoats &copy; {new Date().getFullYear()}</p>
            </footer>
        </>
    );
}

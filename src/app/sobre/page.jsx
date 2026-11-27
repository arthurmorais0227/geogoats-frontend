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
        titulo: 'Matérias',
        descricao:
            'Temas de Geografia organizados por assunto.',
        Icon: Compass,
    },
    {
        titulo: 'Notícias',
        descricao:
            'Atualidades relacionadas a território, clima e cidades.',
        Icon: BookOpen,
    },
    {
        titulo: 'Carreiras e estágio',
        descricao:
            'Profissões que usam conhecimentos geográficos e informações sobre estágio.',
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
                    <TituloAnimado className={climateCrisis.className}>
                        SOBRE NÓS
                    </TituloAnimado>
                    <p>
                        Projeto escolar de Geografia desenvolvido por estudantes
                        do SENAI/SESI Valinhos.
                    </p>
                </div>
            </header>

            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 data-revelar-texto="letras">
                            O que há no portal
                        </h2>
                        <p data-revelar-texto="palavras">
                            O GeoGoats reúne temas de Geografia, notícias,
                            carreiras e estágio para estudantes do Ensino Médio.
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
                        <h2 data-revelar-texto="letras">
                            Equipe GeoGoats
                        </h2>
                    </div>

                    {participantes.length === 0 ? (
                        <p className={styles.vazio}>
                            Não foi possível carregar a equipe. Atualize a
                            página para tentar novamente.
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
        </>
    );
}

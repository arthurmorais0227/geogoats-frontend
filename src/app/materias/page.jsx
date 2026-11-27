import axios from 'axios';
import Image from 'next/image';
import CardTema from '@/components/CardTema';
import Navbar from '@/components/Navbar';
import TituloAnimado from '@/components/TituloAnimado';
import ScrollEffects from '@/components/ScrollEffects';
import { climateCrisis } from '../fonts';
import styles from './materias.module.css';

export const metadata = {
    title: 'Matérias de Geografia | GeoGoats',
    description: 'Temas de Geografia organizados por assunto.',
};

export const revalidate = 60;

export default async function MateriasPage() {
    let temas = [];
    let carregamentoFalhou = false;

    try {
        const resp = await axios.get(`${process.env.API_URL}/temas`, {
            headers: { 'x-api-key': process.env.API_KEY },
            timeout: 30000,
        });

        if (!Array.isArray(resp.data)) {
            throw new Error('A API de temas retornou um formato inesperado.');
        }

        temas = resp.data;
    } catch (error) {
        console.error('Erro ao buscar temas:', error.message);
        carregamentoFalhou = true;
    }

    return (
        <>
            <ScrollEffects />

            <header className={styles.hero}>
                <Navbar />
                <Image
                    src="/images/materias-hero.png"
                    alt=""
                    fill
                    priority
                    unoptimized
                    sizes="100vw"
                    className={styles.heroImage}
                />
                <div className={styles.heroContent}>
                    <TituloAnimado className={climateCrisis.className}>
                        MATÉRIAS
                    </TituloAnimado>
                </div>
            </header>

            <main className={styles.main}>
                <svg
                    className={styles.agua}
                    viewBox="0 0 1440 200"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <path fill="#77ebc8" d="M0 0Q720 190 1440 0V200H0Z" />
                    <path fill="#acf4d9" d="M0 4Q720 266 1440 4V200H0Z" />
                    <path fill="#d6fad9" d="M0 7Q720 329 1440 7V200H0Z" />
                    <path style={{ fill: 'var(--fundo)' }} d="M0 10Q720 386 1440 10V200H0Z" />
                </svg>
                <section
                    className={styles.section}
                    aria-labelledby="materias-title"
                >
                    <div className={styles.sectionHeader}>
                        <h2 id="materias-title" data-revelar-texto="letras">
                            Temas para estudar
                        </h2>
                        <p data-revelar-texto="palavras">
                            Escolha uma área para consultar os temas
                            disponíveis.
                        </p>
                    </div>

                    <div className={styles.cards}>
                        {temas.length === 0 ? (
                            <p className={styles.semTemas}>
                                {carregamentoFalhou
                                    ? 'Não foi possível carregar as matérias agora.'
                                    : 'Nenhuma matéria disponível.'}
                            </p>
                        ) : (
                            temas.map((tema, indice) => (
                                <CardTema
                                    key={tema.id}
                                    tema={tema}
                                    indice={indice}
                                />
                            ))
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}

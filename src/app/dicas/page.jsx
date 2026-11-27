import axios from 'axios';
import Image from 'next/image';
import Flashcards from '@/components/Flashcards';
import Navbar from '@/components/Navbar';
import ScrollEffects from '@/components/ScrollEffects';
import TituloAnimado from '@/components/TituloAnimado';
import { climateCrisis } from '../fonts';
import styles from './dicas.module.css';

export const metadata = {
    title: 'Dicas de Geografia | GeoGoats',
    description: 'Flashcards com dicas rápidas para revisar Geografia.',
};

export const revalidate = 60;

async function buscar(rota) {
    const resp = await axios.get(`${process.env.API_URL}/${rota}`, {
        headers: { 'x-api-key': process.env.API_KEY },
        timeout: 30000,
    });

    if (!Array.isArray(resp.data)) {
        throw new Error(`A API de ${rota} retornou um formato inesperado.`);
    }

    return resp.data;
}

export default async function DicasPage() {
    // busca dicas e temas ao mesmo tempo; se os temas falharem, as dicas aparecem mesmo assim
    const [respDicas, respTemas] = await Promise.allSettled([
        buscar('dicas'),
        buscar('temas'),
    ]);

    const dicas = respDicas.status === 'fulfilled' ? respDicas.value : [];
    const temas = respTemas.status === 'fulfilled' ? respTemas.value : [];
    const carregamentoFalhou = respDicas.status === 'rejected';

    if (respDicas.status === 'rejected') {
        console.error('Erro ao buscar dicas:', respDicas.reason?.message);
    }
    if (respTemas.status === 'rejected') {
        console.error('Erro ao buscar temas:', respTemas.reason?.message);
    }

    return (
        <>
            <ScrollEffects />

            <header className={styles.hero}>
                <Navbar />
                <Image
                    src="/images/dicas-hero.png"
                    alt=""
                    fill
                    priority
                    unoptimized
                    sizes="100vw"
                    className={styles.heroImage}
                />
                <div className={styles.heroContent}>
                    <TituloAnimado className={climateCrisis.className}>DICAS</TituloAnimado>
                </div>
            </header>

            <main className={styles.main}>

                <section className={styles.section} aria-labelledby="dicas-title">
                    <div className={styles.sectionHeader}>
                        <h2 id="dicas-title" data-revelar-texto="letras">
                            Cartões de revisão
                        </h2>
                        <p data-revelar-texto="palavras">
                            Leia a dica, tente lembrar a explicação e clique no cartão para
                            conferir.
                        </p>
                    </div>

                    {dicas.length === 0 ? (
                        <p className={styles.vazio}>
                            {carregamentoFalhou
                                ? 'Não foi possível carregar as dicas agora.'
                                : 'Nenhuma dica disponível.'}
                        </p>
                    ) : (
                        <Flashcards dicas={dicas} temas={temas} />
                    )}
                </section>
            </main>
        </>
    );
}
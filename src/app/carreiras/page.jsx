import axios from 'axios';
import { Dosis } from 'next/font/google';
import Image from 'next/image';
import CardCarreira from '@/components/CardCarreira';
import Navbar from '@/components/Navbar';
import TituloAnimado from '@/components/TituloAnimado';
import ScrollEffects from '@/components/ScrollEffects';
import { climateCrisis } from '../fonts';
import styles from './page.module.css';

const dosis = Dosis({ subsets: ['latin'], weight: ['700', '800'] });

const coresCarreira = [
    '#83d2a3',
    '#f1d05c',
    '#ad89d2',
    '#dc9696',
    '#8cc4d5',
    '#83d2b2',
    '#d5b68f',
    '#90a9d8',
    '#d589ba',
];

export const revalidate = 60;

export default async function Page() {
    let carreiras = [];

    try {
        const resp = await axios.get(`${process.env.API_URL}/carreiras`, {
            headers: { 'x-api-key': process.env.API_KEY },
            timeout: 30000,
        });

        carreiras = Array.isArray(resp.data) ? resp.data : [];
    } catch (error) {
        console.error('Erro ao buscar carreiras:', error.message);
    }

    return (
        <>
            <ScrollEffects />

            <header className={styles.hero}>
                <Navbar />
                <Image
                    src="/images/carreiraFundo.png"
                    alt=""
                    fill
                    priority
                    unoptimized
                    className={styles.heroImage}
                />
                <div className={styles.heroContent}>
                    <TituloAnimado className={climateCrisis.className}>
                        CARREIRAS
                    </TituloAnimado>
                </div>
            </header>

            <main className={styles.main}>
                <section className={styles.intro}>
                    <div className={styles.saudacao}>
                        <div className={styles.mascote}>
                            <Image
                                src="/images/mascote-pidao.webp"
                                alt="Mascote GeoGoats"
                                width={150}
                                height={150}
                                className={styles.mascoteImage}
                            />
                        </div>
                        <div className={`${styles.balao} ${dosis.className}`}>
                            Veja profissões ligadas ao território, ao ambiente
                            e à organização das cidades.
                        </div>
                    </div>

                    <div className={styles.introText}>
                        <h2 className={dosis.className} data-revelar-texto="letras">
                            Profissões ligadas à Geografia
                        </h2>
                    </div>
                </section>

                <section
                    className={styles.careerSection}
                    aria-label="Carreiras que usam Geografia"
                >
                    <div className={styles.careerGridWrap}>
                        <div
                            className={`${styles.careerMascote} ${styles.careerMascoteLeft}`}
                            aria-hidden="true"
                        >
                            <Image
                                src="/images/mascote-feliz2.png"
                                alt=""
                                width={80}
                                height={80}
                            />
                        </div>
                        <div
                            className={styles.careerMascoteRight}
                            aria-hidden="true"
                        >
                            <Image
                                src="/images/mascote-duvida.png"
                                alt=""
                                width={80}
                                height={80}
                            />
                            <span>?</span>
                        </div>

                        <div className={styles.careerGrid}>
                            {carreiras.length === 0 ? (
                                <p className={styles.careerEmpty}>
                                    Não foi possível carregar as carreiras.
                                    Atualize a página para tentar novamente.
                                </p>
                            ) : (
                                carreiras.map((carreira, indice) => (
                                    <CardCarreira
                                        key={carreira.id}
                                        carreira={carreira}
                                        cor={
                                            coresCarreira[
                                                indice % coresCarreira.length
                                            ]
                                        }
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

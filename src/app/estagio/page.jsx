import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { climateCrisis } from '../fonts';
import styles from './estagio.module.css';

export const metadata = {
    title: 'Estágios | GeoGoats',
    description: 'Informações sobre estágio e direitos de estudantes.',
};

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

export default function EstagioPage() {
    return (
        <>
            <header className={styles.hero}>
                <Navbar />
                <Image
                    src="/images/1.png"
                    alt=""
                    width={2560}
                    height={1441}
                    priority
                    unoptimized
                    className={styles.heroImage}
                />
                <div className={styles.heroContent}>
                    <h1 className={climateCrisis.className}>ESTÁGIOS</h1>
                </div>
                <CamadaNuvens className={styles.nuvensFundo} />
                <CamadaNuvens className={styles.nuvensFrente} />
            </header>

            <main className={styles.main}>
                <section
                    className={styles.mural}
                    aria-label="Mural de estágios"
                >
                    <article className={`${styles.nota} ${styles.notaMissao}`}>
                        <span className={styles.tachinha} aria-hidden="true" />
                        <h2>Entenda o estágio</h2>
                        <p className={styles.legenda}>
                            Experiência de aprendizado no trabalho real, ligada
                            ao teu curso.
                        </p>
                    </article>

                    <article
                        className={`${styles.nota} ${styles.notaDireitos}`}
                    >
                        <span className={styles.tachinha} aria-hidden="true" />
                        <h2>Direitos no estágio</h2>
                        <ul>
                            <li>Até 6h por dia / 30h semanais</li>
                            <li>
                                Bolsa e auxílio transporte no estágio não
                                obrigatório
                            </li>
                            <li>
                                Seguro contra acidentes. Recesso de 30 dias por
                                ano
                            </li>
                            <li>Supervisor e orientador</li>
                        </ul>
                    </article>

                    <div
                        className={`${styles.nota} ${styles.notaAmarela}`}
                        aria-hidden="true"
                    >
                        <span className={styles.tachinha} />
                    </div>
                    <div
                        className={`${styles.nota} ${styles.notaBranca}`}
                        aria-hidden="true"
                    >
                        <span className={styles.tachinha} />
                    </div>
                    <div
                        className={`${styles.nota} ${styles.notaAzul}`}
                        aria-hidden="true"
                    >
                        <span className={styles.tachinha} />
                    </div>
                    <div
                        className={`${styles.nota} ${styles.notaLarga}`}
                        aria-hidden="true"
                    >
                        <span className={styles.tachinha} />
                        <span
                            className={`${styles.tachinha} ${styles.tachinhaInferior}`}
                        />
                    </div>
                </section>
            </main>
        </>
    );
}

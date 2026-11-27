import Image from 'next/image';
import { climateCrisis } from '@/app/fonts';
import styles from './TelaAuth.module.css';

export default function TelaAuth({ titulo, subtitulo, children }) {
    return (
        <main className={styles.tela}>
            <div className={styles.cartao}>
                <section className={styles.lado}>
                    <div className={styles.marca}>
                        <Image
                            src="/images/logo.png"
                            alt=""
                            width={572}
                            height={572}
                            className={styles.logo}
                            priority
                        />
                        <span className={`${styles.nomeMarca} ${climateCrisis.className}`}>
                            GeoGoats
                        </span>
                    </div>

                    <div className={styles.conteudo}>
                        <h1 className={styles.titulo}>{titulo}</h1>
                        <p className={styles.subtitulo}>{subtitulo}</p>
                        {children}
                    </div>

                    <p className={styles.copy}>
                        © {new Date().getFullYear()} GeoGoats · Projeto Integrador SENAI/SESI
                    </p>
                </section>

                <div className={styles.imagem}>
                    <Image
                        src="/images/login.png"
                        alt=""
                        fill
                        sizes="(max-width: 900px) 0px, 50vw"
                        style={{ objectFit: 'cover', objectPosition: '55% center' }}
                        priority
                    />
                    <div className={styles.legenda}>
                        <strong>
                            Explore o planeta, um mapa de cada vez.
                        </strong>
                        <span>Notícias, simulados e carreiras de Geografia em um só lugar.</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
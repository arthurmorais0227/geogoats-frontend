import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Compass } from 'lucide-react';
import Navbar from '@/components/Navbar';
import styles from './not-found.module.css';
import { climateCrisis } from './fonts';

export default function NotFound() {
    return (
        <main className={styles.page}>
            <Navbar />

            <div className={styles.stars} aria-hidden="true" />

            <section className={styles.content} aria-labelledby="titulo-not-found">
                <div className={styles.illustration}>
                    <span className={styles.orbit} aria-hidden="true" />
                    <Image
                        src="/images/mascote-duvida.png"
                        alt=""
                        width={320}
                        height={320}
                        priority
                        className={styles.mascot}
                    />
                </div>

                <div className={styles.copy}>
                    <span className={styles.code}>
                        <Compass size={18} aria-hidden="true" />
                        404
                    </span>
                    <h1 id="titulo-not-found" className={climateCrisis.className} >Você saiu do mapa</h1>
                    <p>
                        Esta página não existe ou mudou de coordenadas.
                        Volte ao início e continue explorando o planeta.
                    </p>

                    <Link href="/" className={styles.button}>
                        <ArrowLeft size={18} aria-hidden="true" />
                        Voltar ao início
                    </Link>
                </div>
            </section>
        </main>
    );
}

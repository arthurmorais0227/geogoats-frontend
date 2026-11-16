import Image from 'next/image';
import Link from 'next/link';
import { Component } from '@/components/ui/liquid-glass';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <Link
                    href="/"
                    className={styles.logoLink}
                    aria-label="GeoGoats - Início"
                >
                    <Image
                        src="/images/logo.png"
                        alt=""
                        width={572}
                        height={572}
                        className={styles.logoImg}
                    />
                </Link>

                <Component className={styles.nav}>
                    <nav aria-label="Navegação principal">
                        <ul className={styles.navList}>
                            <li>
                                <Link href="/" className={styles.navLink}>
                                    Início
                                </Link>
                            </li>
                            <li>
                                <Link href="/noticias" className={styles.navLink}>
                                    Notícias
                                </Link>
                            </li>
                            <li>
                                <Link href="/simulado" className={styles.navLink}>
                                    Simulado
                                </Link>
                            </li>
                            <li>
                                <Link href="/carreiras" className={styles.navLink}>
                                    Carreiras
                                </Link>
                            </li>
                            <li>
                                <Link href="/dicas" className={styles.navLink}>
                                    Dicas
                                </Link>
                            </li>
                            <li>
                                <Link href="/estagio" className={styles.navLink}>
                                    Estágio
                                </Link>
                            </li>
                            <li>
                                <Link href="/videos" className={styles.navLink}>
                                    Vídeos
                                </Link>
                            </li>
                            <li>
                                <Link href="/sobre" className={styles.navLink}>
                                    Sobre nós
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </Component>
            </div>
        </div>
    );
}
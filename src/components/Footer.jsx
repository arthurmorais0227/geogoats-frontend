import Image from 'next/image';
import { Component } from '@/components/ui/liquid-glass';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Component className={styles.footerGlass}>
                <div className={styles.footerTop}>
                    <div className={styles.brand}>
                        <Image
                            src="/images/logo.png"
                            alt=""
                            width={64}
                            height={64}
                            className={styles.logo}
                        />
                        <div>
                            <p className={styles.eyebrow}>GEOGRAFIA EM MOVIMENTO</p>
                            <h2>GeoGoats</h2>
                        </div>
                    </div>
                    <p className={styles.description}>
                        Explore a natureza, a sociedade e a cartografia para
                        entender melhor a Terra.
                    </p>
                </div>

                <div className={styles.footerBottom}>
                    <p className={styles.copyright}>
                        &copy; {new Date().getFullYear()} GeoGoats
                    </p>
                    <div className={styles.technology}>
                        <span className={styles.technologyLabel}>
                            Desenvolvido com
                        </span>
                        <ul aria-label="Tecnologias utilizadas">
                            <li>Next.js</li>
                            <li>React</li>
                            <li>Lucide</li>
                            <li>GSAP</li>
                            <li>Motion</li>
                        </ul>
                    </div>
                </div>
            </Component>
        </footer>
    );
}
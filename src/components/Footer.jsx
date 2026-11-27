import { ArrowUp, Compass, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { climateCrisis } from '@/app/fonts';
import styles from './Footer.module.css';

const colunas = [
    {
        titulo: 'Explorar',
        links: [
            { label: 'Início', href: '/' },
            { label: 'Matérias', href: '/materias' },
            { label: 'Notícias', href: '/noticias' },
            { label: 'Vídeos', href: '/videos' },
        ],
    },
    {
        titulo: 'Praticar',
        links: [
            { label: 'Simulado', href: '/simulado' },
            { label: 'Dicas', href: '/dicas' },
            { label: 'Carreiras', href: '/carreiras' },
            { label: 'Estágio', href: '/estagio' },
        ],
    },
    {
        titulo: 'Geografia',
        links: [
            { label: 'Geografia Física', href: '/fisica' },
            { label: 'Geografia Humana', href: '/humana' },
            { label: 'Cartografia', href: '/cartografia' },
            { label: 'Sobre nós', href: '/sobre' },
        ],
    },
];

const tecnologias = ['Next.js', 'React', 'Tailwind CSS', 'GSAP'];

export default function Footer() {
    return (
        <footer className={styles.footer}>
            {/* relevo no topo, emendando com o fundo do footer */}
            <svg
                className={styles.onda}
                viewBox="0 0 1440 64"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path
                    d="M0,64 L0,38 C160,6 320,54 520,30 C720,6 860,58 1040,34 C1200,14 1340,40 1440,16 L1440,64 Z"
                    fill="currentColor"
                />
            </svg>

            <div className={styles.container}>
                <Image
                    src="/images/mascote-feliz.png"
                    alt=""
                    width={150}
                    height={150}
                    className={styles.mascote}
                    aria-hidden="true"
                />

                <div className={styles.grid}>
                    <div className={styles.marca}>
                        <Link href="/" className={styles.logo}>
                            <span className={styles.logoIcone}>
                                <Compass size={22} />
                            </span>
                            <span className={climateCrisis.className}>
                                GEOGOATS
                            </span>
                        </Link>

                        <p className={styles.tagline}>
                            Conteúdos de Geografia para estudar temas,
                            acompanhar notícias e conhecer carreiras no Ensino
                            Médio.
                        </p>

                        <ul className={styles.tecnologias} aria-label="Tecnologias">
                            {tecnologias.map((tec) => (
                                <li key={tec}>{tec}</li>
                            ))}
                        </ul>
                    </div>

                    {colunas.map((coluna) => (
                        <nav
                            key={coluna.titulo}
                            className={styles.coluna}
                            aria-label={coluna.titulo}
                        >
                            <h3>{coluna.titulo}</h3>
                            <ul>
                                {coluna.links.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href}>
                                            <span>{link.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}
                </div>

                <div className={styles.rodape}>
                    <p>
                        GeoGoats &copy; {new Date().getFullYear()} · Projeto
                        Integrador SENAI/SESI Valinhos
                    </p>

                    <div className={styles.acoes}>
                        <a
                            href="https://github.com/arthurmorais0227/geogoats-frontend"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.repo}
                        >
                            Repositório <ExternalLink size={14} />
                        </a>
                        <a
                            href="#"
                            className={styles.topo}
                            aria-label="Voltar ao topo"
                        >
                            <ArrowUp size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
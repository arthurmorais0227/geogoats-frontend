'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { Component } from '@/components/ui/liquid-glass';
import { ACESSO } from '@/lib/acesso';
import styles from './Navbar.module.css';

const links = [
    { href: '/', label: 'Início' },
    { href: '/materias', label: 'Matérias' },
    { href: '/noticias', label: 'Notícias' },
    { href: '/simulado', label: 'Simulado' },
    { href: '/carreiras', label: 'Carreiras' },
    { href: '/dicas', label: 'Dicas' },
    { href: '/estagio', label: 'Estágio' },
    { href: '/videos', label: 'Vídeos' },
    { href: '/sobre', label: 'Sobre nós' },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const { user, isSignedIn } = useUser();
    const areas = Object.keys(ACESSO).filter((rota) =>
        ACESSO[rota].includes(user?.publicMetadata?.role),
    );

    useEffect(() => {
        const fecharMenu = () => {
            if (window.innerWidth > 760) setMenuOpen(false);
        };

        window.addEventListener('resize', fecharMenu);
        return () => window.removeEventListener('resize', fecharMenu);
    }, []);

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
                            {links.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className={styles.navLink}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </Component>

                <div className={styles.conta}>
                    {!isSignedIn ? (
                        <>
                            <SignInButton mode="modal">
                                <button type="button" className={styles.navLink}>
                                    Entrar
                                </button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button type="button" className={styles.navLink}>
                                    Cadastrar
                                </button>
                            </SignUpButton>
                        </>
                    ) : (
                        <>
                            {areas.map((rota) => (
                                <Link key={rota} href={`/${rota}`} className={styles.navLink}>
                                    {rota}
                                </Link>
                            ))}
                            <UserButton />
                        </>
                    )}
                </div>

                <button
                    type="button"
                    className={styles.menuButton}
                    aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
                    aria-expanded={menuOpen}
                    aria-controls="navegacao-mobile"
                    onClick={() => setMenuOpen((aberto) => !aberto)}
                >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                <Component
                    id="navegacao-mobile"
                    className={`${styles.mobileDrawer} ${menuOpen ? styles.mobileDrawerOpen : ''}`}
                >
                    <nav aria-label="Navegação principal mobile">
                        <ul className={styles.mobileDrawerList}>
                            {links.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={styles.mobileDrawerLink}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </Component>
            </div>
        </div>
    );
}
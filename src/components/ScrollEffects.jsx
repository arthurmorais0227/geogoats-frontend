'use client';

import { useEffect } from 'react';

export default function ScrollEffects() {
    useEffect(() => {
        const raiz = document.documentElement;
        let quadro = 0;

        const atualizarScroll = () => {
            cancelAnimationFrame(quadro);
            quadro = requestAnimationFrame(() => {
                raiz.style.setProperty('--scroll', String(window.scrollY));
            });
        };

        atualizarScroll();
        window.addEventListener('scroll', atualizarScroll, { passive: true });

        const observador = new IntersectionObserver(
            (entradas) => {
                for (const entrada of entradas) {
                    if (entrada.isIntersecting) {
                        entrada.target.dataset.visivel = 'true';
                        observador.unobserve(entrada.target);
                    }
                }
            },
            { threshold: 0.3 },
        );

        for (const elemento of document.querySelectorAll('[data-revelar]')) {
            observador.observe(elemento);
        }

        return () => {
            cancelAnimationFrame(quadro);
            window.removeEventListener('scroll', atualizarScroll);
            observador.disconnect();
        };
    }, []);

    return null;
}

'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useEffect } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

// Efeitos de scroll usados em todas as páginas:
// - variável --scroll no <html> (parallax da hero no CSS)
// - data-visivel="true" em quem tem [data-revelar] quando entra na tela
// - textos [data-revelar-texto="letras" | "palavras"] revelados conforme rola
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

    // Textos que se revelam conforme rola (scrub = segue a barra de rolagem)
    useGSAP(() => {
        const mm = gsap.matchMedia();

        // Quem prefere menos movimento vê os textos parados
        mm.add('(prefers-reduced-motion: no-preference)', () => {
            for (const el of gsap.utils.toArray('[data-revelar-texto]')) {
                const porLetra = el.dataset.revelarTexto === 'letras';
                const split = SplitText.create(el, {
                    type: porLetra ? 'words,chars' : 'words',
                });

                gsap.from(porLetra ? split.chars : split.words, {
                    opacity: 0.12,
                    y: porLetra ? 18 : 0,
                    stagger: porLetra ? 0.04 : 0.03,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 88%',
                        end: porLetra ? 'top 55%' : 'top 60%',
                        scrub: 0.6,
                    },
                });
            }
        });
    });

    return null;
}

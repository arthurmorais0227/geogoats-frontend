'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, SplitText);

// Título da hero com a mesma entrada da home: as letras sobem uma a uma
export default function TituloAnimado({ children, className }) {
    const tituloRef = useRef(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            // Quem prefere menos movimento vê o título parado
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                // words + chars: as letras animam, mas a palavra nunca quebra no meio
                const titulo = SplitText.create(tituloRef.current, {
                    type: 'words,chars',
                    mask: 'chars',
                });

                // o título começa escondido pelo CSS (evita "piscar" antes do JS)
                gsap.set(tituloRef.current, { autoAlpha: 1 });

                gsap.from(titulo.chars, {
                    yPercent: 110,
                    rotate: 8,
                    duration: 0.8,
                    stagger: 0.05,
                    delay: 0.2,
                    ease: 'power3.out',
                });
            });
        },
        { scope: tituloRef },
    );

    return (
        <h1 ref={tituloRef} className={className} data-titulo-animado>
            {children}
        </h1>
    );
}

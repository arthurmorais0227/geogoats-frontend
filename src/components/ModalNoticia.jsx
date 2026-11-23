'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useEffect, useId, useRef } from 'react';
import styles from './ModalNoticia.module.css';

export default function ModalNoticia({ noticia, onClose }) {
    const dialogRef = useRef(null);
    const tituloId = useId();
    const data = noticia.dataPublicacao
        ? new Date(noticia.dataPublicacao)
        : null;
    const dataFormatada =
        data && !Number.isNaN(data.getTime())
            ? new Intl.DateTimeFormat('pt-BR', {
                  timeZone: 'UTC',
              }).format(data)
            : null;

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const overflowAnterior = document.body.style.overflow;
        dialog.showModal();
        document.body.style.overflow = 'hidden';

        return () => {
            if (dialog.open) dialog.close();
            document.body.style.overflow = overflowAnterior;
        };
    }, []);

    function fecharSeClicarNoBackdrop(event) {
        if (event.target !== event.currentTarget) return;

        const limites = event.currentTarget.getBoundingClientRect();
        const clicouFora =
            event.clientX < limites.left ||
            event.clientX > limites.right ||
            event.clientY < limites.top ||
            event.clientY > limites.bottom;

        if (clicouFora) onClose();
    }

    function fecharComEscape(event) {
        event.preventDefault();
        onClose();
    }

    if (typeof document === 'undefined') return null;

    return createPortal(
        <dialog
            ref={dialogRef}
            className={styles.modal}
            aria-labelledby={tituloId}
            onCancel={fecharComEscape}
            onClick={fecharSeClicarNoBackdrop}
        >
            <header className={styles.cabecalho}>
                {dataFormatada && (
                    <time
                        className={styles.data}
                        dateTime={noticia.dataPublicacao}
                    >
                        {dataFormatada}
                    </time>
                )}
                <button
                    className={styles.fechar}
                    type="button"
                    aria-label="Fechar notícia"
                    onClick={onClose}
                >
                    <X size={22} />
                </button>
            </header>

            {noticia.urlImagem && (
                <Image
                    src={noticia.urlImagem}
                    alt=""
                    width={1200}
                    height={720}
                    unoptimized
                    className={styles.imagem}
                />
            )}

            <article className={styles.artigo}>
                <h2 id={tituloId}>{noticia.titulo}</h2>
                {noticia.resumo && (
                    <p className={styles.resumo}>{noticia.resumo}</p>
                )}
                {noticia.conteudo && (
                    <p className={styles.conteudo}>{noticia.conteudo}</p>
                )}
            </article>
        </dialog>,
        document.body,
    );
}

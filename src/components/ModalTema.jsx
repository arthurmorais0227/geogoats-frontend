'use client';

import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect, useId, useRef } from 'react';
import styles from './ModalTema.module.css';

export default function ModalTema({ tema, onClose }) {
    const dialogRef = useRef(null);
    const tituloId = useId();

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
                {tema.slug && (
                    <span className={styles.slug}>/{tema.slug}</span>
                )}
                <button
                    className={styles.fechar}
                    type="button"
                    aria-label="Fechar tema"
                    onClick={onClose}
                >
                    <X size={22} />
                </button>
            </header>

            <article className={styles.artigo}>
                <h2 id={tituloId}>{tema.nome}</h2>
                {tema.descricao && (
                    <p className={styles.descricao}>{tema.descricao}</p>
                )}
                {tema.codigoApi && (
                    <p className={styles.codigo}>
                        Código de referência: {tema.codigoApi}
                    </p>
                )}
            </article>
        </dialog>,
        document.body,
    );
}

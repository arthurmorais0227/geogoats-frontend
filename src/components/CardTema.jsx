'use client';

import {
    Compass,
    Earth,
    Globe,
    Leaf,
    Map,
    Mountain,
    Users,
} from 'lucide-react';
import { useState } from 'react';
import ModalTema from '@/components/ModalTema';
import styles from '@/app/materias/materias.module.css';

const iconesTema = [Mountain, Users, Map, Globe, Compass, Leaf, Earth];

export default function CardTema({ tema, indice }) {
    const [modalAberto, setModalAberto] = useState(false);
    const Icon = iconesTema[indice % iconesTema.length];

    return (
        <>
            <article className={styles.card} data-revelar>
                <span className={styles.cardIcon}>
                    <Icon size={28} aria-hidden="true" />
                </span>
                <h3>{tema.nome}</h3>
                {tema.descricao && <p>{tema.descricao}</p>}
                {tema.slug && (
                    <ul
                        className={styles.topics}
                        aria-label={`Identificador de ${tema.nome}`}
                    >
                        <li>{tema.slug}</li>
                    </ul>
                )}
                <button
                    className={styles.cardAction}
                    type="button"
                    onClick={() => setModalAberto(true)}
                >
                    Explorar tema <span aria-hidden="true">→</span>
                </button>
            </article>

            {modalAberto && (
                <ModalTema
                    tema={tema}
                    onClose={() => setModalAberto(false)}
                />
            )}
        </>
    );
}

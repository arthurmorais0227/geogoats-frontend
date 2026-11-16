'use client';

import { motion } from 'motion/react';
import styles from './CardNoticia.module.css';

// Card de notícia: entrada/saída e deslize da busca + hover (Motion)
export default function CardNoticia({
    indice = 0,
    id,
    categoria,
    titulo,
    descricao,
    href,
    Icon,
}) {
    return (
        <motion.div
            layout
            className={styles.cardWrap}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: indice * 0.06 }}
        >
            <motion.a
                href={href}
                className={styles.card}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                <div className={styles.artwork} aria-hidden="true">
                    <span className={styles.sol} />
                    <span className={styles.morroFundo} />
                    <span className={styles.morro} />
                    {Icon && (
                        <Icon className={styles.icone} strokeWidth={1.5} />
                    )}
                    {id != null && (
                        <span className={styles.numero}>
                            {String(id).padStart(2, '0')}
                        </span>
                    )}
                </div>

                <div className={styles.conteudo}>
                    {categoria && (
                        <span className={styles.categoria}>{categoria}</span>
                    )}
                    <h3>{titulo}</h3>
                    <p>{descricao}</p>
                    <span className={styles.link}>
                        Descubra mais <span aria-hidden="true">→</span>
                    </span>
                </div>
            </motion.a>
        </motion.div>
    );
}

'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import styles from '@/app/page.module.css';

const MotionLink = motion.create(Link);

// Entrada/saída do card (quando aparece na tela ou entra/sai da busca).
// Fica numa div por fora para não misturar com o hover, que mexe no próprio link.
const entrada = {
    oculto: { opacity: 0, y: 40, scale: 0.96 },
    visivel: (indice = 0) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: indice * 0.08,
            type: 'spring',
            stiffness: 260,
            damping: 24,
        },
    }),
    saida: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

// Hover: o card sobe, o ícone gira e a seta anda. Os filhos herdam o "hover" do pai.
const mola = { type: 'spring', stiffness: 400, damping: 22 };
const cardHover = {
    repouso: { y: 0, boxShadow: '0 0 0 rgba(74, 125, 92, 0)' },
    hover: { y: -8, boxShadow: '0 16px 32px rgba(74, 125, 92, 0.22)' },
};
const iconeHover = {
    repouso: { rotate: 0, scale: 1 },
    hover: { rotate: -10, scale: 1.12 },
};
const setaHover = {
    repouso: { x: 0 },
    hover: { x: 6 },
};

export default function CardConteudo({
    ref,
    indice,
    titulo,
    descricao,
    href,
    Icon,
}) {
    return (
        <motion.div
            ref={ref}
            layout
            className={styles.cardWrap}
            custom={indice}
            variants={entrada}
            initial="oculto"
            whileInView="visivel"
            exit="saida"
            viewport={{ once: true, amount: 0.3 }}
        >
            <MotionLink
                href={href}
                className={styles.card}
                variants={cardHover}
                initial="repouso"
                animate="repouso"
                whileHover="hover"
                whileFocus="hover"
                whileTap={{ scale: 0.97 }}
                transition={mola}
            >
                <motion.span
                    className={styles.cardIcon}
                    variants={iconeHover}
                    transition={mola}
                >
                    <Icon size={32} />
                </motion.span>
                <h3>{titulo}</h3>
                <p>{descricao}</p>
                <span className={styles.cardLink}>
                    Saiba mais{' '}
                    <motion.span variants={setaHover} transition={mola}>
                        →
                    </motion.span>
                </span>
            </MotionLink>
        </motion.div>
    );
}

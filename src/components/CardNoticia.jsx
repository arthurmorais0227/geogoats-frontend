'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';
import ModalNoticia from '@/components/ModalNoticia';
import styles from './CardNoticia.module.css';

// Card de notícia: entrada/saída e deslize da busca + hover (Motion)
export default function CardNoticia({
    indice = 0,
    id,
    titulo,
    resumo,
    conteudo,
    fonte,
    urlImagem,
    dataPublicacao,
    Icon,
}) {
    const [modalAberto, setModalAberto] = useState(false);
    const data = dataPublicacao
        ? new Date(dataPublicacao)
        : null;
    const dataFormatada =
        data && !Number.isNaN(data.getTime())
            ? new Intl.DateTimeFormat('pt-BR', {
                  timeZone: 'UTC',
              }).format(data)
            : null;

    return (
        <motion.div
            layout
            className={styles.cardWrap}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: indice * 0.06 }}
        >
            <motion.article
                className={styles.card}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                <div className={styles.artwork} aria-hidden="true">
                    {urlImagem ? (
                        <Image
                            src={urlImagem}
                            alt=""
                            width={1000}
                            height={600}
                            unoptimized
                            className={styles.imagem}
                        />
                    ) : (
                        <>
                            <span className={styles.sol} />
                            <span className={styles.morroFundo} />
                            <span className={styles.morro} />
                            {Icon && (
                                <Icon
                                    className={styles.icone}
                                    strokeWidth={1.5}
                                />
                            )}
                        </>
                    )}
                    {id != null && (
                        <span className={styles.numero}>
                            {String(id).padStart(2, '0')}
                        </span>
                    )}
                </div>

                <div className={styles.conteudo}>
                    {dataFormatada && (
                        <span className={styles.categoria}>
                            {dataFormatada}
                        </span>
                    )}
                    <h3>{titulo}</h3>
                    <p>{resumo}</p>
                    {conteudo && (
                        <button
                            className={styles.link}
                            type="button"
                            onClick={() => setModalAberto(true)}
                        >
                            Leia a notícia{' '}
                            <span aria-hidden="true">→</span>
                        </button>
                    )}
                </div>
            </motion.article>
            {modalAberto && (
                <ModalNoticia
                    noticia={{
                        titulo,
                        resumo,
                        conteudo,
                        fonte,
                        urlImagem,
                        dataPublicacao,
                        id,
                    }}
                    onClose={() => setModalAberto(false)}
                />
            )}
        </motion.div>
    );
}

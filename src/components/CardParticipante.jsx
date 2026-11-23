import Image from 'next/image';
import styles from '@/app/sobre/sobre.module.css';

export default function CardParticipante({ participante }) {
    return (
        <article
            className={styles.participante}
            data-revelar="card"
        >
            <Image
                src={participante.foto}
                alt={participante.nome}
                width={120}
                height={120}
                unoptimized
                className={styles.foto}
            />
            <h3>{participante.nome}</h3>
            <p>{participante.curso}</p>
            <span>{participante.idade} anos</span>
        </article>
    );
}

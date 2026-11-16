import styles from '@/app/carreiras/page.module.css';

export default function CardCarreira({ carreira }) {
    const { nome, cor, faz, trabalha, caminho } = carreira;

    return (
        <article
            className={styles.careerCard}
            style={{ '--accent': cor }}
            data-revelar="card"
        >
            <header className={styles.cardHeader}>
                <span className={styles.cardColor} aria-hidden="true" />
                <div className={styles.cardTitle}>
                    <h3>{nome}</h3>
                    <span aria-hidden="true" />
                </div>
            </header>

            <dl className={styles.cardDetails}>
                <div>
                    <dt>O que faz?</dt>
                    <dd>{faz}</dd>
                </div>
                <div>
                    <dt>Onde trabalha?</dt>
                    <dd>{trabalha}</dd>
                </div>
                <div>
                    <dt>Como chegar lá?</dt>
                    <dd>{caminho}</dd>
                </div>
            </dl>
        </article>
    );
}

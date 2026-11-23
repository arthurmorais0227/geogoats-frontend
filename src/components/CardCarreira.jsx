import styles from '@/app/carreiras/page.module.css';

export default function CardCarreira({ carreira, cor }) {
    const {
        nome,
        descricao,
        cursosRelacionados,
        habilidades,
        salarioMedio,
    } = carreira;

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
                {descricao && (
                    <div>
                        <dt>Descrição</dt>
                        <dd>{descricao}</dd>
                    </div>
                )}
                {cursosRelacionados?.length > 0 && (
                    <div>
                        <dt>Cursos relacionados</dt>
                        <dd>{cursosRelacionados.join(', ')}</dd>
                    </div>
                )}
                {habilidades?.length > 0 && (
                    <div>
                        <dt>Habilidades</dt>
                        <dd>{habilidades.join(', ')}</dd>
                    </div>
                )}
                {salarioMedio && (
                    <div>
                        <dt>Salário médio</dt>
                        <dd>{salarioMedio}</dd>
                    </div>
                )}
            </dl>
        </article>
    );
}

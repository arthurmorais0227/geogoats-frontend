import axios from 'axios';
import Image from 'next/image';
import { Dosis } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { climateCrisis } from '../fonts';
import styles from './estagio.module.css';

const dosis = Dosis({ subsets: ['latin'], weight: ['700', '800'] });

export const revalidate = 60;

export const metadata = {
    title: 'Estágios | GeoGoats',
    description: '',
};

const contornoNuvem =
    'M0 760V130a63 63 0 1 1 100 52a101 101 0 0 1 170 109a56 56 0 1 1 95 30a123 123 0 0 1 220 108a66 66 0 1 1 115 24a96 96 0 0 1 180 67a59 59 0 1 1 105 7a123 123 0 0 1 240 51a67 67 0 1 1 120-8a48 48 0 0 1 95 18a57 57 0 1 1 100-18a85 85 0 0 1 170 2a56 56 0 1 1 95-29a111 111 0 0 1 220-29a70 70 0 1 1 115-48a93 93 0 0 1 180-46a67 67 0 1 1 105-59a130 130 0 0 1 240-99a82 82 0 1 1 120-83a53 53 0 0 1 95-49V760Z';

function CamadaNuvens({ className }) {
    return (
        <div
            className={`${styles.camadaNuvens} ${className}`}
            aria-hidden="true"
        >
            <svg viewBox="0 0 2880 760" aria-hidden="true">
                <path d={contornoNuvem} />
            </svg>
            <span />
        </div>
    );
}

function obterUrlInscricao(valor) {
    if (typeof valor !== 'string' || !valor.trim()) {
        return null;
    }

    try {
        const url = new URL(valor);
        return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
    } catch {
        return null;
    }
}

function formatarData(data) {
    const dataPublicacao = new Date(data);

    if (Number.isNaN(dataPublicacao.getTime())) {
        return null;
    }

    return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'medium',
        timeZone: 'UTC',
    }).format(dataPublicacao);
}

export default async function EstagioPage() {
    let estagios = [];
    let carregamentoFalhou = false;

    try {
        if (!process.env.API_URL || !process.env.API_KEY) {
            throw new Error('Configure API_URL e API_KEY para carregar estágios.');
        }

        const resposta = await axios.get(`${process.env.API_URL}/estagios`, {
            headers: { 'x-api-key': process.env.API_KEY },
            timeout: 30000,
        });

        if (!Array.isArray(resposta.data)) {
            throw new Error('A API de estágios retornou um formato inesperado.');
        }

        estagios = resposta.data;
    } catch (error) {
        const nenhumEstagioEncontrado =
            axios.isAxiosError(error) &&
            error.response?.status === 400 &&
            error.response.data?.message === 'Nenhum registro encontrado.';

        if (!nenhumEstagioEncontrado) {
            console.error('Erro ao buscar estágios:', error.message);
            carregamentoFalhou = true;
        }
    }

    return (
        <>
            <header className={styles.hero}>
                <Navbar />
                <Image
                    src="/images/mascote-rua.png"
                    alt="nosso querido globinho andando na rua da cidade"
                    width={2560}
                    height={1441}
                    priority
                    unoptimized
                    className={styles.heroImage}
                />
                <div className={styles.heroContent}>
                    <h1 className={climateCrisis.className}>ESTÁGIOS</h1>
                </div>
                <CamadaNuvens className={styles.nuvensFundo} />
                <CamadaNuvens className={styles.nuvensFrente} />
            </header>

            <main className={styles.main}>
                <section className={styles.mural} aria-label="Mural de estágios">
                    <article className={`${styles.nota} ${styles.notaMissao}`}>
                        <span className={styles.tachinha} aria-hidden="true" />
                        <p className={styles.rotulo}>Missão Principal</p>
                        <h2>Missão: Descobrir o que é estágio</h2>
                        <Image
                            src="/images/mochila.png"
                            alt="Ilustração de uma mochila"
                            width={1080}
                            height={1080}
                            className={styles.mochila}
                        />
                        <p className={styles.legenda}>
                            Experiência de aprendizado no trabalho real, ligada ao teu curso.
                        </p>
                    </article>

                    <article className={`${styles.nota} ${styles.notaDireitos}`}>
                        <span className={styles.tachinha} aria-hidden="true" />
                        <h2>Missão: Conhecer teus direitos</h2>
                        <ul>
                            <li>Até 6h por dia / 30h semanais</li>
                            <li>Bolsa e auxílio transporte no estágio não obrigatório</li>
                            <li>Seguro contra acidentes. Recesso de 30 dias por ano</li>
                            <li>Supervisor e orientador</li>
                        </ul>
                    </article>

                    <div className={`${styles.nota} ${styles.notaAmarela}`}>
                        <span className={styles.tachinha} />
                        <h2>Missão: Explorar as áreas de atuação</h2>
                        <ul>
                            <li>Mapeamento, Cartografia e Geoprocessamento (SIG)</li>
                            <li>Licenciamento e consultoria ambiental</li>
                            <li>Planejamento urbano e defesa civil</li>
                            <li>Apoio pedagógico em escolas e cursinhos</li>
                        </ul>
                    </div>
                    <div className={`${styles.nota} ${styles.notaBranca}`}>
                        <span className={styles.tachinha} />
                        <h2>Missão: Conquistar a vaga</h2>
                        <ul>
                            <li>Pesquise sobre a empresa ou órgão público antes da entrevista</li>
                            <li>Mostre curiosidade e vontade de aprender na prática</li>
                            <li>Lembre-se: ninguém espera que você saiba tudo no primeiro dia!</li>
                        </ul>
                    </div>
                    <div className={`${styles.nota} ${styles.notaAzul}`}>
                        <span className={styles.tachinha} />
                        <h2>Missão: Preparar seu equipamento (Currículo)</h2>
                        <ul>
                            <li>Destaque seus projetos escolares e feiras de ciências</li>
                            <li>Liste conhecimentos em ferramentas digitais (Excel, Google Earth, QGIS)</li>
                            <li>Mostre interesse por atualidades, meio ambiente e trabalho em equipe</li>
                        </ul>
                    </div>
                    <div className={`${styles.nota} ${styles.notaLarga}`}>
                        <span className={styles.tachinha} />
                        <span className={`${styles.tachinha} ${styles.tachinhaInferior}`} />
                        <h2>Missão Final: Onde encontrar oportunidades?</h2>
                        <ul>
                            <li><strong>Agentes de Integração:</strong> CIEE, IEL, Nube e Super Estágios (cadastre seu perfil gratuitamente).</li>
                            <li><strong>Órgãos Públicos:</strong> Prefeituras, Secretarias de Meio Ambiente, IBGE e Defesa Civil.</li>
                            <li><strong>Setor Privado:</strong> Consultorias ambientais, empresas de geotecnologia, agronegócio e escolas.</li>
                            <li><strong>Dica extra:</strong> Fique de olho no mural da sua escola ou faculdade!</li>
                        </ul>
                    </div>

                </section>

                <aside className={styles.saudacao} aria-label="Dica sobre estágios">
                    <div className={styles.mascote}>
                        <Image
                            src="/images/mascote-pidao.webp"
                            alt="Mascote GeoGoats"
                            width={150}
                            height={150}
                            className={styles.mascoteImage}
                        />
                    </div>
                    <div className={`${styles.balao} ${dosis.className}`}>
                        O estágio é a sua primeira expedição no mercado de trabalho! Complete as
                        missões acima para preparar sua mochila e boa viagem!
                    </div>
                </aside>

                <section
                    className={styles.oportunidades}
                    aria-labelledby="oportunidades-title"
                >
                    <h2 id="oportunidades-title">Oportunidades de estágio</h2>

                    {carregamentoFalhou ? (
                        <p className={styles.mensagemEstagios} role="alert">
                            Não foi possível carregar as oportunidades agora.
                        </p>
                    ) : estagios.length === 0 ? (
                        <p className={styles.mensagemEstagios} role="status">
                            Nenhuma oportunidade de estágio disponível no momento.
                        </p>
                    ) : (
                        <div className={styles.estagiosGrid}>
                            {estagios.map((estagio) => {
                                const urlInscricao = obterUrlInscricao(
                                    estagio.urlInscricao,
                                );
                                const dataPublicacao = formatarData(
                                    estagio.dataPublicacao,
                                );

                                return (
                                    <article
                                        className={styles.estagioCard}
                                        key={estagio.id}
                                    >
                                        <h3>{estagio.titulo}</h3>
                                        {estagio.empresa && (
                                            <p>
                                                <strong>Empresa:</strong>{' '}
                                                {estagio.empresa}
                                            </p>
                                        )}
                                        <p>{estagio.descricao}</p>
                                        {Array.isArray(
                                            estagio.cursosRelacionados,
                                        ) &&
                                            estagio.cursosRelacionados.length >
                                                0 && (
                                                <p>
                                                    <strong>
                                                        Cursos relacionados:
                                                    </strong>{' '}
                                                    {estagio.cursosRelacionados.join(
                                                        ', ',
                                                    )}
                                                </p>
                                            )}
                                        {estagio.requisitos && (
                                            <p>
                                                <strong>Requisitos:</strong>{' '}
                                                {estagio.requisitos}
                                            </p>
                                        )}
                                        {dataPublicacao && (
                                            <p className={styles.dataPublicacao}>
                                                <time
                                                    dateTime={
                                                        estagio.dataPublicacao
                                                    }
                                                >
                                                    Publicado em{' '}
                                                    {dataPublicacao}
                                                </time>
                                            </p>
                                        )}
                                        {urlInscricao && (
                                            <a
                                                className={styles.linkInscricao}
                                                href={urlInscricao}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Inscreva-se
                                            </a>
                                        )}
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </section>
            </main>
        </>
    );
}

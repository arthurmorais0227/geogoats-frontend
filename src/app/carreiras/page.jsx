import { Dosis } from 'next/font/google';
import Image from 'next/image';
import CardCarreira from '@/components/CardCarreira';
import Navbar from '@/components/Navbar';
import TituloAnimado from '@/components/TituloAnimado';
import ScrollEffects from '@/components/ScrollEffects';
import { climateCrisis } from '../fonts';
import styles from './page.module.css';

const dosis = Dosis({ subsets: ['latin'], weight: ['700', '800'] });

const carreiras = [
    {
        nome: 'Geógrafo(a)',
        cor: '#83d2a3',
        faz: 'Estuda como pessoas, natureza e economia se organizam no espaço e ajuda a planejar o uso do território.',
        trabalha:
            'Prefeituras, órgãos públicos como o IBGE, consultorias e ONGs.',
        caminho: 'Graduação em Geografia (bacharelado), com registro no CREA.',
    },
    {
        nome: 'Cartógrafo(a)',
        cor: '#f1d05c',
        faz: 'Cria e atualiza mapas usando dados geográficos, imagens e tecnologias digitais.',
        trabalha:
            'Institutos de pesquisa, empresas de mapeamento e órgãos públicos.',
        caminho: 'Graduação em Geografia ou Engenharia Cartográfica.',
    },
    {
        nome: 'Professor(a) de Geografia',
        cor: '#ad89d2',
        faz: 'Ensina sobre o espaço geográfico, a sociedade, a natureza e suas relações.',
        trabalha:
            'Escolas públicas e particulares, cursos e projetos educativos.',
        caminho: 'Licenciatura em Geografia.',
    },
    {
        nome: 'Geólogo(a)',
        cor: '#dc9696',
        faz: 'Investiga a formação da Terra, as rochas, os minerais e os recursos naturais.',
        trabalha:
            'Mineradoras, órgãos ambientais, consultorias e centros de pesquisa.',
        caminho: 'Graduação em Geologia.',
    },
    {
        nome: 'Climatologista',
        cor: '#8cc4d5',
        faz: 'Analisa o clima e as mudanças nos padrões de temperatura e chuva.',
        trabalha:
            'Institutos de pesquisa, universidades e órgãos de monitoramento.',
        caminho: 'Formação em Geografia, Meteorologia ou áreas relacionadas.',
    },
    {
        nome: 'Urbanista',
        cor: '#83d2b2',
        faz: 'Planeja cidades e propõe soluções para mobilidade, moradia e espaços públicos.',
        trabalha: 'Prefeituras, escritórios de planejamento e consultorias.',
        caminho: 'Graduação em Arquitetura e Urbanismo ou áreas relacionadas.',
    },
    {
        nome: 'Analista ambiental',
        cor: '#d5b68f',
        faz: 'Avalia impactos ambientais e ajuda a cuidar dos recursos naturais.',
        trabalha:
            'Órgãos ambientais, empresas, parques e organizações sociais.',
        caminho: 'Formação em Geografia, Gestão Ambiental ou áreas afins.',
    },
    {
        nome: 'Meteorologista',
        cor: '#90a9d8',
        faz: 'Observa a atmosfera e prepara previsões do tempo e alertas climáticos.',
        trabalha:
            'Institutos de meteorologia, aeroportos, mídia e centros de pesquisa.',
        caminho: 'Graduação em Meteorologia.',
    },
    {
        nome: 'Geoprocessamento',
        cor: '#d589ba',
        faz: 'Organiza e analisa informações ligadas a lugares usando mapas digitais.',
        trabalha: 'Empresas de tecnologia, órgãos públicos e consultorias.',
        caminho:
            'Formação em Geografia, Geoprocessamento ou áreas relacionadas.',
    },
];

export default function Page() {
    return (
        <>
            <ScrollEffects />

            <header className={styles.hero}>
                <Navbar />
                <Image
                    src="/images/carreiraFundo.png"
                    alt=""
                    fill
                    priority
                    unoptimized
                    className={styles.heroImage}
                />
                <div className={styles.heroContent}>
                    <TituloAnimado className={climateCrisis.className}>
                        CARREIRAS
                    </TituloAnimado>
                </div>
            </header>

            <main className={styles.main}>
                <section className={styles.intro}>
                    <div className={styles.saudacao}>
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
                            Em dúvida sobre qual caminho seguir? Pega sua bússola e
                            vem conferir as carreiras!
                        </div>
                    </div>

                    <div className={styles.introText}>
                        <h2 className={dosis.className} data-revelar-texto="letras">
                            Profissões que usam Geografia
                        </h2>
                        <p data-revelar-texto="palavras">
                            Carreiras que envolvem a geografia!
                        </p>
                    </div>
                </section>

                <section
                    className={styles.careerSection}
                    aria-label="Carreiras que usam Geografia"
                >
                    <div className={styles.careerGridWrap}>
                        <div
                            className={`${styles.careerMascote} ${styles.careerMascoteLeft}`}
                            aria-hidden="true"
                        >
                            <Image
                                src="/images/mascote-feliz2.png"
                                alt=""
                                width={80}
                                height={80}
                            />
                        </div>
                        <div
                            className={styles.careerMascoteRight}
                            aria-hidden="true"
                        >
                            <Image
                                src="/images/mascote-duvida.png"
                                alt=""
                                width={80}
                                height={80}
                            />
                            <span>?</span>
                        </div>

                        <div className={styles.careerGrid}>
                            {carreiras.map((carreira) => (
                                <CardCarreira
                                    key={carreira.nome}
                                    carreira={carreira}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

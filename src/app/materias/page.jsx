import {
    Compass,
    Earth,
    Globe,
    Leaf,
    Map,
    Mountain,
    Users,
} from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import TituloAnimado from '@/components/TituloAnimado';
import ScrollEffects from '@/components/ScrollEffects';
import { climateCrisis } from '../fonts';
import styles from './materias.module.css';

export const metadata = {
    title: 'Matérias de Geografia | GeoGoats',
    description:
        'Explore as principais matérias da Geografia e descubra os temas de cada área.',
};

const materias = [
    {
        id: 'fisica',
        titulo: 'Geografia Física',
        descricao:
            'Estude os elementos naturais e os processos que transformam as paisagens do planeta.',
        assuntos: ['Relevo', 'Clima', 'Hidrografia', 'Biomas'],
        Icon: Mountain,
    },
    {
        id: 'humana',
        titulo: 'Geografia Humana',
        descricao:
            'Entenda como as sociedades ocupam, organizam e transformam os diferentes espaços.',
        assuntos: ['População', 'Cidades', 'Migrações', 'Cultura'],
        Icon: Users,
    },
    {
        id: 'cartografia',
        titulo: 'Cartografia',
        descricao:
            'Aprenda a representar e interpretar o espaço por meio de mapas e outras linguagens.',
        assuntos: ['Mapas', 'Escalas', 'Coordenadas', 'Projeções'],
        Icon: Map,
    },
    {
        id: 'geopolitica',
        titulo: 'Geopolítica',
        descricao:
            'Investigue as relações de poder, os territórios e as conexões entre países e regiões.',
        assuntos: ['Território', 'Fronteiras', 'Globalização', 'Conflitos'],
        Icon: Globe,
    },
    {
        id: 'economica',
        titulo: 'Geografia Econômica',
        descricao:
            'Conheça como a produção, o comércio e os transportes se distribuem pelo mundo.',
        assuntos: ['Agricultura', 'Indústria', 'Comércio', 'Transportes'],
        Icon: Compass,
    },
    {
        id: 'ambiental',
        titulo: 'Meio Ambiente',
        descricao:
            'Compreenda a relação entre as atividades humanas, os ecossistemas e a sustentabilidade.',
        assuntos: ['Ecossistemas', 'Conservação', 'Impactos', 'Sustentabilidade'],
        Icon: Leaf,
    },
    {
        id: 'astronomia',
        titulo: 'Geografia e Astronomia',
        descricao:
            'Explore a Terra no espaço e os movimentos que influenciam os ritmos do nosso planeta.',
        assuntos: ['Sistema Solar', 'Rotação', 'Translação', 'Fusos horários'],
        Icon: Earth,
    },
];

export default function MateriasPage() {
    return (
        <>
            <ScrollEffects />

            <header className={styles.hero}>
                <Navbar />
                <Image
                    src="/images/materias-hero.png"
                    alt=""
                    fill
                    priority
                    unoptimized
                    sizes="100vw"
                    className={styles.heroImage}
                />
                <div className={styles.heroContent}>
                    <TituloAnimado className={climateCrisis.className}>
                        MATÉRIAS
                    </TituloAnimado>
                </div>
            </header>

            <main className={styles.main}>
                <svg
                    className={styles.agua}
                    viewBox="0 0 1440 200"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <path fill="#77ebc8" d="M0 0Q720 190 1440 0V200H0Z" />
                    <path fill="#acf4d9" d="M0 4Q720 266 1440 4V200H0Z" />
                    <path fill="#d6fad9" d="M0 7Q720 329 1440 7V200H0Z" />
                    <path style={{ fill: 'var(--fundo)' }} d="M0 10Q720 386 1440 10V200H0Z" />
                </svg>
                <section
                    className={styles.section}
                    aria-labelledby="materias-title"
                >
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionEyebrow}>
                            Conhecimento em cada caminho
                        </span>
                        <h2 id="materias-title" data-revelar-texto="letras">
                            O que você quer explorar?
                        </h2>
                        <p data-revelar-texto="palavras">
                            Navegue pelas principais áreas e encontre os
                            assuntos que conectam natureza, sociedade e espaço.
                        </p>
                    </div>

                    <div className={styles.cards}>
                        {materias.map(
                            ({ id, titulo, descricao, assuntos, Icon }) => (
                                <article
                                    className={styles.card}
                                    key={id}
                                    data-revelar
                                >
                                    <span className={styles.cardIcon}>
                                        <Icon size={28} aria-hidden="true" />
                                    </span>
                                    <h3>{titulo}</h3>
                                    <p>{descricao}</p>
                                    <ul
                                        className={styles.topics}
                                        aria-label={`Assuntos de ${titulo}`}
                                    >
                                        {assuntos.map((assunto) => (
                                            <li key={assunto}>{assunto}</li>
                                        ))}
                                    </ul>
                                </article>
                            ),
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}

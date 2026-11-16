import {
    Compass,
    Earth,
    Globe,
    Leaf,
    Map,
    Mountain,
    Users,
} from 'lucide-react';
import { Dosis } from 'next/font/google';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import ScrollEffects from '@/components/ScrollEffects';
import styles from './materias.module.css';

const dosis = Dosis({ subsets: ['latin'], weight: ['700', '800'] });

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
                    <span className={styles.heroEyebrow}>Explore e aprenda</span>
                    <h1 className={dosis.className}>Matérias de Geografia</h1>
                </div>
            </header>

            <main className={styles.main}>
                <section
                    className={styles.section}
                    aria-labelledby="materias-title"
                >
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionEyebrow}>
                            Conhecimento em cada caminho
                        </span>
                        <h2 id="materias-title">O que você quer explorar?</h2>
                        <p>
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

            <footer className={styles.footer}>
                <p>GeoGoats &copy; {new Date().getFullYear()}</p>
                <p>Aprender Geografia é descobrir o mundo.</p>
            </footer>
        </>
    );
}

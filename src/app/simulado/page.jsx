'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Compass, Earth, Map } from 'lucide-react';
import CardSimulado from '@/components/CardSimulado';
import Navbar from '@/components/Navbar';
import styles from './simulado.module.css';

const TEMAS_GEOGRAFIA = [
    {
        slug: 'geografia-agraria',
        nome: 'Geografia Agrária',
        descricao:
            'Estrutura fundiária, agricultura familiar, agronegócio e conflitos no campo.',
    },
    {
        slug: 'questoes-ambientais-biomas',
        nome: 'Questões Ambientais e Biomas Brasileiros',
        descricao:
            'Problemas ambientais, mudanças climáticas, desmatamento, sustentabilidade e biomas.',
    },
    {
        slug: 'urbanizacao',
        nome: 'Urbanização e Dinâmicas Urbanas',
        descricao:
            'Crescimento das cidades, rede urbana, metropolização e desafios urbanos.',
    },
    {
        slug: 'globalizacao',
        nome: 'Globalização e Geografia Econômica',
        descricao:
            'Fluxos globais, empresas transnacionais e divisão internacional do trabalho.',
    },
    {
        slug: 'demografia-migracoes',
        nome: 'Demografia e Migrações',
        descricao:
            'Crescimento populacional, transição demográfica e deslocamentos populacionais.',
    },
    {
        slug: 'cartografia',
        nome: 'Cartografia',
        descricao:
            'Leitura de mapas, escalas, coordenadas geográficas e projeções cartográficas.',
    },
    {
        slug: 'clima',
        nome: 'Clima, Tempo e Massas de Ar',
        descricao:
            'Elementos e fatores do clima e atuação das massas de ar.',
    },
    {
        slug: 'relevo',
        nome: 'Relevo e Agentes Modeladores',
        descricao:
            'Formas de relevo e ação dos agentes internos e externos.',
    },
    {
        slug: 'geopolitica',
        nome: 'Geopolítica e Organização Mundial',
        descricao:
            'Relações de poder, conflitos territoriais e organizações internacionais.',
    },
];

export default function SimuladoPage() {
    const router = useRouter();
    const [termoBusca, setTermoBusca] = useState('');
    const [simuladoSelecionado, setSimuladoSelecionado] = useState(null);

    const temasFiltrados = TEMAS_GEOGRAFIA.filter((tema) =>
        tema.nome.toLocaleLowerCase('pt-BR').includes(
            termoBusca.trim().toLocaleLowerCase('pt-BR'),
        ),
    );

    const iniciarSimulado = () => {
        if (!simuladoSelecionado?.questoesRaw?.length) return;
        sessionStorage.setItem(
            'simuladoSelecionado',
            JSON.stringify(simuladoSelecionado),
        );
        router.push('/simulado/exame');
    };

    return (
        <main className={styles.pagina}>
            <header className={styles.hero}>
                <Navbar />
                <div className={styles.heroDecoracao} aria-hidden="true">
                    <span className={styles.formaGlobo} />
                    <span className={styles.formaContorno} />
                </div>
                <div className={styles.heroConteudo}>
                    <span className={styles.pilula}>
                        <Compass size={15} aria-hidden="true" />
                        Geografia em prática
                    </span>
                    <h1 className={styles.titulo}>
                        Explore o mundo.
                        <br />
                        <span>Teste seus conhecimentos.</span>
                    </h1>
                    <p className={styles.subtitulo}>
                        Escolha um tema de Geografia e prepare-se para o próximo desafio.
                    </p>
                    <label className={styles.searchWrapper}>
                        <Map size={19} aria-hidden="true" />
                        <input
                            type="search"
                            value={termoBusca}
                            onChange={(evento) => setTermoBusca(evento.target.value)}
                            placeholder="Buscar um tema de Geografia"
                            className={styles.searchInput}
                            aria-label="Buscar tema de Geografia"
                        />
                    </label>
                </div>
                <div className={styles.heroSelo} aria-hidden="true">
                    <Earth size={21} />
                    <span>GeoGoats</span>
                </div>
            </header>

            <section
                className={`${styles.conteudo} ${simuladoSelecionado ? styles.comDetalhes : ''}`}
                aria-labelledby="temas-titulo"
            >
                <div className={styles.sectionHeader}>
                    <div>
                        <span className={styles.sectionEyebrow}>Aprenda explorando</span>
                        <h2 id="temas-titulo">Simulados por tema</h2>
                        <p>
                            Carregue questões específicas de cada conteúdo de Geografia.
                        </p>
                    </div>
                    <span className={styles.contagemTemas}>
                        {temasFiltrados.length}{' '}
                        {temasFiltrados.length === 1 ? 'tema' : 'temas'}
                    </span>
                </div>

                <div className={styles.resultados}>
                    <div className={styles.cards}>
                        {temasFiltrados.length === 0 ? (
                            <p className={styles.noResults}>
                                Nenhum tema de Geografia encontrado.
                            </p>
                        ) : (
                            temasFiltrados.map((tema) => (
                                <CardSimulado
                                    key={tema.slug}
                                    tema={tema}
                                    selecionado={simuladoSelecionado?.slug === tema.slug}
                                    onSelect={setSimuladoSelecionado}
                                />
                            ))
                        )}
                    </div>

                    {simuladoSelecionado && (
                        <aside className={styles.detailsPanel} aria-live="polite">
                            <div className={styles.detailsCard}>
                                <span className={styles.detailsIcone}>
                                    <Earth size={26} aria-hidden="true" />
                                </span>
                                <span className={styles.detailsLabel}>Tema selecionado</span>
                                <h3 className={styles.detailsTitle}>
                                    {simuladoSelecionado.titulo}
                                </h3>
                                <p className={styles.detailsInfo}>
                                    {simuladoSelecionado.quantidade === 0
                                        ? 'Ainda não há questões disponíveis para este conteúdo.'
                                        : `${simuladoSelecionado.quantidade} ${
                                              simuladoSelecionado.quantidade === 1
                                                  ? 'questão disponível'
                                                  : 'questões disponíveis'
                                          }`}
                                </p>
                                <button
                                    className={styles.startButton}
                                    type="button"
                                    onClick={iniciarSimulado}
                                    disabled={simuladoSelecionado.quantidade === 0}
                                    aria-label={`Iniciar simulado de ${simuladoSelecionado.titulo}`}
                                >
                                    Iniciar simulado <span aria-hidden="true">→</span>
                                </button>
                            </div>
                        </aside>
                    )}
                </div>
            </section>
        </main>
    );
}

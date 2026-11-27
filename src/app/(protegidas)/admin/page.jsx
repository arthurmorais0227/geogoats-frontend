import { currentUser } from '@clerk/nextjs/server';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { climateCrisis } from '@/app/fonts';
import Navbar from '@/components/Navbar';
import PainelNoticias from '@/components/PainelNoticias';
import styles from '@/components/PainelNoticias.module.css';

export const metadata = { title: 'Painel admin | GeoGoats' };

export default async function Admin() {
    const user = await currentUser();
    // confere de novo aqui (o proxy sozinho não basta)
    if (user?.publicMetadata?.role !== 'admin') redirect('/');

    let noticias = [];
    let erro = '';

    try {
        const resp = await axios.get(`${process.env.API_URL}/noticias`, {
            headers: { 'x-api-key': process.env.API_KEY },
            timeout: 30000,
        });
        noticias = Array.isArray(resp.data) ? resp.data : [];
    } catch (error) {
        console.error('Erro ao buscar notícias:', error.message);
        erro = 'Não foi possível carregar as notícias. Atualize a página para tentar de novo.';
    }

    return (
        <div className={styles.pagina}>
            <header className={styles.hero}>
                <Navbar />
                <div className={styles.heroContent}>
                    <span className={styles.selo}>Painel administrativo</span>
                    <h1 className={climateCrisis.className}>NOTÍCIAS</h1>
                    <p>
                        Olá, {user.firstName ?? 'admin'}! Cadastre, edite e exclua as notícias do
                        portal.
                    </p>
                </div>
            </header>

            <main className={styles.conteudo}>
                {erro ? <p className={styles.erro}>{erro}</p> : <PainelNoticias noticias={noticias} />}
            </main>
        </div>
    );
}
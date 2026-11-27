import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Toaster } from 'react-hot-toast';
import Footer from '@/components/Footer';
import styles from '@/components/Footer.module.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ptBR } from '@clerk/localizations';

export const metadata = {
    title: 'GeoGoats',
    description: 'Sistema para geográfos e estudantes',
    icons: {
        icon: '/images/icon.png',
    },
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider localization={ptBR}>
            <html lang="pt-BR">
                <body className="min-h-screen antialiased">
                    <AntdRegistry>
                        <div className={styles.layout}>
                            <div className={styles.content}>{children}</div>
                            <Footer />
                        </div>
                    </AntdRegistry>
                    <Toaster />
                </body>
            </html>
        </ClerkProvider>
    );
}
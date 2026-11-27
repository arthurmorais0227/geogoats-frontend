import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';
import styles from '../../auth.module.css';

export default function Login() {
    return (
        <main className={styles.tela}>
            <Image
                src="/images/logo.png"
                alt="GeoGoats"
                width={572}
                height={572}
                className={styles.logo}
                priority
            />
            <SignIn />
        </main>
    );
}
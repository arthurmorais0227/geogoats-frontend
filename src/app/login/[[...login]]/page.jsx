import { SignIn } from '@clerk/nextjs';
import TelaAuth from '@/components/TelaAuth';
import { aparenciaAuth } from '@/lib/aparenciaAuth';

export default function Login() {
    return (
        <TelaAuth
            titulo="Bem-vindo de volta!"
            subtitulo="Cada canto do planeta guarda uma descoberta. Sua próxima jornada começa aqui."
        >
            <SignIn appearance={aparenciaAuth} />
        </TelaAuth>
    );
}

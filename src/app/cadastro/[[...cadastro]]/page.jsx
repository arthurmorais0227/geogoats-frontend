import { SignUp } from '@clerk/nextjs';
import TelaAuth from '@/components/TelaAuth';
import { aparenciaAuth } from '@/lib/aparenciaAuth';

export default function Cadastro() {
    return (
        <TelaAuth
            titulo="Crie sua conta"
            subtitulo="Mapas, notícias, simulados e carreiras de Geografia em um só lugar."
        >
            <SignUp appearance={aparenciaAuth} />
        </TelaAuth>
    );
}

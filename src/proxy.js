import { clerkClient, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { ACESSO } from '@lib/acesso';
import { NextResponse } from 'next/server';

// páginas que podem ser abertas sem login
const rotaPublica = createRouteMatcher(['/login(.*)', '/cadastro(.*)']);

export default clerkMiddleware(async (auth, req) => {
    if (rotaPublica(req)) return;

    const { userId } = await auth();

    // sem login → tela de login
    if (!userId) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // rotas com papel (ex.: /admin)
    const rota = req.nextUrl.pathname.split('/')[1];
    if (!Object.hasOwn(ACESSO, rota)) return;

    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    if (!ACESSO[rota].includes(user.publicMetadata.role)) {
        return NextResponse.redirect(new URL('/', req.url));
    }
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
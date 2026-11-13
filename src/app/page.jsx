export default function Home() {
    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-start bg-[image:linear-gradient(to_bottom,rgba(10,15,30,0.35),rgba(10,15,30,0.5)),url('https://minio.codeverse.dev.br/mural/1785759396834-148tgv.jpeg')] bg-cover bg-center bg-no-repeat px-6 py-8 text-center font-sans">
            <div className="mt-60 flex flex-col items-center">
                <h1 className="m-0 bg-[linear-gradient(135deg,#a5b4fc_0%,#38bdf8_100%)] bg-clip-text text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold tracking-[-0.02em] text-transparent">
                    Codeverse
                </h1>
                <p className="mt-1 text-[clamp(1rem,2.5vw,1.4rem)] font-normal tracking-[0.15em] text-slate-300 uppercase">
                    Explore. Aprenda. Colabore.
                </p>

                <a
                    href="https://codeverse.dev.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-[0.6rem] rounded-full bg-[linear-gradient(135deg,#a5b4fc_0%,#38bdf8_100%)] px-9 py-[0.85rem] font-bold text-[#0a0f1e] no-underline transition-[transform,box-shadow] duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(56,189,248,0.35)]">
                    <svg
                        className="h-[25px] w-[25px] animate-[spin_6s_linear_infinite]"
                        viewBox="-11.5 -10.23174 23 20.46348"
                        width="25"
                        height="25"
                        aria-hidden="true">
                        <circle r="2.05" fill="currentColor" />
                        <g stroke="currentColor" strokeWidth="1" fill="none">
                            <ellipse rx="11" ry="4.2" />
                            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                        </g>
                    </svg>
                    Ver material tutorial
                </a>

                <p className="mt-4 text-[0.85rem] tracking-[0.1em] text-slate-400 uppercase">
                    Scaffolding oficial - Codeverse
                </p>
            </div>

            <footer className="text-[0.85rem] text-slate-400/60">
                <p>Pouco pra quem vê..., muito pra quem aprende.</p>
            </footer>
        </main>
    );
}

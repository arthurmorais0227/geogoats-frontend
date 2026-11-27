// Visual dos formulários do Clerk (login e cadastro) no estilo GeoGoats
const verde = '#1f8f4e';

export const aparenciaAuth = {
    variables: {
        colorPrimary: verde,
        borderRadius: '0.75rem',
        fontSize: '0.95rem',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    elements: {
        rootBox: { width: '100%' },
        cardBox: { width: '100%', boxShadow: 'none', border: 'none', borderRadius: 0 },
        card: { boxShadow: 'none', border: 'none', padding: 0, background: 'transparent' },
        header: { display: 'none' },

        // e-mail/senha em cima, Google embaixo
        main: {
            paddin: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            marginTop: '1.5rem',
            padding: '1rem',
        },
        form: { order: 0 },
        dividerRow: { order: 1 },
        socialButtons: { order: 2 },

        formFieldLabel: { color: '#0f2a1c', fontWeight: 600 },
        formFieldInput: {
            height: '3rem',
            backgroundColor: '#f6faf7',
            border: '1px solid #dbe7df',
            boxShadow: 'none',
            '&:focus': {
                backgroundColor: '#ffffff',
                borderColor: verde,
                boxShadow: '0 0 0 3px rgba(31, 143, 78, 0.15)',
            },
        },
        formFieldAction: { color: verde, fontWeight: 600 },
        formButtonPrimary: {
            height: '3rem',
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'none',
            backgroundColor: verde,
            backgroundImage: 'none',
            boxShadow: '0 8px 20px rgba(31, 143, 78, 0.25)',
            '&:hover': { backgroundColor: '#187a42' },
        },
        dividerLine: { backgroundColor: '#e3ece6' },
        dividerText: { color: '#8a9a91' },
        socialButtonsBlockButton: {
            height: '3rem',
            backgroundColor: '#ffffff',
            border: '1px solid #dbe7df',
            boxShadow: 'none',
            overflow: 'visible',
            '&:hover': { backgroundColor: '#f6faf7' },
        },
        socialButtonsBlockButtonText: { color: '#0f2a1c', fontWeight: 600 },

        footer: { background: 'transparent', boxShadow: 'none', borderTop: 'none' },
        footerAction: { justifyContent: 'center', background: 'transparent' },
        footerActionText: { color: '#5b6b63' },
        footerActionLink: { color: verde, fontWeight: 700 },
    },
};
function NoUser() {
    const handleRedirect = () => {
        window.location.href = '/';
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <h1>You are not logged in!</h1>
            <button
                onClick={handleRedirect}
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Go to home
            </button>
        </div>
    );
}

export default NoUser;

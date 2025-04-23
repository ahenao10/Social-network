function AuthModal({ setOpenAuthLoginModal }){
    return (
        <div id='auth-modal'>
            <h1>Usuario y/o contraseña incorrectos</h1>
            <p>Por favor, verifica tus credenciales e intenta nuevamente.</p>
            <button onClick={() => setOpenAuthLoginModal(false)}>Cerrar</button>
        </div>
    )
}

export default AuthModal;
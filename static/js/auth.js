// static/js/auth.js

// Sistema de autenticación (SOLO UI, backend es Flask)
document.addEventListener('DOMContentLoaded', function() {
    inicializarAuth();
});

function inicializarAuth() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const registerLink = document.getElementById('registerLink');
    const modal = document.getElementById('registerModal');
    const modalClose = document.getElementById('modalClose');
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    const registerPassword = document.getElementById('registerPassword');

    // Mostrar/ocultar contraseña
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Abrir modal de registro
    if (registerLink && modal) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('active');
        });
    }

    // Cerrar modal
    if (modalClose && modal) {
        modalClose.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }

    // Cerrar modal al hacer click fuera
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Validar fuerza de contraseña
    if (registerPassword) {
        registerPassword.addEventListener('input', function() {
            validarFuerzaPassword(this.value);
        });
    }

    // LOGIN:
    // No tocamos el submit, dejamos que Flask reciba el POST.
    // if (loginForm) { ... }  -> No hacemos nada aquí.

    // REGISTRO:
    // Aquí solo validamos, y si algo está mal, bloqueamos el submit.
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const acceptTerms = document.getElementById('acceptTerms').checked;

            // Validaciones básicas
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                e.preventDefault();
                mostrarAlerta('Por favor, completa todos los campos', 'warning');
                return;
            }

            if (!validarEmail(email)) {
                e.preventDefault();
                mostrarAlerta('Por favor, ingresa un email válido', 'warning');
                return;
            }

            if (password !== confirmPassword) {
                e.preventDefault();
                mostrarAlerta('Las contraseñas no coinciden', 'warning');
                return;
            }

            if (!acceptTerms) {
                e.preventDefault();
                mostrarAlerta('Debes aceptar los términos y condiciones', 'warning');
                return;
            }

            // Si todo está OK, NO hacemos preventDefault.
            // El formulario se envía al backend Flask (POST /new-user).
        });
    }
}

function validarFuerzaPassword(password) {
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    if (!strengthBar || !strengthText) return;

    let strength = 0;

    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
    if (password.match(/\d/)) strength += 25;
    if (password.match(/[^a-zA-Z\d]/)) strength += 25;

    strengthBar.style.setProperty('--width', strength + '%');
    
    if (strength < 50) {
        strengthBar.style.backgroundColor = '#ff4757';
        strengthText.textContent = 'Contraseña débil';
        strengthText.style.color = '#ff4757';
    } else if (strength < 75) {
        strengthBar.style.backgroundColor = '#ffa502';
        strengthText.textContent = 'Contraseña media';
        strengthText.style.color = '#ffa502';
    } else {
        strengthBar.style.backgroundColor = '#2ed573';
        strengthText.textContent = 'Contraseña fuerte';
        strengthText.style.color = '#2ed573';
    }
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function mostrarAlerta(mensaje, tipo = 'info') {
    const alerta = document.createElement('div');
    alerta.className = `alerta alerta-${tipo}`;
    alerta.innerHTML = `
        <span>${mensaje}</span>
        <button class="alerta-cerrar">&times;</button>
    `;
    
    alerta.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 24px rgba(0,0,0,.35);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 500px;
        animation: slideIn 0.3s ease-out;
        color: white;
        font-weight: 500;
    `;
    
    if (tipo === 'warning') {
        alerta.style.backgroundColor = '#ff9800';
    } else if (tipo === 'error') {
        alerta.style.backgroundColor = '#f44336';
    } else if (tipo === 'success') {
        alerta.style.backgroundColor = '#4caf50';
    } else {
        alerta.style.backgroundColor = '#2196f3';
    }
    
    const cerrarBtn = alerta.querySelector('.alerta-cerrar');
    cerrarBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 15px;
    `;
    
    cerrarBtn.addEventListener('click', function() {
        alerta.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (alerta.parentNode) {
                alerta.parentNode.removeChild(alerta);
            }
        }, 300);
    });
    
    setTimeout(() => {
        if (alerta.parentNode) {
            alerta.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (alerta.parentNode) {
                    alerta.parentNode.removeChild(alerta);
                }
            }, 300);
        }
    }, 5000);
    
    document.body.appendChild(alerta);
    
    if (!document.querySelector('#estilos-alerta')) {
        const estilos = document.createElement('style');
        estilos.id = 'estilos-alerta';
        estilos.innerHTML = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(estilos);
    }
}

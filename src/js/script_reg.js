document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('.register-form');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const termsCheckbox = document.getElementById('terms');

    const togglePasswordVisibility = (input) => {
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
    };

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const name = document.getElementById('name').value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        const gender = document.querySelector('input[name="gender"]:checked')?.value;
        const termsAccepted = termsCheckbox.checked;

        let isValid = true;

        if (!email) {
            showError('email', 'Пожалуйста, введите email');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('email', 'Введите корректный email');
            isValid = false;
        } else {
            clearError('email');
        }

        if (!name) {
            showError('name', 'Пожалуйста, введите имя');
            isValid = false;
        } else if (name.length < 2) {
            showError('name', 'Имя слишком короткое');
            isValid = false;
        } else {
            clearError('name');
        }

        if (!password) {
            showError('password', 'Введите пароль');
            isValid = false;
        } else if (password.length < 6) {
            showError('password', 'Пароль должен быть не менее 6 символов');
            isValid = false;
        } else {
            clearError('password');
        }

        if (!confirmPassword) {
            showError('confirm-password', 'Подтвердите пароль');
            isValid = false;
        } else if (password !== confirmPassword) {
            showError('confirm-password', 'Пароли не совпадают');
            isValid = false;
        } else {
            clearError('confirm-password');
        }

        if (!gender) {
            showError('gender', 'Укажите ваш пол');
            isValid = false;
        } else {
            clearError('gender');
        }

        if (!termsAccepted) {
            showError('terms', 'Необходимо принять условия');
            isValid = false;
        } else {
            clearError('terms');
        }

        if (isValid) {
            showAlert('Регистрация прошла успешно!', 'success');
            
            registerForm.reset();
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-group') || field.closest('.terms');
        
        const oldError = formGroup.querySelector('.error-message');
        if (oldError) oldError.remove();
        
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        error.style.color = '#ff4444';
        error.style.fontSize = '0.8rem';
        error.style.marginTop = '5px';
        
        formGroup.appendChild(error);
        
        field.style.borderColor = '#ff4444';
    }

    function clearError(fieldId) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-group') || field.closest('.terms');
        
        const error = formGroup.querySelector('.error-message');
        if (error) error.remove();
        
        field.style.borderColor = '';
    }

    function showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `alert ${type}`;
        alert.textContent = message;
        
        alert.style.position = 'fixed';
        alert.style.top = '20px';
        alert.style.right = '20px';
        alert.style.padding = '15px 25px';
        alert.style.backgroundColor = type === 'error' ? '#ff4444' : '#4CAF50';
        alert.style.color = 'white';
        alert.style.borderRadius = '5px';
        alert.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
        alert.style.zIndex = '1001';
        alert.style.animation = 'fadeIn 0.3s ease-out';
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(alert);
            }, 300);
        }, 5000);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(style);

    confirmPasswordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const confirmPassword = this.value;
        
        if (confirmPassword && password !== confirmPassword) {
            showError('confirm-password', 'Пароли не совпадают');
        } else if (confirmPassword) {
            clearError('confirm-password');
        }
    });
});
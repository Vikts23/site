document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        
        if (!email || !password) {
            showAlert('Пожалуйста, заполните все поля', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showAlert('Пожалуйста, введите корректный email', 'error');
            return;
        }
        
        if (password.length < 6) {
            showAlert('Пароль должен содержать минимум 6 символов', 'error');
            return;
        }
        
        showAlert('Вы успешно вошли в систему!', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
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
});
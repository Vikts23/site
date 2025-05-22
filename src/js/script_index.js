document.addEventListener('DOMContentLoaded', function() {
    // Обработка кликов по карточкам статей
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Проверяем, не был ли клик по ссылке "Читать далее"
            if (!e.target.classList.contains('read-more')) {
                const link = this.getAttribute('data-link');
                if (link) {
                    window.location.href = link;
                }
            }
        });
    });

    // Обработка кликов по элементам галереи
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const link = this.getAttribute('data-link');
            if (link) {
                window.location.href = link;
            }
        });
    });

    // Обработка формы вопроса
    const questionForm = document.getElementById('question-form');
    if (questionForm) {
        questionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем значения полей
            const email = document.getElementById('email').value.trim();
            const question = document.getElementById('question').value.trim();
            
            // Валидация
            if (!email || !question) {
                showAlert('Пожалуйста, заполните все поля', 'error');
                return;
            }
            
            // Проверка email (простая валидация)
            if (!validateEmail(email)) {
                showAlert('Пожалуйста, введите корректный email', 'error');
                return;
            }
            
            // Здесь должна быть отправка формы на сервер
            // Для демонстрации используем setTimeout
            showAlert('Ваш вопрос обрабатывается. Скоро мы с вами свяжемся', 'success');
            this.reset();
        });
    }

    // Функция для показа уведомлений
    function showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `alert ${type}`;
        alert.textContent = message;
        
        // Стили для уведомления
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
        
        // Автоматическое скрытие через 5 секунд
        setTimeout(() => {
            alert.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(alert);
            }, 300);
        }, 5000);
    }

    // Функция для проверки email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Добавляем стили для анимаций
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
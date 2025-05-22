document.addEventListener('DOMContentLoaded', function() {

    const addPointForm = document.querySelector('.add-point-form');
    const addPointBtn = document.getElementById('addPointBtn');
    const photoInput = document.getElementById('photo');
    const photoPreview = document.getElementById('photoPreview');
    const pointsList = document.getElementById('pointsList');

    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                photoPreview.innerHTML = '';
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '200px';
                img.style.maxHeight = '200px';
                photoPreview.appendChild(img);
            }
            
            reader.readAsDataURL(file);
        }
    });

    addPointBtn.addEventListener('click', function() {
        const country = document.getElementById('country').value;
        const region = document.getElementById('region').value.trim();
        const city = document.getElementById('city').value.trim();
        const price = document.getElementById('price').value.trim();
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value.trim();
        const photoFile = photoInput.files[0];

        if (!country || !region || !city || !category || !description) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }

        const pointItem = document.createElement('div');
        pointItem.className = 'point-item';
        
        pointItem.innerHTML = `
            <div class="point-info">
                <h3>${getCategoryName(category)} (${city})</h3>
                <p>${getCountryName(country)}, ${region}, ${city}</p>
                <p>Категория: ${getCategoryName(category)}</p>
                <p>Цена: ${price || 'Бесплатно'}</p>
                <p class="description">${description}</p>
            </div>
            <div class="point-image">
                ${photoFile ? `<img src="${URL.createObjectURL(photoFile)}" alt="${city}">` : ''}
            </div>
            <div class="point-actions">
                <button class="btn-edit">Редактировать</button>
                <button class="btn-delete">Удалить</button>
            </div>
        `;

        pointsList.prepend(pointItem);

        addPointForm.reset();
        photoPreview.innerHTML = '';

        addPointEventListeners(pointItem);

        alert('Точка успешно добавлена!');
    });

    function addPointEventListeners(pointItem) {
        pointItem.querySelector('.btn-edit').addEventListener('click', function() {
            alert('Функция редактирования в разработке');
        });

        pointItem.querySelector('.btn-delete').addEventListener('click', function() {
            if (confirm('Вы уверены, что хотите удалить эту точку?')) {
                pointItem.remove();
                alert('Точка удалена');
            }
        });
    }

    function getCountryName(code) {
        const countries = {
            'ru': 'Россия',
            'us': 'США',
            'fr': 'Франция',
            'it': 'Италия'
        };
        return countries[code] || code;
    }

    function getCategoryName(code) {
        const categories = {
            'waterfall': 'Водопад',
            'museum': 'Музей',
            'eco-trail': 'Эко-тропа',
            'lake': 'Озеро',
            'river': 'Река'
        };
        return categories[code] || code;
    }

    document.querySelectorAll('.point-item').forEach(item => {
        addPointEventListeners(item);
    });

    /*document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', function() {
            const pointTitle = this.closest('.other-point-item').querySelector('h3').textContent;
            alert(`Подробная информация о точке "${pointTitle}" будет здесь`);
        });
    });*/
});
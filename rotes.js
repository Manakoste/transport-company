document.addEventListener('DOMContentLoaded', function() {
    // Инициализация карты
    const map = L.map('map').setView([55.751244, 37.618423], 5); // Центр на Москве
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Загрузка данных о направлениях
    fetch('../data/routes.json')
        .then(response => response.json())
        .then(routes => {
            displayRoutes(routes);
            addMarkersToMap(routes);
        })
        .catch(error => console.error('Ошибка загрузки данных:', error));
    
    // Отображение списка направлений
    function displayRoutes(routes) {
        const routesContainer = document.getElementById('routesContainer');
        routesContainer.innerHTML = '';
        
        routes.forEach(route => {
            const routeCard = document.createElement('div');
            routeCard.className = 'route-card';
            routeCard.innerHTML = `
                <h4>${route.from} → ${route.to}</h4>
                <div class="route-details">
                    <div class="route-detail">
                        <span>Расстояние:</span>
                        <span>${route.distance} км</span>
                    </div>
                    <div class="route-detail">
                        <span>Время в пути:</span>
                        <span>${route.time}</span>
                    </div>
                    <div class="route-detail">
                        <span>Стоимость:</span>
                        <span>${route.price}</span>
                    </div>
                </div>
            `;
            routesContainer.appendChild(routeCard);
        });
    }
    
    // Добавление маркеров на карту
    function addMarkersToMap(routes) {
        // Координаты городов (упрощённо)
        const cities = {
            "Москва": [55.751244, 37.618423],
            "Санкт-Петербург": [59.934280, 30.335098],
            "Ростов-на-Дону": [47.222531, 39.718705],
            "Екатеринбург": [56.838011, 60.597465],
            "Новосибирск": [55.008355, 82.935732],
            "Мурманск": [68.969562, 33.074541]
        };
        
        // Добавляем маркеры для городов
        Object.keys(cities).forEach(city => {
            L.marker(cities[city]).addTo(map)
                .bindPopup(city)
                .openPopup();
        });
        
        // Добавляем линии маршрутов
        routes.forEach(route => {
            if (cities[route.from] && cities[route.to]) {
                L.polyline([cities[route.from], cities[route.to]], {
                    color: route.popularity === 'high' ? 'red' : route.popularity === 'medium' ? 'orange' : 'blue',
                    weight: 3
                }).addTo(map);
            }
        });
    }
});
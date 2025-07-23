document.addEventListener('DOMContentLoaded', function() {
    // Загрузка данных о транспорте
    fetch('../data/vehicles.json')
        .then(response => response.json())
        .then(vehicles => {
            displayVehicles(vehicles);
            setupFilters(vehicles);
        })
        .catch(error => console.error('Ошибка загрузки данных:', error));

    // Отображение транспорта
    function displayVehicles(vehicles) {
        const vehicleList = document.getElementById('vehicleList');
        vehicleList.innerHTML = '';

        vehicles.forEach(vehicle => {
            const vehicleCard = document.createElement('div');
            vehicleCard.className = `vehicle-card ${vehicle.type}`;
            vehicleCard.innerHTML = `
                <div class="vehicle-image" style="background-image: url('../images/${vehicle.image}')"></div>
                <div class="vehicle-info">
                    <h3>${vehicle.name}</h3>
                    <p>${vehicle.description}</p>
                    <div class="vehicle-specs">
                        <div class="vehicle-spec">
                            <i class="fas fa-weight-hanging"></i>
                            <p>${vehicle.capacity} кг</p>
                        </div>
                        <div class="vehicle-spec">
                            <i class="fas fa-boxes"></i>
                            <p>${vehicle.volume} м³</p>
                        </div>
                        ${vehicle.range ? `
                        <div class="vehicle-spec">
                            <i class="fas fa-gas-pump"></i>
                            <p>${vehicle.range} км</p>
                        </div>
                        ` : ''}
                    </div>
                </div>
            `;
            vehicleList.appendChild(vehicleCard);
        });
    }

    // Настройка фильтров
    function setupFilters(vehicles) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Удаляем активный класс у всех кнопок
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Добавляем активный класс текущей кнопке
                this.classList.add('active');
                
                const type = this.dataset.type;
                let filteredVehicles = vehicles;
                
                if (type !== 'all') {
                    filteredVehicles = vehicles.filter(vehicle => vehicle.type === type);
                }
                
                displayVehicles(filteredVehicles);
            });
        });
    }
});
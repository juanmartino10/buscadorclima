const result = document.querySelector('.resultado');
const form = document.querySelector('.obtener-clima');
const nombreCiudad = document.querySelector('#ciudad');
const nombrePais = document.querySelector('#pais');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (nombreCiudad.value === '' || nombrePais.value === '') {
        mostrarError('Ambos campos son obligatorios...');
        return;
    }

    callAPI(nombreCiudad.value, nombrePais.value);
})

function callAPI(city, country){
    const apiId = 'db0a29d747c7d0b029b04a59f657f871';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;

    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => {
            if (dataJSON.cod === '404') {
                mostrarError('Ciudad no encontrada...');
            } else {
                clearHTML();
                mostrarClima(dataJSON);
            }
        })
        .catch(error => {
            console.log(error);
        })
}

function mostrarClima(data){
    const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;

    const grados = kelvinaCentigrados(temp);
    const min = kelvinaCentigrados(temp_min);
    const max = kelvinaCentigrados(temp_max);

    const content = document.createElement('div');
    content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${grados}°C</h2>
        <p>Max: ${max}°C</p>
        <p>Min: ${min}°C</p>
    `;

    result.appendChild(content);

}

function mostrarError(message){
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function kelvinaCentigrados(temp){
    return parseInt(temp - 273.15);
}

function clearHTML(){
    result.innerHTML = '';
}
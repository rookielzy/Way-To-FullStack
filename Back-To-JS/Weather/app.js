const WEATHER_URL = "http://api.apixu.com/v1/current.json?key=b0651b9f1c8f4a6eb0814911171610&q=";
const search = document.querySelector('.search');
const overlay = document.querySelector('.overlay');
const temp = document.querySelector('.value');
const condition = document.querySelector('.condition');
const city = document.querySelector('.city');
const time = document.querySelector('.time');

function loadData(data) {
    temp.textContent = data.temp + '°';
    condition.textContent = data.condition;
    city.textContent = data.city;    
    time.textContent = data.time;    
}

// Ajax
// search.addEventListener('keydown', (event) => {
//     let data = {
//         temp: '',
//         condition: '',
//         city: '',
//         time: '',
//     };
//     if (event.keyCode === 13) {
//         let xmlhttp = new XMLHttpRequest();
//         xmlhttp.onreadystatechange = () => {
//             overlay.style.display = 'flex';

//             if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
//                 overlay.style.display = 'none';
//                 let t = JSON.parse(xmlhttp.responseText);
//                 data.temp = t.current['temp_c'];
//                 data.condition = t.current['condition']["text"];
//                 data.city = t.location['name'];                
//                 data.time = t.location['localtime'];
                
//                 loadData(data);
//                 search.value = '';
//             }
//         };
//         xmlhttp.open('GET', WEATHER_URL + city.textContent);
//         xmlhttp.send();
//     }
// });

// Fetch Promise
search.addEventListener('keydown', (event) => {
    let data = {
        temp: '',
        condition: '',
        city: '',
        time: '',
    };
    if (event.keyCode === 13) {
        overlay.style.display = 'flex';
        fetch(WEATHER_URL+search.value)
            .then(res => {
                return res.json();
            })
            .then(resData => {
                overlay.style.display = 'none';
                data.temp = resData.current['temp_c'];
                data.condition = resData.current['condition']["text"];
                data.city = resData.location['name'];
                data.time = resData.location['localtime'];
                loadData(data);
            })
            .catch(err => {
                console.error(err);
            });
    }
});
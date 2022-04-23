const baseURL = 'https://api.synopticdata.com/v2/';
const timeURL = 'stations/timeseries';


const token = '&token=e2931dfd4a684b48a695c45d91afd88c'

const button = document.getElementById('submit');
const stationInput = document.getElementById('station');

button.addEventListener('click', (e) => {
    e.preventDefault();
    let station = stationInput.value;
    let startDate = document.getElementById('start').value;

    console.log(startDate);

    const params = `?stid=${station}&recent=240&hfmetars=0`;

    fetch(baseURL + timeURL + params + token).then(
        response => {
            if(response.ok){
                return response.json();
            }
            throw new Error('Request Failed');
        },
        error => {
            console.log(error);
        }
    ).then(
        jsonResponse => {
            console.log(jsonResponse);
            if(jsonResponse.SUMMARY.RESPONSE_CODE !== 1) {
                document.getElementById('result').innerHTML = 'An error occured requesting the data. Please check that you have the correct station input.'
            } else {
                document.getElementById('result').innerHTML = jsonResponse.STATION[0].OBSERVATIONS.metar_set_1;
            }

        }
    )

});
import { WxDataHandler } from "./modules/wxHandler.js";

const wxHandler = new WxDataHandler();


//API request url
const baseURL = 'https://api.synopticdata.com/v2/';
const timeURL = 'stations/timeseries';
const token = '&token=e2931dfd4a684b48a695c45d91afd88c'

//define document elements
const button = document.getElementById('submit');
const stationInput = document.getElementById('station');

button.addEventListener('click', (e) => {
    e.preventDefault();

    const station = stationInput.value;
    let startDate = document.getElementById('start').value;
    let endDate = document.getElementById('end').value;

    //remove - from dates for correct API request format
    startDate = startDate.replaceAll('-', '');
    endDate = endDate.replaceAll('-', '');

    console.log(startDate);

    const params = `?stid=${station}&start=${startDate}0000&end=${endDate}2359&hfmetars=0&units=english,speed|kts,temp|C&obtimezone=local`;

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
                // document.getElementById('result').innerHTML = jsonResponse.STATION[0].OBSERVATIONS.metar_set_1;
                const daysArr = wxHandler.seperateDays(jsonResponse);
                console.log(daysArr);

                const daysHA = wxHandler.seperateHalfDays(jsonResponse);
                console.log(daysHA);

                let resultEl = document.getElementById('result');

                resultEl.appendChild(document.createElement('p')).innerHTML = `${daysArr.length} days of data received.`;

                const condReport = wxHandler.conditions(jsonResponse);

                resultEl.appendChild(document.createElement('p')).innerHTML = `${condReport.total} days analyzed. ${condReport.vfr} days are operationally usable.<br> ${condReport.vfrBoth} days are usable both morning and afternoon.<br> ${condReport.vfrAM} days are usable in the morning only.<br> ${condReport.vfrPM} days are usable in the afternoon only`;
            }

        }
    )

});
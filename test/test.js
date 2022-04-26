import { WxDataHandler } from "../modules/wxHandler.js";
import { strict as assert } from 'assert';


const testData = {
    "UNITS": {
      "air_temp": "Celsius"
    },
    "QC_SUMMARY": {
      "QC_TESTS_APPLIED": ["sl_range_check"],
      "TOTAL_OBSERVATIONS_FLAGGED": 0,
      "PERCENT_OF_TOTAL_OBSERVATIONS_FLAGGED": 0
    },
    "STATION": [
      {
        "STATUS": "ACTIVE",
        "MNET_ID": "1",
        "LONGITUDE": "-111.96503",
        "LATITUDE": "40.77069",
        "TIMEZONE": "America/Denver",
        "ID": "53",
        "STATE": "UT",
        "PERIOD_OF_RECORD": {
          "start": "1970-01-01T00:00:00Z",
          "end": "2017-06-22T18:20:00Z"
        },
        "ELEVATION": "4226",
        "NAME": "Salt Lake City, Salt Lake City International Airport",
        "QC_FLAGGED": false,
        "STID": "KSLC",
        "SENSOR_VARIABLES": {
          "date_time": { "date_time": {} },
          "air_temp": {
            "air_temp_set_1": {
              "position": ""
            }
          }
        },
        "OBSERVATIONS": {
          "date_time": [
            "2022-04-23T12:54:00-0400",
            "2022-04-23T13:54:00-0400",
            "2022-04-23T14:54:00-0400",
            "2022-04-23T15:54:00-0400"
          ],
          "air_temp_set_1": [13, 14, 14, 12],
          "visibility_set_1": [10, 10, 10, 10],
          "metar_set_1": [
            "KBOS 231654Z 13007KT 10SM FEW200 SCT250 13/M01 A3031 RMK AO2  SLP263 T01281011",
            "KBOS 231754Z 13009KT 10SM FEW200 SCT220 SCT250 14/02 A3028 RMK AO2  SLP253 T01390017 10139 20089 56033",
            "KBOS 231854Z 11012KT 10SM FEW200 SCT220 SCT250 14/02 A3026 RMK AO2  SLP246 T01390017",
            "KBOS 231954Z 12011KT 10SM SCT200 OVC220 12/03 A3023 RMK AO2 SLP238  T01170033"
          ]
        }
      }
    ],
    "SUMMARY": {
      "RESPONSE_CODE": 1,
      "RESPONSE_MESSAGE": "OK",
      "TOTAL_DATA_TIME": "12.0379924774 ms",
      "NUMBER_OF_OBJECTS": 1
    }
}

/*
QC_SUMMARY: {QC_CHECKS_APPLIED: Array(1), TOTAL_OBSERVATIONS_FLAGGED: 0, PERCENT_OF_TOTAL_OBSERVATIONS_FLAGGED: 0}
STATION: Array(1)
0:
ELEVATION: "20"
ELEV_DEM: "16.4"
ID: "4391"
LATITUDE: "42.36056"
LONGITUDE: "-71.01056"
MNET_ID: "1"
NAME: "Boston, Logan International Airport"
OBSERVATIONS:
air_temp_high_6_hour_set_1: (4) [null, 13.9, null, null]
air_temp_low_6_hour_set_1: (4) [null, 8.9, null, null]
air_temp_set_1: (4) [12.8, 13.9, 13.9, 11.7]
altimeter_set_1: (4) [30.31, 30.28, 30.26, 30.23]
ceiling_set_1: (4) [null, null, null, 22000]
cloud_layer_1_code_set_1: (4) [2006, 2006, 2006, 2002]
cloud_layer_1_set_1d: (4) [{…}, {…}, {…}, {…}]
cloud_layer_2_code_set_1: (4) [2502, 2202, 2202, 2204]
cloud_layer_2_set_1d: (4) [{…}, {…}, {…}, {…}]
cloud_layer_3_code_set_1: (4) [null, 2502, 2502, null]
cloud_layer_3_set_1d: (4) [null, {…}, {…}, null]
date_time: (4) ['2022-04-23T12:54:00-0400', '2022-04-23T13:54:00-0400', '2022-04-23T14:54:00-0400', '2022-04-23T15:54:00-0400']
dew_point_temperature_set_1: (4) [-1.1, 1.7, 1.7, 3.3]
dew_point_temperature_set_1d: (4) [-1.2, 1.61, 1.61, 3.22]
metar_origin_set_1: (4) [1, 1, 1, 1]
metar_set_1: (4) ['KBOS 231654Z 13007KT 10SM FEW200 SCT250 13/M01 A3031 RMK AO2  SLP263 T01281011', 'KBOS 231754Z 13009KT 10SM FEW200 SCT220 SCT250 14/…A3028 RMK AO2  SLP253 T01390017 10139 20089 56033', 'KBOS 231854Z 11012KT 10SM FEW200 SCT220 SCT250 14/02 A3026 RMK AO2  SLP246 T01390017', 'KBOS 231954Z 12011KT 10SM SCT200 OVC220 12/03 A3023 RMK AO2 SLP238  T01170033']
pressure_set_1d: (4) [1025.68, 1024.66, 1023.99, 1022.97]
pressure_tendency_set_1: (4) [null, 6033, null, null]
relative_humidity_set_1: (4) [38.19, 43.54, 43.54, 56.34]
sea_level_pressure_set_1: (4) [1026.3, 1025.3, 1024.6, 1023.8]
sea_level_pressure_set_1d: (4) [1026.43, 1025.41, 1024.73, 1023.72]
visibility_set_1: (4) [10, 10, 10, 10]
weather_summary_set_1d: (4) ['scattered', 'scattered', 'scattered', 'overcast']
wind_cardinal_direction_set_1d: (4) ['SE', 'SE', 'ESE', 'ESE']
wind_direction_set_1: (4) [130, 130, 110, 120]
wind_speed_set_1: (4) [7, 9, 12, 11]
[[Prototype]]: Object
PERIOD_OF_RECORD:
end: "2022-04-23T19:35:00Z"
start: "2002-08-14T00:00:00Z"
[[Prototype]]: Object
QC_FLAGGED: false
RESTRICTED: false
SENSOR_VARIABLES: {air_temp_low_6_hour: {…}, cloud_layer_1: {…}, cloud_layer_3: {…}, cloud_layer_2: {…}, wind_direction: {…}, …}
STATE: "MA"
STATUS: "ACTIVE"
STID: "KBOS"
TIMEZONE: "America/New_York"
[[Prototype]]: Object
length: 1
[[Prototype]]: Array(0)
SUMMARY: {DATA_QUERY_TIME: '2.81596183777 ms', RESPONSE_CODE: 1, RESPONSE_MESSAGE: 'OK', METADATA_RESPONSE_TIME: '2.75897979736 ms', DATA_PARSING_TIME: '5.91993331909 ms', …}
UNITS: {air_temp_low_6_hour: 'Celsius', cloud_layer_1: 'ft', cloud_layer_3: 'ft', cloud_layer_2: 'ft', wind_direction: 'Degrees', …}
[[Prototype]]: Object
*/

const wxHandler = new WxDataHandler();

describe('wxHandler.seperateDays()', () => {
  it('Stores the index of entries that are part of the same day in a 2D array', () => {
    const inputData = {
      STATION: [
        {
          OBSERVATIONS: {
            date_time: [
              "2022-04-23T12:54:00-0400",
              "2022-04-23T13:54:00-0400",
              "2022-04-24T01:54:00-0400",
              "2022-04-24T02:54:00-0400"
            ],
            visibility_set_1: [10, 10, 10, 10],
            metar_set_1: [
              "KBOS 231654Z 13007KT 10SM FEW200 SCT250 13/M01 A3031 RMK AO2  SLP263 T01281011",
              "KBOS 231654Z 13007KT 10SM FEW200 SCT250 13/M01 A3031 RMK AO2  SLP263 T01281011",
              "KBOS 240554Z 13007KT 10SM FEW200 SCT250 13/M01 A3031 RMK AO2  SLP263 T01281011",
              "KBOS 240654Z 13007KT 10SM FEW200 SCT250 13/M01 A3031 RMK AO2  SLP263 T01281011"
            ]
          }
        }
      ]
    };

    const expected = [[0, 1], [2, 3]];

    const result = wxHandler.seperateDays(inputData);

    assert.deepStrictEqual(result, expected);

  });
});

describe('wxHandler.seperateHalfDays()', () => {
  it('creates an array of days seperated in half days', () => {
    const inputData = {
      STATION: [
        {
          OBSERVATIONS: {
            date_time: [
              "2022-04-23T03:54:00-0400",
              "2022-04-23T10:54:00-0400",
              "2022-04-23T12:54:00-0400",
              "2022-04-23T18:54:00-0400",
              "2022-04-24T00:54:00-0400",
              "2022-04-24T11:54:00-0400",
              "2022-04-24T15:54:00-0400",
              "2022-04-24T23:54:00-0400"
            ],
            visibility_set_1: [10, 10, 10, 10, 10, 10, 10, 10],
            metar_set_1: [
              "KBOS 231654Z 13007KT 10SM FEW200 SCT250 13/M01 A3031 RMK AO2  SLP263 T01281011",
              "KBOS 231654Z 13007KT 10SM FEW200 SCT250 13/M01 A3031 RMK AO2  SLP263 T01281011",
              "KBOS 240554Z 13007KT 10SM FEW200 SCT250 13/M01 A3031 RMK AO2  SLP263 T01281011",
              "KBOS 240654Z 13007KT 10SM FEW200 SCT250 13/M01 A3031 RMK AO2  SLP263 T01281011",
              "KBOS 231654Z 13007KT 10SM FEW200 SCT250 13/M01 A3031 RMK AO2  SLP263 T01281011",
              "KBOS 231654Z 13007KT 10SM FEW200 SCT250 13/M01 A3031 RMK AO2  SLP263 T01281011",
              "KBOS 240554Z 13007KT 10SM FEW200 SCT250 13/M01 A3031 RMK AO2  SLP263 T01281011",
              "KBOS 240654Z 13007KT 10SM FEW200 SCT250 13/M01 A3031 RMK AO2  SLP263 T01281011"
            ]
          }
        }
      ]
    };

    const expected = [
      [
        [0,1],[2,3]
      ],
      [
        [4,5],[6,7]
      ]
    ];

    const result = wxHandler.seperateHalfDays(inputData);

    assert.deepStrictEqual(result, expected);

  });
});

describe('wxHandler.getVis()', ()=> {
    it('gets visibility from single observation', ()=> {
        const inputData = {
            STATION: [
                {
                    OBSERVATIONS: {
                        visibility_set_1: [10],
                        metar_set_1: ["KBOS 231654Z 13007KT 10SM FEW200 SCT250 13/M01 A3031 RMK AO2  SLP263 T01281011"]
                    }
                }
            ]
        };

        const expected = 10;

        const result = wxHandler.getVis(inputData);

        assert.strictEqual(result, expected);
    });
});

describe('wxHandler.calcAvgVis()', () => {
  it('calculates the average visibility given an array of indexes for vis values', () => {
    const inputData = {
      STATION: [
        {
          OBSERVATIONS: {
            date_time: [
              "2022-04-23T12:54:00-0400",
              "2022-04-23T13:54:00-0400",
              "2022-04-24T01:54:00-0400",
              "2022-04-24T02:54:00-0400"
            ],
            visibility_set_1: [8, 12, 10, 13],
            metar_set_1: [
              "KBOS 231654Z 13007KT 8SM FEW200 SCT250 13/M01 A3031 RMK AO2  SLP263 T01281011",
              "KBOS 231654Z 13007KT 12SM FEW200 SCT250 13/M01 A3031 RMK AO2  SLP263 T01281011",
              "KBOS 240554Z 13007KT 10SM FEW200 SCT250 13/M01 A3031 RMK AO2  SLP263 T01281011",
              "KBOS 240654Z 13007KT 13SM FEW200 SCT250 13/M01 A3031 RMK AO2  SLP263 T01281011"
            ]
          }
        }
      ]
    };

    const expected = 10;

    const result = wxHandler.calcAvgVis(inputData, [0, 1]);

    assert.strictEqual(result, expected);

  });
});

describe('wxHandler.conditions()', () => {
  it('returns an object of conditions with ifr and vfr days', () => {
    const inputData = {
      STATION: [
        {
          OBSERVATIONS: {
            date_time: [
              "2022-04-23T12:54:00-0400",
              "2022-04-23T13:54:00-0400",
              "2022-04-24T01:54:00-0400",
              "2022-04-24T02:54:00-0400"
            ],
            visibility_set_1: [1, 2, 10, 13],
            metar_set_1: [
              "KBOS 231654Z 13007KT 1SM FEW200 SCT250 13/M01 A3031 RMK AO2  SLP263 T01281011",
              "KBOS 231654Z 13007KT 2SM FEW200 SCT250 13/M01 A3031 RMK AO2  SLP263 T01281011",
              "KBOS 240554Z 13007KT 10SM FEW200 SCT250 13/M01 A3031 RMK AO2  SLP263 T01281011",
              "KBOS 240654Z 13007KT 13SM FEW200 SCT250 13/M01 A3031 RMK AO2  SLP263 T01281011"
            ]
          }
        }
      ]
    };

    const expected = {total: 2, ifr: 1, vfr: 1};

    const result = wxHandler.conditions(inputData);

    assert.deepStrictEqual(result, expected);
  });
});
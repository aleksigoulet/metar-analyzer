class WxDataHandler { 
    conditions(obj) {
        const daysIndex = this.seperateHalfDays(obj);

        const sortedCond = this.condByHalfDay(obj, daysIndex);

        const totalDays = sortedCond.length;
        let vfrDay = 0;
        let vfrAM = 0;
        let vfrPM = 0;
        let vfrBoth = 0;
        let ifrDay = 0;

        for (const day of sortedCond) {
            //make sure only full days of date are used (to account for timezone difference in request)
            if(day.length != 2) {
                continue;
            }

            //add days count to appropriate variable
            if(day[0] && day[1]) {
                vfrBoth++;
                vfrDay++;
            } else if(day[0] && !day[1]) {
                vfrAM++;
                vfrDay++;
            } else if(!day[0] && day[1]) {
                vfrPM++;
                vfrDay++;
            } else {
                ifrDay++;
            }

        };

        return {total: totalDays, vfr: vfrDay, vfrAM: vfrAM, vfrPM: vfrPM, vfrBoth: vfrBoth, ifr: ifrDay};



        //////////// OLD BELOW ////////////////

        /*
        let totalDays = daysIndex.length;
        let ifrDays = 0;
        let vfrDays = 0;

        
        daysIndex.forEach(day => {
            // const avgVis = this.calcAvgVis(obj, el);
            // if(avgVis <= 3){
            //     ifrDays++;
            // } else {
            //     vfrDays++;
            // }

            day.forEach(half => {
                //init variables to keep track of reports with ifr or vfr conditions
                let ifrConds = 0;
                let vfrConds = 0;
                //loop through half days and determine how many reports are ifr or vfr
                for(let i = 0; i < half.length; i++) {
                    const vis = this.getVis(obj, half[i]);

                    if(vis < 3){
                        ifrConds++;
                    } else {
                        vfrConds++;
                    }
                }

                if(vfrConds < ifrConds) {
                    ifrDays++;
                } else {
                    vfrDays++;
                }

            });
        });

        return {total: totalDays, ifr: ifrDays, vfr: vfrDays}
        */
    }

    condByHalfDay(obj, arr) { //function that returns whether a half day is suitable or not
        //variables to store results
        let output = [];
        let singleDay = [];

        //loop through 2D array to check conditions
        arr.forEach(day => {
            for(let i = 0; i < day.length; i++) {
                //only create output for full days
                if(day.length == 2) {
                    if(day[0] === [] || day[1] === []) {
                        continue;
                    }
                    let ifrConds = 0;
                    let vfrConds = 0;
                    //calc conditions for each half day
                    for(let j = 0; j < day[i].length; j++) {
                        const vis = this.getVis(obj, day[i][j]);
                        const ceil = this.getCeil(obj, day[i][j]);
                        const obs = this.getWxCondCodes(obj, 0, day[i][j]);
    
                        if(vis < 3 || (ceil < 1000 && ceil !== null) || obs){
                            ifrConds++;
                        } else {
                            vfrConds++;
                        }
                    }
                    
                    //if half day has more IFR value is false, otherwise value is true.
                    if(vfrConds < ifrConds) {
                        singleDay.push(false);
                    } else {
                        singleDay.push(true);
                    }
                }
            }

            output.push(singleDay);
            singleDay = []; //reset variable for next day

        });

       return output;

    }

    seperateDays(obj) {
        const datesArr =  obj.STATION[0].OBSERVATIONS.date_time;

        let daysArr = []; //used for result (2D arr)
        let singleDay = []; //used to store current day entries
        let date = ''; 

        for(let i = datesArr.length - 1; i >= 0; i--) {
            //set date of element currently being used
            const currentDate = datesArr[i].substring(0, 10);

            //set date for entries that are the same
            if(!date) {
                date = currentDate;
            }

            //push day index that correspond to the same date into array. unshift used to keep days ordered chronologically
            if(date === currentDate && i != 0){
                singleDay.unshift(i);
            } else if(date === currentDate && i == 0) {
                singleDay.unshift(i);
                daysArr.unshift(singleDay);
            } else { //unshift day indexes array into output array
                daysArr.unshift(singleDay);

                //reset variables to start a new day and go back to same entry
                singleDay = [];
                date = '';
                i++;
            }
        }

        return daysArr;
    }

    seperateHalfDays(obj) { //creates a 3D array of indexes organized by halfdays
        //get input data
        const datesArr =  obj.STATION[0].OBSERVATIONS.date_time;
        //make days array
        const daysArr = this.seperateDays(obj);
        //seperate into halfdays

        let seperatedArray = []; //used to store result
        let singleDay = []; //store one day
        let ind = datesArr.length - 1; //variable to keep track of index being worked with

        for(let i = daysArr.length - 1; i >= 0; i--) {

            let am = [];
            let pm = [];

            for(let j = daysArr[i].length - 1; j >= 0; j--) {

                const currentTime = datesArr[ind].substring(11, 19);
                //add index to halfday
                if(currentTime < '12:00'){
                    am.unshift(ind);
                } else {
                    pm.unshift(ind);
                }

                ind--;

            }

            //add am and pm to single day
            singleDay.unshift(pm);
            singleDay.unshift(am);

            //push single day to result
            seperatedArray.unshift(singleDay);

            //reset single day
            singleDay = [];
        }

        return seperatedArray;

    }

    getVis(obj, ind) {
        return obj.STATION[0].OBSERVATIONS.visibility_set_1[ind];
    }

    getCeil(obj, ind) {
        return obj.STATION[0].OBSERVATIONS.ceiling_set_1[ind];
    }

    calcAvgVis(obj, arr) {
        let acc = 0;

        for(let i = 0; i < arr.length; i++) {
            const j = arr[i];
            const vis = obj.STATION[0].OBSERVATIONS.visibility_set_1[j];
            acc += vis;
        }

        acc = acc/arr.length;

        return acc;
    }

    getWxCondCodes(obj, condToFind, ind) { //gets condition code for wx, can be used to compare with data if certain wx present
        const condString = obj.STATION[0].OBSERVATIONS.weather_condition_set_1d[ind];

        if(condString == null) {
            return false;
        } else if(condString.includes('snow') || condString.includes('rain') || condString.includes('fog')) {
            return true;
        } else {
            return false;
        }

    }
}

export {WxDataHandler};

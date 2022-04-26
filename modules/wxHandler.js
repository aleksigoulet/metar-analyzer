class WxDataHandler {
    conditions(obj) {
        const daysIndex = this.seperateDays(obj);

        let totalDays = daysIndex.length;
        let ifrDays = 0;
        let vfrDays = 0;

        daysIndex.forEach(el => {
            const avgVis = this.calcAvgVis(obj, el);
            if(avgVis <= 3){
                ifrDays++;
            } else {
                vfrDays++;
            }
        });

        return {total: totalDays, ifr: ifrDays, vfr: vfrDays}
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

    seperateHalfDays(obj) {
        //get input data
        const datesArr =  obj.STATION[0].OBSERVATIONS.date_time;
        //make days array
        const daysArr = this.seperateDays(datesArr);
        //seperate into halfdays

        
    }

    getVis(obj) {
        return obj.STATION[0].OBSERVATIONS.visibility_set_1[0];
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
}

export {WxDataHandler};

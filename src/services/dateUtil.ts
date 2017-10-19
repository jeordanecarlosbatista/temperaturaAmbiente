import { Injectable } from '@angular/core';
@Injectable()
export class DateUtil {

    public dateToStringSimple(date: Date): string {
        let dateString = "";
        try {
            dateString += date.getFullYear() + "-";
            dateString += date.getMonth().toString().length == 2 ? date.getMonth() - 1 + "-" : "0" + (date.getMonth() - 1) + "-";
            dateString += date.getDate().toString().length == 2 ? date.getDate() : "0" + (date.getDate());

        } catch (error) {
            return error;
        }

        return dateString;
    }
    public stringToDateSimple(dateString: string): Date {
        var date = new Date();
        var month;
        var day;
        try {
            let year = dateString.substring(0, 4);
            let month = dateString.substring(5, 7);
            let day = dateString.substring(8, 10);

            date.setFullYear(parseInt(year));
            date.setMonth(parseInt(month));
            date.setDate(parseInt(day));
        } catch (error) {
            console.error(error);
            return null;
        }
        return date;
    }

    public dateToString(date: Date) {
        if (date) {
            let year = date.getFullYear().toString();
            let month = (date.getMonth() + 1).toString();
            let day = date.getDate().toString();

            if (day.length < 2)
                day = "0" + day;
            if (month.length < 2)
                month = "0" + month;
            return day + "/" + month + "/" + year;
        }
    }

    public dateToStringSQL(date: Date, horario) {
        var month;
        var day;
        if (date != null || date != undefined) {
            try {
                day = date.getDate().toString();
                month = (date.getMonth() + 1).toString();
            } catch (e) {
                date = this.sqlToJsDate(date);
                month = (date.getMonth() + 1).toString();
            } finally {
                if (month.length != 2) {
                    month = "0" + month;
                }
                if (day == undefined)
                    day = date.getDate().toString();
                if (day.length != 2) {
                    day = "0" + day;
                }

                if (horario) {
                    let hour = date.getHours();
                    let minute = date.getMinutes();
                    let seconds = date.getSeconds();

                    let hora = hour.toString();
                    let minuto = minute.toString();
                    let segundos = seconds.toString();

                    if (hora.length < 2)
                        hora = "0" + hora;
                    if (minuto.length < 2)
                        minuto = "0" + minuto;
                    if (segundos.length < 2)
                        segundos = "0" + segundos;

                    return date.getFullYear() + "-" + month + "-" + day + " " + hora + ":" + minuto + ":" + segundos;
                } else {
                    /* return date.getFullYear() + "-" + month + "-" + day + " 00:00:00";*/
                    return date.getFullYear() + "-" + month + "-" + day;
                }
            }

        } else {
            return undefined;
        }
    }

    public sqlToJsDate(sqlDate): Date {
        if (sqlDate != undefined && sqlDate != null) {
            var sqlDateArr1 = sqlDate.split("-");
            var sYear = sqlDateArr1[0];
            var sMonth = parseInt((sqlDateArr1[1] - 1).toString());
            var sqlDateArr2 = sqlDateArr1[2].split(" ");
            var sDay = sqlDateArr2[0];
            try {
                var sqlDateArr3 = sqlDateArr2[1].split(":");
                var sHour = sqlDateArr3[0];
                var sMinute = sqlDateArr3[1];
                var sqlDateArr4 = sqlDateArr3[2].split(".");
                var sSecond = sqlDateArr4[0];
                var sMillisecond = sqlDateArr4[1];
                return new Date(sYear, sMonth, sDay, sHour, sMinute, sSecond);
            } catch (e) {
                return new Date(sYear, sMonth, sDay);
            }
        } else {
            return null;
        }
    }
}
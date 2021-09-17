import { Data, GraphData, PieData } from "./Interfaces";

export function isFirstDateLessOrEqual(start: string, end: string) {
  var d1 = new Date(start.split("/").reverse().join("-"));
  var d2 = new Date(end.split("/").reverse().join("-"));
  return d1 <= d2;
}

export function getWorkingHours(hours: string) {
  const starting = hours.split(" ")[1];
  const ending = hours.split(" ")[3];
  const startingHour = starting.split(":")[0];
  const startingMinute = starting.split(":")[1];

  const endingHour = ending.split(":")[0];
  const endingMinute = ending.split(":")[1];
  const differenceHour = parseFloat(endingHour) - parseFloat(startingHour);
  const differenceMinute =
    parseFloat(endingMinute) - parseFloat(startingMinute);

  if (differenceMinute < 0) {
    var minuteResult = 60 + differenceMinute;
    var hoursResult = differenceHour - 1;
  } else {
    minuteResult = differenceMinute;
    hoursResult = differenceHour;
  }
  return hoursResult + parseFloat("0." + minuteResult);
}

function sumHours(x: number, y: number) {
  let remainderX = x - Math.floor(x);
  let remainderY = y - Math.floor(y);
  let sum;
  if (remainderX + remainderY >= 0.6) {
    //if it is 60 minutes than we have to add an hour to hours
    let newRemainder = remainderY + remainderX - 0.6;
    sum = Math.floor(x) + Math.floor(y) + 1 + newRemainder;
  } else {
    sum = x + y;
  }
  return sum;
}

export function getDataForSpecificArea(
  startingDate: string,
  endingDate: string,
  area: string,
  data: Data[]
) {
  const result = data.filter(
    (v) =>
      isFirstDateLessOrEqual(startingDate, v.Date) &&
      isFirstDateLessOrEqual(v.Date, endingDate) &&
      v.Areas === area
  );
  return result;
}

export function getGraphData(data: Data[]) {
  let results: GraphData[] = [];
  for (let i = 0; i < data.length; i++) {
    let index = results.findIndex((v) => v.Colaborator === data[i].Colaborator);
    if (index >= 0) {
      results[index].Working_Hours = sumHours(
        results[index].Working_Hours,
        getWorkingHours(data[i].Working_Hours)
      );
    } else {
      results.push({
        Colaborator: data[i].Colaborator,
        Working_Hours: getWorkingHours(data[i].Working_Hours),
      });
    }
  }
  return results;
}

export function getDataForSpecificProfession(
  startingDate: string,
  endingDate: string,
  profession: string,
  data: Data[]
) {
  const result = data.filter(
    (v) =>
      isFirstDateLessOrEqual(startingDate, v.Date) &&
      isFirstDateLessOrEqual(v.Date, endingDate) &&
      v.Professions === profession
  );
  return result;
}

export function getPieData(data: Data[]) {
  let results: PieData[] = [];
  for (let i = 0; i < data.length; i++) {
    let index = results.findIndex((v) => v.Area === data[i].Areas);
    if (index >= 0) {
      results[index].Working_Hours = sumHours(
        results[index].Working_Hours,
        getWorkingHours(data[i].Working_Hours)
      );
    } else {
      results.push({
        Area: data[i].Areas,
        Working_Hours: getWorkingHours(data[i].Working_Hours),
      });
    }
  }
  return results;
}

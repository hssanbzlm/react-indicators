import {
  getDataForSpecificArea,
  getDataForSpecificProfession,
  getWorkingHours,
  isFirstDateLessOrEqual,
  sumHours,
} from "../helpers/helper";
import { Data } from "../helpers/Interfaces";

const data: Data[] = [
  {
    Date: "01/07/2021",
    Colaborator: "Hssan",
    Working_Hours: "from 08:00 to 12:00",
    Areas: "Galpão Primário",
    Professions: "Soldador",
  },
  {
    Date: "03/07/2021",
    Colaborator: "Ali",
    Working_Hours: "from 09:00 to 17:00",
    Areas: "Ala de Montagem",
    Professions: "Mecânico",
  },
  {
    Date: "02/07/2021",
    Colaborator: "Kane",
    Working_Hours: "from 13:30 to 15:00",
    Areas: "Galpão Primário",
    Professions: "Eletricista",
  },
];

describe("helper.ts", () => {
  test("working hours", () => {
    let workingHours = getWorkingHours("from 14:45 to 15:45");
    expect(workingHours).toEqual(1);
    workingHours = getWorkingHours("from 7:00 to 12:00");
    expect(workingHours).toEqual(5);
    workingHours = getWorkingHours("from 12:15 to 14:00");
    expect(workingHours).toEqual(1.45);
    workingHours = getWorkingHours("from 1:00 to 02:50");
    expect(workingHours).toEqual(1.5);
    workingHours = getWorkingHours("from 1:00 to 2:05");
    expect(workingHours).not.toEqual(1.5);
    expect(workingHours).toEqual(1.05);
  });

  test("Sum hours", () => {
    let sHours = sumHours(4.5, 3.45);
    expect(sHours).not.toEqual(7.95);
    expect(sHours).toEqual(8.35);
    sHours = sumHours(3.25, 2.15);
    expect(sHours).toEqual(5.4);
    sHours = sumHours(0.3, 1.3);
    expect(sHours).not.toEqual(1.6);
    expect(sHours).toEqual(2);
  });

  test("Compare dates", () => {
    let result = isFirstDateLessOrEqual("01/02/2021", "05/06/2021");
    expect(result).toEqual(true);
    result = isFirstDateLessOrEqual("11/12/2020", "06/05/2020");
    expect(result).toEqual(false);
    result = isFirstDateLessOrEqual("05/07/2021", "05/07/2021");
    expect(result).toEqual(true);
  });

  test("Get data for specific area", () => {
    let dataForAreas = getDataForSpecificArea(
      "01/07/2021",
      "03/07/2021",
      "Galpão Primário",
      data
    );
    expect(dataForAreas.length).toEqual(2);
    expect(dataForAreas[0].Colaborator).toEqual("Hssan");
    dataForAreas = getDataForSpecificArea(
      "05/07/2021",
      "10/08/2021",
      "Galpão Primário",
      data
    );
    expect(dataForAreas.length).toEqual(0);

    dataForAreas = getDataForSpecificArea(
      "01/07/2021",
      "05/07/2021",
      "Name",
      data
    );
    expect(dataForAreas.length).toEqual(0);
  });

  test("Get data for specific profession", () => {
    let dataForProfessions = getDataForSpecificProfession(
      "10/02/2021",
      "15/03/2021",
      "Mecânico",
      data
    );
    expect(dataForProfessions.length).toEqual(0);
    dataForProfessions = getDataForSpecificProfession(
      "01/07/2021",
      "05/07/2021",
      "Mecânico",
      data
    );
    expect(dataForProfessions.length).toEqual(1);
    expect(dataForProfessions[0].Professions).not.toEqual("Galpão Primário");
    expect(dataForProfessions[0].Professions).toEqual("Mecânico");
  });
});

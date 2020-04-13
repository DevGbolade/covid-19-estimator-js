/* eslint-disable no-mixed-operators */
const covid19ImpactEstimator = (data) => {
  const { reportedCases } = data;


  // CHALLENGE ONE
  const keyImpact = reportedCases * 10;
  const keySevereImpact = reportedCases * 50;

  // Calculate numer of days in a given time period i.e days, weeks, months
  const numberOfDays = (timeToElapse, periodType) => {
    switch (periodType) {
      case 'days':
        return timeToElapse;
      case 'weeks':
        return timeToElapse * 7;
      case 'months':
        return timeToElapse * 30;
      default:
        return 0;
    }
  };

  // estimate number of infections over a given period
  const infectionsByRequestedTime = (
    currentlyInfected,
    periodType,
    timeToElapse
  ) => currentlyInfected * 2 ** Math.floor(numberOfDays(timeToElapse, periodType) / 3);

  // estimate best case number of infections over a given time period for Impact
  const infectionsByRequestedTimeImpact = infectionsByRequestedTime(
    keyImpact,
    data.periodType,
    data.timeToElapse
  );

  // estimate worst case number of infections over a given time period for SevereImpact
  const infectionsByRequestedTimeSevereImpact = infectionsByRequestedTime(
    keySevereImpact,
    data.periodType,
    data.timeToElapse
  );

  // CHALLENGE TWO
  // number of severe positive cases over a given time period for Impact
  const severeCasesByRequestedTimeImpact = 0.15 * infectionsByRequestedTimeImpact;

  // number of severe positive cases over a given time period for severeImpact
  const severeCasesByRequestedTimeSevereImpact = 0.15 * infectionsByRequestedTimeSevereImpact;

  // number of available hospital beds for severe patients after a given time period for Impact
  const hospitalBedsByRequestedTimeImpact = Math.trunc(0.35 * data.totalHospitalBeds
    - severeCasesByRequestedTimeImpact);

  // number of available hospital beds for severe patients after a given time period for severImpact
  const hospitalBedsByRequestedTimeSevereImpact = Math.trunc(0.35 * data.totalHospitalBeds
    - severeCasesByRequestedTimeSevereImpact);

  // CHALLENGE THREE
  // number of severe patients that will require ICU after a given time period for Impact
  const casesForICUByRequestedTimeImpact = Math.trunc(0.05 * infectionsByRequestedTimeImpact);

  // number of severe patients that will require ICU after a given time period  for severeImpact
  // eslint-disable-next-line max-len
  const casesForICUByRequestedTimeSevereImpact = Math.trunc(0.05 * infectionsByRequestedTimeSevereImpact);

  //  estimated number of severe patients who will require ventilators for Impact
  const casesForVentilatorsByRequestedTimeImpact = Math.trunc(0.02
    * infectionsByRequestedTimeImpact);

  //  estimated number of severe patients who will require ventilators for severeImpact
  const casesForVentilatorsByRequestedTimeSevereImpact = Math.trunc(0.02
    * infectionsByRequestedTimeSevereImpact);

  //  estimated economic impact for Impact
  const dollarsInFlightImpact = Math.floor(infectionsByRequestedTimeImpact
    * 0.65 * data.region.avgDailyIncomeInUSD / numberOfDays(data.timeToElapse, data.periodType));

  // estimated economic impact  for severeImpact
  const dollarsInFlightSevereImpact = Math.floor(infectionsByRequestedTimeSevereImpact
    // eslint-disable-next-line no-mixed-operators
    * 0.65 * data.region.avgDailyIncomeInUSD / numberOfDays(data.timeToElapse, data.periodType));


  return {
    data,
    impact: {
      currentlyInfected: keyImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeImpact,
      severeCasesByRequestedTime: severeCasesByRequestedTimeImpact,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeImpact,
      casesForICUByRequestedTime: casesForICUByRequestedTimeImpact,
      casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeImpact,
      dollarsInFlight: dollarsInFlightImpact

    },
    severeImpact: {
      currentlyInfected: keySevereImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeSevereImpact,
      severeCasesByRequestedTime: severeCasesByRequestedTimeSevereImpact,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeSevereImpact,
      casesForICUByRequestedTime: casesForICUByRequestedTimeSevereImpact,
      casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeSevereImpact,
      dollarsInFlight: dollarsInFlightSevereImpact
    }
  };
};

export default covid19ImpactEstimator;

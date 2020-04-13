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

  return {
    data,
    impact: {
      currentlyInfected: keyImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeImpact(keyImpact),
      severeCasesByRequestedTime: severeCasesByRequestedTimeImpact,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeImpact

    },
    severeImpact: {
      currentlyInfected: keySevereImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeSevereImpact(keySevereImpact),
      severeCasesByRequestedTime: severeCasesByRequestedTimeSevereImpact,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeSevereImpact
    }
  };
};


// covid19ImpactEstimator(data);

export default covid19ImpactEstimator;

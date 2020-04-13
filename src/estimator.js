const covid19ImpactEstimator = (data) => {
  const { reportedCases } = data;

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

  return {
    data,
    impact: {
      currentlyInfected: keyImpact(),
      infectionsByRequestedTime: infectionsByRequestedTimeImpact(keyImpact)
    },
    severeImpact: {
      currentlyInfected: keySevereImpact(),
      infectionsByRequestedTime: infectionsByRequestedTimeSevereImpact(keySevereImpact)
    }
  };
};


// covid19ImpactEstimator(data);

export default covid19ImpactEstimator;

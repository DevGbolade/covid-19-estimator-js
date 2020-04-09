// import data from './data';

const covid19ImpactEstimator = (data) => {
  const { reportedCases } = data;

  const keyImpact = () => reportedCases * 10;
  const keySevereImpact = () => reportedCases * 50;
  const infectionsByRequestedTime = (currentlyInfected, days = 30) => {
    const factor = Math.floor(days / 3);
    return currentlyInfected * factor ** 2;
  };
  return {
    data,
    impact: {
      currentlyInfected: keyImpact(),
      infectionsByRequestedTime: infectionsByRequestedTime(keyImpact)
    },
    severeImpact: {
      currentlyInfected: keySevereImpact(),
      infectionsByRequestedTime: infectionsByRequestedTime(keySevereImpact)
    }
  };
};


// covid19ImpactEstimator(data);

export default covid19ImpactEstimator;

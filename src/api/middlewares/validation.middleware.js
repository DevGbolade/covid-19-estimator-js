// import joi from '@hapi/joi';

// const string = joi.string()
//   .regex(/^\D+$/);
// const number = joi.number();

// const dataSchema = joi.object({
//   region: {
//     name: 'Africa',
//     avgAge: number.required(),
//     avgDailyIncomeInUSD: number.required(),
//     avgDailyIncomePopulation: number.required()
//   },
//   periodType: string.required(),
//   timeLapses: number.required(),
//   reportedCases: number.required(),
//   population: number.required(),
//   totalHospitalBeds: number.required()
// });

// const bodyValidation = (req, res, next) => dataSchema.validate(req.body, (err, data) => {
//   if (err) {
//     // Custom Error
//     const SimplifiedError = {
//       status: 400,
//       error: err.details
//         ? err.details[0].message.replace(/['"]/g, '')
//         : err.message
//     };
//     // Send back the JSON error response
//     return res.status(400).json(SimplifiedError);
//   }
//   // Replace req.body with the data after joi validation
//   req.body = data;
//   return next();
// });

// const bodyValidation = (req, res, next) => dataSchema.validate(req.body, (err, data) => {
//   if (err) {
//     res.status(400).json({
//       status: 400,
//       error: err.details
//         ? err.details[0].message.replace(/['"]/g, '')
//         : err.message

//     });
//   }
//   req.body = data;
//   return next();
// });

// export default bodyValidation;

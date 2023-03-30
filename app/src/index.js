const forrest = require('@forrestjs/core')

const winston = require('winston');
const { combine, timestamp } = winston.format;
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { origin: 'winston' },
  transports: [
    new winston.transports.Console({
      // format: winston.format.simple()
      format: combine(timestamp())
    })
  ],
});

forrest.run({
  settings: {
    logger: {
      transport: (data) => {
        console.log(JSON.stringify({
          ...data,
          origin: 'forrest'
        }))

      }
    }
  },
  features: [{
    target: '$INIT_FEATURE',
    handler: ({ log }) => {
      let i = 0;
      setInterval(() => {
        log.info(`forrest - string - ${i}`)
        logger.info(`winston - string - ${i}`)
        i++;
      }, 1000)
    }
  }]
})

// const winston = require('winston');



// //
// // If we're not in production then log to the `console` with the format:
// // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// //
// // if (process.env.NODE_ENV !== 'production') {
// //   logger.add(new winston.transports.Console({
// //     format: winston.format.simple(),
// //   }));
// // }


// // const format =
// //   ['production', 'staging'].includes(process.env.NODE_ENV) ||
// //   Boolean(process.env.SERVICE_LOGGER_FORCE_JSON) === true
// //     ? combine(timestamp())
// //     : winston.format.simple();

// // transports.push(new winston.transports.Console({ format }));

// // logger.add();





var express = require('express');
var morgan = require('morgan');
var winston = require('winston');

const app = express();

app.use(morgan('combined'));
app.use(express.static('client/dist'));

var logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
}),
loggerstream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
app.use(morgan("combined", { "stream": loggerstream }));

app.listen(8080, function() {
    console.log("portal-rawdatastore-ui listening on port 8080!");
});

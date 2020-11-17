const AWS = require('aws-sdk');
var eventbridge = new AWS.EventBridge();

exports.putEvent = async function (event) {
  const { amount, type, timestamp } = AWS.DynamoDB.Converter.unmarshall(
    event.Records[0].dynamodb.NewImage
  );

  const params = {
    Entries: [
      {
        Detail: amount.toString(),
        DetailType: type,
        EventBusName: process.env.EVENTBUS_NAME,
        Source: 'event_store',
        Time: timestamp,
      },
    ],
  };

  eventbridge.putEvents(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
    }
  });

  return {
    statusCode: 200,
    body: 'succeeded',
  };
};

exports.eventTrigger = async function (event, context) {
  console.log(event);
};

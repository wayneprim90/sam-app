// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

const AWS = require("aws-sdk");
const uuid = require('uuid');
const dynamoDB = new AWS.DynamoDB();

exports.todos_get = async (event, context) => {
    response = {
        statusCode: 200,
        body: JSON.stringify({
            message: "Todos_Get"
        })
    }
    return response;
};

exports.todos_post = (event, context, callback) => {
    
    const payload = {
        TableName: event.TableName,
        Item: {
            id: {
                S: uuid()
            },
            title: event.Item.title
        }
    };
    
    dynamoDB.putItem(payload, (err, data) => {
        if (err) {
            console.log("Oops: " + err, err.stack);
            response = {
                statusCode: 500,
                body: JSON.stringify({
                    error: err.stack
                })
            }
        } else {
            response = {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    data: data
                })
            }
        }

        callback(null, response);
    })
    
}
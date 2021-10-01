const amqp = require('amqplib/callback_api');
let i = 0;
const fs = require('fs')
const instant = new Date();

const minute = instant.getHours() + ":" + instant.getMinutes() + ":" + instant.getSeconds() + ':' + instant.getMilliseconds();
fs.open('cons5.log','w', function (err,file){
    if(err) throw err ;
})

amqp.connect('amqp://localhost',(err,connection) => {
    if(err){
        throw err;
    }

    connection.createChannel((err,channel) => {
        if(err){
            throw err;
        }

        let queue = 'channel_four';
        const content = 'Le consommateur à reçu le message à ' + minute + '\n' ;

        channel.assertQueue(queue,{
            durable : false
        });

        console.log(" Waiting for messages in %s . To exit press CTRL+C",queue);
        channel.consume(queue,(msg) => {
            fs.writeFile('cons5.log',content,err => {
                if(err) {
                    console.error(err);
                    return
                }
            })
        }, {
            noAck : true
        })

    })
})
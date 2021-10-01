const amqp = require('amqplib/callback_api');
let i = 0;
const fs = require('fs')
const instant = new Date();

const minute = instant.getHours() + ":" + instant.getMinutes() + ":" + instant.getSeconds() + ':' + instant.getMilliseconds();
fs.open('prod6.log','w', function (err,file){
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

        let queue = 'channel_five';
        let msg = 'Pattern 4 , producer 2';
        const content = 'Le message"' + msg + '" à été envoyé à ' + minute + '\n' ;

        channel.assertQueue(queue,{
            durable : false
        });

        let i = 0;
        do {
            i = i +1;
            channel.sendToQueue(queue,Buffer.from(msg));
            console.log('Le producteur à envoyé %s',msg) ;
            fs.writeFile('prod6.log',content,err => {
                if(err){
                    console.error(err);
                    return
                }
            })
        }while (i<5)
    })
})
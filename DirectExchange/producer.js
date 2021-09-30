const amqp = require('amqplib/callback_api');
let i = 0;
const fs = require('fs')
const instant = new Date();

const minute = instant.getHours() + ":" + instant.getMinutes() + ":" + instant.getSeconds() + ':' + instant.getMilliseconds();
fs.open('producer.log','w', function (err,file){
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

        let queue = 'channel_one';
        let msg = 'Direct Exchange';
        const content = 'Le message"' + msg + '" à été envoyé à ' + minute + '\n' ;

        channel.assertQueue(queue,{
            durable : false
        });

        let i = 0;
        do {
            i = i +1;
            channel.sendToQueue(queue,Buffer.from(msg));
            console.log('Le producteur à envoyé %s',msg) ;
            fs.writeFile('producer.log',content,err => {
                if(err){
                    console.error(err);
                    return
                }
            })
        }while (i<5)
    })
})
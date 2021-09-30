const amqp = require('amqplib/callback_api');
let i = 0;
const fs = require('fs')
const instant = new Date();

const minute = instant.getHours() + ":" + instant.getMinutes() + ":" + instant.getSeconds() + ':' + instant.getMilliseconds();
fs.open('cons2.log','w', function (err,file){
    if(err) throw err ;
})

amqp.connect('amqp://localhost',function (err,connection){
    connection.createChannel(function (err,channel){
        let queue = 'channel_two';
        const content = 'Le consommateur à reçu le message à ' + minute + '\n' ;

        channel.assertQueue(queue,{
            durable : false
        });

        channel.prefetch(1);
        console.log(" Waiting for messages in %s . To exit press CTRL+C",queue);

        channel.consume(queue,function (msg){
            let secs = msg.content.toString().split('.').length() - 1;
            console.log("[x] received %s", msg.content.toString()) ;

            fs.writeFile('cons2.log',content,err => {
                if(err) {
                    console.error(err);
                    return
                }
            })

            setTimeout(function () {
                console.log('[x] Done');
                channel.ack(msg);
            }, secs * 1000 );
        } , {
            noAck : false
        });
    })
})
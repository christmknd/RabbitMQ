const amqp = require('amqplib/callback_api');
let i = 0;
const fs = require('fs')
const instant = new Date();

const minute = instant.getHours() + ":" + instant.getMinutes() + ":" + instant.getSeconds() + ':' + instant.getMilliseconds();
fs.open('prod1.log','w', function (err,file){
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

        let queue = 'channel_three';
        let msg = process.argv.slice(2).join(' ') || 'Pattern 3 , producer 1';
        const content = 'Le message"' + msg + '" à été envoyé à ' + minute + '\n' ;

        channel.assertQueue(queue,{
            durable : false
        });

        let i = 0;
        do {
            i = i +1;
            channel.sendToQueue(queue,Buffer.from(msg) , {
                persistent : true
            });

            console.log("x sent '%s'",msg);
        }while (i<5)

        fs.writeFile('prod1.log', content, err => {
            if(err) {
                console.log(err);
                return
            }
        })
    });

    setTimeout(function (){
        connection.close();
        process.exit(0)
    },500);
})
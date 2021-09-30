# RabbitMQ

## Installation


```bash
# Get the cli and make it available to use.
wget http://127.0.0.1:15672/cli/rabbitmqadmin
chmod +x rabbitmqadmin
mv rabbitmqadmin /etc/rabbitmq

# Add a user and permissions
rabbitmqctl add_user testuser testpassword
rabbitmqctl set_user_tags testuser administrator
rabbitmqctl set_permissions -p / testuser ".*" ".*" ".*"

# Make a virtual host and Set Permissions
rabbitmqctl add_vhost Some_Virtual_Host
rabbitmqctl set_permissions -p Some_Virtual_Host guest ".*" ".*" ".*"

# Make an Exchange
./rabbitmqadmin declare exchange --vhost=Some_Virtual_Host name=some_exchange type=direct

# Make a Queue
./rabbitmqadmin declare queue --vhost=Some_Virtual_Host name=some_outgoing_queue durable=true
```

## Usage

```bash
Javascript :
npm install amqplib 

# Executing producers :
while true; do node producer.js ; sleep 2 ; done ;

# Executing producers :
Direct exchange : node consumer.js

Fanout exchange : node cons1.js & node cons2.js
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
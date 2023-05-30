# RabbitMQ

Projet réalisé pendant mon alternance au sein de Swisslife.

### Problématique

Le but de ce projet était de faire communiquer entre elles deux applications internes de Swisslife, afin qu'elles puissent s'envoyer des informations. Pour se faire, j'ai choisi d'utiliser des messages brokers.

Après avoir fait un benchmark des messages brokers, les plus pertinents m'ont apparu être Kafka et RabbitMQ

Les principaux critères pour determiner mon choix ont été :

- la facilité d'installation et d'utilisation
- le fait que l'outil soit cross-plateforme (utilisables sur différents OS)
- le fait que l'on puisse implémenter les cas d'usages en différents langages ( c'est ce facteur qui a fait la différence)

Mon choix s'est porté sur RabbitMQ, car il est possible d'implémenter des cas d'usages en utilisant de multiples langages contrairement a Kafka ( Java seulement)

Ce projet est donc un POC (Proof of Concept). Je l'ai développé avec Javascript et NodeJS car c'est le langage avec lequel je suis le plus à l'aise

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

Aller sur le port 15672 pour voir l'interface utilisateur RabbitMQ

### Scenario

- Direct Exchange : 1 producteur / 1 consommateur
- Fanout Exchange : 1 producteur / 2 consommateur
- Scenario 3 : 2 producteur / 2 consommateur / 1 channel de communication
- Scenario 3 : 2 producteur / 2 consommateur / 2 channel de communication

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

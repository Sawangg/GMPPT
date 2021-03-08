# GMPPT
[![build](https://github.com/Sawangg/GMPPT/actions/workflows/node.js.yml/badge.svg)](https://github.com/Sawangg/GMPPT/actions/workflows/node.js.yml)

Projet tutoré permettant au département GMP de gérer les résultats d'exercices personnalisés sur une interface Web. Dans ce README, vous trouverez la documentation technique afin d'installer notre application sur un nouveau serveur ainsi que de maintenir notre projet. Pour tout problème, vous pouvez ouvrir une issue ou contacter l'un des collaborateurs.

## Sommaire

 1. [Système d'exploitation](#os)<br/>
 2. [Installation générale](#installation)<br/>
  a. [Installation de la base de données](#installationBD)<br/>
  b. [Installation du backend](#installationBack)<br/>
  c. [Installation du frontend](#installationFront)<br/>
 4. [Erreurs communes](#erreursCommunes)<br/>

## Système d'exploitation <a id="os"/>

Notre application fonctionne actuellement sous `Linux Debian 10 x86-64`. Pour cette documentation, nous partirons du principe que nous sommes sur un environnement Linux Debian. Il est possible d'installer notre application sur une autre distribution de Linux, mais les commandes, versions et chemins pourraient changer. 
> Aucun support pour **Windows** ou **Mac** est prévu.

## Installation générale <a id="installation"/>

Vous trouverez ci-dessous les outils nécessaires au fonctionnement de notre projet. La configuration présentée a été testée et est stable. Nous ne vous conseillons pas de changer de serveur web car une configuration d'Apache2 a été réalisée pour le projet et est détaillée dans la suite de cette documentation. MariaDB peut être remplacé par MySQL facilement. Pour Node.JS, il est conseillé de rester dans la version 14 ou 15 car se sont les versions stables lors de l'écriture de cette documentation.

|        |Commande(s)                      |Version    |
|--------|---------------------------------|-----------|
|Node.JS |`curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh` <br/>`sudo bash nodesource_setup.sh` <br/>`sudo apt install nodejs`|>=14.6.0|             
|Apache2 |`sudo apt-get install apache2`   |2.4        |
|MariaDB |`sudo apt install mariadb-server`|10.3.27    |
|Giac    |`sudo apt-get install xcas`      |>=1.6.0    |
|PM2     |`sudo npm i -g pm2`		   |>=4.5.0    |

### Installation de la base de données <a id="installationBD"/>

Une fois les outils présentées au-dessus installé sur votre machine, commençons par l'initialisation de la base de données. Pour se faire, télécharger le script dans `/docs/gmp.sql` sur ce dépôt.

### Installation du backend <a id="installationBack"/>

La base de données étant maintenant installée, nous allons lancer notre **API** sur la machine. Dans un premier temps, choisissez un répertoire où celle-ci sera installée. Ce répertoire peut être n'importe où sur votre machine mais nous vous conseillons quelque chose comme `/home/tech/backend` où tech est un utilisateur de la machine différent de root. Une fois dans ce répertoire, récupérez le dossier `Backend` et **uniquement** ce dossier de ce dépôt GitHub et déposer le dans votre dossier créé. Vous devriez avoir une arborescence suivante : 

**./backend**<br/>
├── app.js<br/>
├── databases.js<br/>
├── middleware.js<br/>
├── *.env*<br/>
├── package.json<br/>
├── package-lock.json<br/>
├── **routes**<br/>
│   ├── architecture.js<br/>
│   ├── auth.js<br/>
│   ├── correction.js<br/>
│   ├── etudiant.js<br/>
│   ├── modele.js<br/>
│   ├── promo.js<br/>
│   └── unite.js<br/>
├── **strategies**<br/>
│   └── local.js<br/>
└── utils.js<br/>

Une fois cette étape complétée, vous devez naviguer dans ce dossier puis entrez la commande `npm i`.
Les dépendances vont s'installer automatiquement. Une fois le processus fini, comme vous pouvez le remarquer dans l’arborescence, un fichier .env est disponible. Utilisez `nano .env` pour l'ouvrir et le configurer. Vous obtiendrez un fichier comme ci-dessous. Vous devez le compléter afin que l'API puisse fonctionner correctement. 
```
PORT=3001 Le port de l'API
DB_HOST=localhost Si vous hebergez la base de donnees sur la meme machine 
DB_PORT=3306 par defaut pour MariaDB 
DB_DATABASE=Nom de la base que vous avez creer/importer precedemment 
DB_USER=Le nom d utilisateur pour se connecter a la base de donnees. Verifier que cette utilisateur possede toutes les permissions sur la base entree precedemment 
DB_PWD=Le mot de passe pour l utilisateur de la base de donnees 
COOKIE_SECRET=Le grain de sel pour les cookies 
DOMAIN=164.1.1.1 L adresse ip qui permet de requeter le serveur (Ne pas utilisez localhost, ni 127.0.0.1, vous devez utilisez l ip publique du serveur) 
ORIGINHTTP=http://164.1.1.1 L origine des requetes autorise. Si le serveur apache est sur la meme machine, utilisez la meme ip avec le protocol http 
ORIGINHTTPS=https://164.1.1.1 L origine des requetes autorise. Si le serveur apache est sur la meme machine, utilisez la meme ip avec le protocol https
```

Une fois la configuration terminée, vous n'avez plus qu'à lancer la commande `pm2 start index.js --name Backend`. Cette commande va exécuter l'API pour la mettre en ligne. Pour vérifier que tout est opérationnel, utilisez la commande `pm2 logs` pour vérifier que la dernière ligne est égale à ceci : <br/>
![api_ok](/docs/assets/api_ok.png?raw=true)

### Installation du frontend <a id="installationFront"/>

La dernière partie pour que notre application soit utilisable est la partie client. Nous allons devoir dans un premier temps configurer Apache2. Rendez vous dans la configuration d'apache `sudo nano -l /etc/apache2/apache2.conf` puis à la ligne 170. Nous allons autoriser l'utilisation des fichiers .htaccess dans le répertoire `/var/www/` afin de pouvoir faire fonctionner notre application avec la configuration déjà fournie. Vous devez donc avoir la configuration suivante : <br/>

![apache_config](/docs/assets/apache_config.png?raw=true)

Maintenant qu'Apache2 est opérationnelle, la dernière étape est d'importer et configurer notre application web. Pour se faire, téléchargé **uniquement** le dossier dans `Frontend/build` de ce dépôt. Vous n'avez qu'à déposez le contenu de ce dossier dans `/var/www/html`. Le dernier point avant que notre application ne soit utilisable est la configuration du frontend. Ouvrez le fichier `nano config.js` et entrez les informations nécessaires dans les guillemets :
```js
window.host = "164.1.1.1"; // L'adresse ip de l'api
window.port = "3001"; // Le port de l'api (le même que PORT= dans le .env)
```
Vous pouvez maintenant aller sur l'adresse ip du serveur apache pour voir si l'application est en ligne. Si vous arrivez sur le portail de connexion et que vous pouvez vous connectez avec l'identifiants `root` et le mot de passe `toor@`, l'application GMPPT est opérationnelle 🎉 !

## Erreurs communes <a id="erreursCommunes"/>

La principale erreur que vous êtes amené à rencontrer lors de l'installation d'une nouvelle est l'erreur <a href ="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors" target="_blank"  rel="noreferrer">CORS</a>.
Celle-ci apparaît si l'API n'est pas atteignable par le serveur Apache. Elle indique une mauvaise configuration dans le .env du backend et la config.js du frontend. Il s'agit d'une mauvaise configuration des adresses IP/ports. 

Il est aussi possible d'obtenir une erreur npm lors de l’exécution de `npm i` pour l'installation de l'API même si elle est plus rare que l'erreur CORS. Nous vous conseillons de regarder l'erreur générée par npm afin de comprendre quel package ou composant cause cette erreur.

Pour tout autre problème d'installation ou de bug dans l'application, merci d'ouvrir une issue <a href="https://github.com/Sawangg/GMPPT/issues" target="_blank" rel="noreferrer">ici</a>.
<br/>
<br/>
Documentation écrit avec ❤️ par <a href ="https://github.com/Sawangg" target="_blank"  rel="noreferrer">@Sawangg</a>

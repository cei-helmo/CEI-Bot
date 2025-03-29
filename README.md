# Bot Discord du Comité

Un puissant bot Discord basé sur TypeScript, conçu pour aider à gérer et afficher les informations du comité grâce à des commandes slash intuitives. Ce bot offre un moyen simple aux membres du serveur d'accéder aux détails du comité et aux informations sur les membres tout en maintenant des contrôles d'autorisation appropriés.

## Fonctionnalités

* **Intégration de Commandes Slash**: Utilise l'API de commandes slash de Discord pour une interaction utilisateur intuitive. Les commandes sont enregistrées globalement et fournissent une documentation d'aide instantanée via l'interface de Discord.

* **Affichage des Informations du Comité**: Récupère et affiche facilement des informations détaillées sur les membres du comité, notamment:
  - Coordonnées de contact
  - Rôles et responsabilités
  - Dates de mandat et disponibilité
  - Photos de profil et détails biographiques

* **Système de Permissions Basé sur les Rôles**: 
  - Contrôle d'accès granulaire basé sur les rôles du serveur Discord
  - Restrictions d'accès aux commandes pour les informations sensibles
  - Différents niveaux d'autorisation pour les membres du comité vs. les utilisateurs réguliers
  - Vérification automatique des permissions utilisateur avant le traitement des commandes

* **Commandes Principales du Bot**:
  - `/ping`: Test de connectivité simple pour vérifier que le bot est opérationnel
  - `/infos-comite`: Récupérer des informations détaillées sur les membres du comité
  - Commandes utilitaires supplémentaires pour la gestion du serveur et l'assistance aux utilisateurs
  - Structure de commandes extensible pour l'ajout de fonctionnalités futures

## Stack Technique

* **Node.js & TypeScript**: 
  - Construit sur Node.js pour une exécution efficace de JavaScript côté serveur
  - Entièrement implémenté en TypeScript pour la sécurité des types et une meilleure expérience développeur
  - Le typage strict garantit moins d'erreurs d'exécution et une meilleure maintenabilité du code

* **Bibliothèque Discord.js**:
  - Utilise Discord.js v14+ pour une intégration transparente avec l'API Discord
  - Exploite le support intégré pour les commandes slash et les interactions
  - Tire parti de la gestion avancée des événements pour un comportement réactif du bot
  - Intégration avec Discord Gateway pour les mises à jour et notifications en temps réel

* **Configuration d'Environnement**:
  - Utilise dotenv pour la gestion sécurisée des tokens API et IDs sensibles
  - Variables d'environnement (fichier .env) pour la configuration afin de séparer les identifiants du code
  - Différents paramètres d'environnement pour les environnements de développement et de production
  - Gestion sécurisée du token du bot et de l'ID client via process.env

* **Système d'Enregistrement des Commandes**:
  - Architecture modulaire des commandes pour faciliter l'ajout de nouvelles fonctionnalités
  - Enregistrement automatisé des commandes auprès de l'API Discord au démarrage
  - Commandes organisées dans des fichiers séparés pour la maintenabilité
  - Chargement et enregistrement dynamiques des commandes pour l'extensibilité

* **Composants Additionnels**:
  - Implémentations d'API REST pour l'interaction avec les services Discord
  - Architecture orientée événements pour un fonctionnement efficace du bot
  - Systèmes de gestion des erreurs et de journalisation pour la fiabilité
  - Scripts de déploiement et configuration pour les environnements de production

## Installation & Configuration

### Prérequis

Avant d'installer le bot, assurez-vous d'avoir les éléments suivants :

- **Node.js** (version 16.9.0 ou supérieure)
- **npm** (normalement installé avec Node.js)
- Un compte Discord Développeur avec un bot créé
- Les permissions administrateur sur le serveur Discord cible

### Installation

1. Clonez le dépôt GitHub sur votre machine :

```bash
git clone https://github.com/votre-utilisateur/bot-discord-du-comite.git
cd bot-discord-du-comite
```

2. Installez les dépendances requises :

```bash
npm install
```

### Configuration des variables d'environnement

1. Créez un fichier `.env` à la racine du projet :

```bash
touch .env
```

2. Ouvrez le fichier `.env` et ajoutez les variables d'environnement suivantes :

```
# Token de votre bot Discord (obligatoire)
TOKEN=votre_token_de_bot_discord

# ID Client de votre application Discord (obligatoire)
CLIENT_ID=votre_id_client_discord

# ID du serveur pour l'enregistrement des commandes en développement (optionnel)
GUILD_ID=id_de_votre_serveur_de_test
```

Pour obtenir ces valeurs :
- **TOKEN** : Disponible dans la section "Bot" du [Portail Développeur Discord](https://discord.com/developers/applications)
- **CLIENT_ID** : Disponible dans la section "General Information" de votre application Discord
- **GUILD_ID** : Clic droit sur votre serveur Discord > "Copier l'identifiant"

### Build et lancement

#### Pour le développement

1. Compiler le code TypeScript en mode watch (surveillance des modifications) :

```bash
npm run dev:watch
```

2. Dans un autre terminal, lancez le bot en mode développement :

```bash
npm run dev
```

#### Pour la production

1. Compilez le code pour la production :

```bash
npm run build
```

2. Lancez le bot :

```bash
npm run start
```

### Vérification du déploiement

Après le lancement, le bot devrait se connecter à Discord. Vous verrez un message dans la console indiquant :

```
Bot connecté avec succès en tant que [Nom du Bot]!
Commandes slash enregistrées avec succès.
```

Vous pouvez tester le bon fonctionnement du bot en utilisant la commande `/ping` dans votre serveur Discord.

## Commandes

Cette section détaille toutes les commandes disponibles dans le bot, leurs fonctionnalités, les permissions requises pour les utiliser, ainsi que des exemples d'utilisation et les réponses attendues.

### `/ping`

**Description :**  
Une commande simple permettant de vérifier que le bot est en ligne et répond correctement aux interactions. Cette commande est utile pour tester la connectivité et la latence du bot.

**Permissions requises :**  
Aucune permission spéciale n'est requise. Tous les utilisateurs du serveur peuvent utiliser cette commande.

**Exemple d'utilisation :**  
```
/ping
```

**Réponse attendue :**  
```
🏓 Pong! Latence: 42ms
```
La valeur de latence indique le temps de réponse entre l'envoi de la commande et la réception de la réponse.

### `/infos-comite`

**Description :**  
Cette commande permet de récupérer et d'afficher des informations détaillées sur les membres du comité. Les utilisateurs peuvent spécifier un membre particulier ou un rôle pour obtenir des informations ciblées.

**Permissions requises :**  
- Pour consulter les informations de base : Aucune permission spéciale
- Pour consulter les informations détaillées : Rôle "Membre" ou supérieur
- Pour consulter les informations sensibles : Rôle "Membre du Comité" ou "Administrateur"

**Exemple d'utilisation :**  
```
/infos-comite membre:Président
```

**Paramètres :**
- `membre` (optionnel) : Le rôle ou le titre du membre du comité dont vous souhaitez obtenir les informations. Si non spécifié, affiche la liste de tous les membres du comité.

**Réponse attendue :**  
La réponse se présente sous forme d'un embed Discord contenant :
- Nom et prénom du membre
- Photo de profil (si disponible)
- Rôle dans le comité
- Coordonnées de contact (email institutionnel)
- Heures de permanence (si applicable)
- Description du rôle et des responsabilités
- Période de mandat

**Exemple de réponse :**
```
Informations sur le Président du comité:

👤 Pierre Dupont
📧 president@ecole.fr
🕒 Permanences: Mardi 12h-14h, Bureau A305
📆 Mandat: Septembre 2023 - Juin 2024

Description du rôle:
Représente le comité auprès de l'administration et des étudiants.
Coordonne les activités et projets du comité.
Préside les réunions hebdomadaires.
```

### Autres commandes utilitaires

Le bot dispose également d'autres commandes utilitaires qui peuvent être activées selon les besoins du serveur. Ces commandes sont modulaires et peuvent être activées ou désactivées par les administrateurs.

Pour obtenir la liste complète des commandes disponibles dans votre serveur, utilisez la commande native de Discord en tapant `/` dans la zone de message. Discord affichera automatiquement toutes les commandes slash disponibles avec une brève description.

## Flux de Développement

Cette section explique comment participer au développement du bot, les outils à utiliser et les meilleures pratiques à suivre.

### Processus de développement

Le développement de ce bot suit un processus structuré :

1. **Créer une nouvelle branche** pour chaque fonctionnalité ou correction
   ```bash
   git checkout -b feature/nom-de-la-fonctionnalite
   ```

2. **Implémenter les changements** en suivant les conventions de code
   - Organiser les nouvelles commandes dans le dossier approprié
   - Documenter le code avec des commentaires clairs
   - Suivre les principes SOLID pour la conception

3. **Tester localement** avant de soumettre vos changements
   ```bash
   npm run dev:watch
   ```

4. **Soumettre une Pull Request** pour révision

### Mode Watch pour le développement

Le mode watch permet de recompiler automatiquement le code TypeScript à chaque modification, ce qui facilite le développement itératif :

```bash
# Lance la compilation TypeScript en mode watch
npm run dev:watch
```

Dans un autre terminal, vous pouvez exécuter le bot avec nodemon pour qu'il redémarre automatiquement après chaque modification :

```bash
# Lance le bot avec nodemon (redémarrage automatique)
npm run dev
```

### Commandes de compilation TypeScript

Le projet utilise TypeScript pour une meilleure sécurité de type et une expérience de développement améliorée. Voici les principales commandes de compilation :

```bash
# Compilation unique pour le développement
npm run dev:compile

# Compilation en mode watch (surveillance continue)
npm run dev:watch

# Compilation optimisée pour la production
npm run build
```

### Utilisation de nodemon

Nodemon est un utilitaire qui surveille les modifications de fichiers et redémarre automatiquement le serveur. Son utilisation est configurée dans le fichier `package.json` :

```bash
# Lancer le bot avec nodemon
npm run dev
```

Configuration typique dans package.json :
```json
"scripts": {
  "dev": "nodemon --watch dist dist/main.js",
  "dev:watch": "tsc -p tsconfig.json --watch",
  "dev:compile": "tsc -p tsconfig.json",
  "build": "tsc -p tsconfig.json --sourceMap false",
  "start": "node dist/main.js"
}
```

### Bonnes pratiques de développement

Pour maintenir la qualité et la cohérence du code, suivez ces bonnes pratiques :

1. **Nommage explicite** : Utilisez des noms clairs pour les variables, fonctions et classes
   ```typescript
   // À éviter
   const c = new Cmd();
   
   // Préférer
   const infoCommande = new CommandeInformation();
   ```

2. **Structure modulaire** : Chaque commande dans son propre fichier, regroupées par catégorie
   ```
   src/
   ├── commands/
   │   ├── admin/
   │   ├── info/
   │   └── util/
   ├── events/
   └── utils/
   ```

3. **Gestion des erreurs** : Capturez et journalisez toutes les erreurs potentielles
   ```typescript
   try {
     // Code qui pourrait échouer
   } catch (error) {
     console.error(`Erreur lors de l'exécution de la commande: ${error.message}`);
     // Informer l'utilisateur de manière appropriée
   }
   ```

4. **Tests** : Écrivez des tests pour les fonctionnalités critiques
   ```bash
   # Exécuter les tests
   npm run test
   ```

5. **Documentation** : Documentez les nouvelles fonctionnalités dans le README et dans les commentaires du code

## Structure du Projet

Cette section présente l'organisation du code source du bot et explique le fonctionnement de ses différentes composantes.

### Arborescence des dossiers et fichiers

```
bot-discord-du-comite/
├── dist/                   # Code JavaScript compilé
├── node_modules/           # Dépendances du projet
├── src/                    # Code source TypeScript
│   ├── commands/           # Définition des commandes slash
│   │   ├── infos-comite.ts # Commande d'affichage des infos du comité
│   │   └── ping.ts         # Commande de test simple
│   ├── event/              # Gestionnaires d'événements Discord
│   │   └── ready.ts        # Événement de connexion du bot
│   ├── deploy-commands.ts  # Script d'enregistrement des commandes
│   └── main.ts             # Point d'entrée du bot
├── .env                    # Variables d'environnement (non versionné)
├── .gitignore              # Fichiers exclus du versionnement
├── package.json            # Configuration du projet et dépendances
├── package-lock.json       # Versions exactes des dépendances
├── README.md               # Documentation du projet
└── tsconfig.json           # Configuration TypeScript
```

### Composants principaux

#### `main.ts`

C'est le point d'entrée du bot qui :
- Initialise le client Discord
- Configure les intentions (intents) nécessaires
- Enregistre les gestionnaires d'événements
- Établit la connexion à l'API Discord

```typescript
// Exemple simplifié de main.ts
import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, () => {
    console.log('Bot prêt et connecté');
    registerCommands();
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) return;
    
    // Traitement des commandes
    await executePingCommand(interaction);
    await executeInfoComiteCommand(interaction);
});

client.login(process.env.TOKEN);
```

#### Dossier `commands/`

Contient un fichier distinct pour chaque commande slash du bot. Chaque fichier définit :
- La structure de la commande (nom, description, options)
- La fonction d'exécution qui traite l'interaction

#### Dossier `event/`

Contient les gestionnaires pour les différents événements Discord, comme la connexion du bot, les messages reçus, etc.

### Système de commandes

Le bot utilise l'API de commandes slash de Discord.js pour créer des interactions utilisateur intuitives et typées.

#### Définition d'une commande

Chaque commande est définie dans un fichier séparé à l'aide de la classe `SlashCommandBuilder` :

```typescript
// Exemple de définition de commande dans ping.ts
import { SlashCommandBuilder } from 'discord.js';

export const pingCommand = new SlashCommandBuilder()
    .setName('ping')           // Nom de la commande utilisée après le /
    .setDescription('Répond avec Pong !');  // Description visible dans Discord

export const executePingCommand = async (interaction) => {
    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong !');  // Réponse à l'utilisateur
    }
};
```

Pour les commandes plus complexes, on peut ajouter des options (paramètres) :

```typescript
// Exemple avec options dans infos-comite.ts
export const infoComite = new SlashCommandBuilder()
    .setName('infos-comite')
    .setDescription("Affiche les informations d'un membre du comité.")
    .addUserOption(option =>     // Ajoute un paramètre utilisateur
        option.setName("pseudo")
            .setDescription("Mentionne un membre pour voir ses infos.")
            .setRequired(true)   // Option obligatoire
    );
```

#### Enregistrement des commandes

Les commandes sont enregistrées auprès de l'API Discord par le fichier `deploy-commands.ts` qui :
1. Collecte toutes les définitions de commandes
2. Les convertit au format JSON
3. Les envoie à l'API Discord via REST

```typescript
// Extrait de deploy-commands.ts
export async function registerCommands() {
    const commands = [
        pingCommand.toJSON(),
        infoComite.toJSON(),
        // Autres commandes...
    ];

    try {
        await rest.put(
            Routes.applicationCommands(clientId), 
            { body: commands }
        );
        console.log('Commandes enregistrées avec succès !');
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement:', error);
    }
}
```

#### Exécution des commandes

Les commandes sont exécutées dans le gestionnaire d'événement `InteractionCreate` dans `main.ts`. Chaque fonction d'exécution vérifie si l'interaction concerne sa commande, puis effectue le traitement approprié.

### Système d'événements

Le bot utilise un système d'événements basé sur les écouteurs (listeners) de Discord.js pour réagir aux différentes interactions :

```typescript
// Exemple d'écouteur d'événement "ready"
client.once('ready', () => handleReady(client));

// Exemple d'écouteur d'événement "interactionCreate"
client.on(Events.InteractionCreate, async (interaction) => {
    // Traitement des interactions
});
```

Les gestionnaires d'événements sont organisés dans le dossier `event/` pour maintenir une structure propre.

#### Événements principaux

- **ready** : Déclenché lorsque le bot se connecte à Discord
- **interactionCreate** : Déclenché lorsqu'un utilisateur interagit avec le bot (commande, bouton, etc.)
- **messageCreate** : Déclenché lorsqu'un message est envoyé dans un canal visible par le bot

### Fichiers de configuration

#### `.env`

Contient les variables d'environnement sensibles :

```
# Token du bot généré sur le portail Discord Developer
TOKEN=votre_token_secret

# ID de l'application Discord
CLIENT_ID=votre_id_client

# Pour l'enregistrement des commandes en développement
GUILD_ID=id_du_serveur_de_test
```

#### `package.json`

Configure les scripts npm et les dépendances :

```json
{
  "scripts": {
    "start": "node ./dist/main.js",
    "dev:compile": "tsc",
    "dev:start": "npx tsc && node ./dist/main.js",
    "dev:watch": "nodemon --ext ts --exec \"npx tsc && node ./dist/main.js\""
  },
  "dependencies": {
    "discord.js": "^14.18.0",
    "dotenv": "^16.4.7"
    // Autres dépendances...
  }
}
```

#### `tsconfig.json`

Configure la compilation TypeScript :

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
    // Autres options...
  },
  "include": ["src/**/*"]
}
```

Cette architecture modulaire permet d'ajouter facilement de nouvelles fonctionnalités au bot en:
1. Créant un nouveau fichier de commande dans le dossier `commands/`
2. L'ajoutant à la liste des commandes dans `deploy-commands.ts`
3. Intégrant sa fonction d'exécution dans le gestionnaire d'événement `InteractionCreate`
## Contribution

Cette section détaille comment contribuer efficacement au projet du bot Discord du Comité. Nous apprécions toutes les contributions qui permettent d'améliorer et d'étendre les fonctionnalités du bot.

### Processus de contribution

1. **Vérifiez les issues existantes** : Avant de commencer à travailler, vérifiez si quelqu'un d'autre ne travaille pas déjà sur la même fonctionnalité ou correction.

2. **Créez une nouvelle issue** : Si vous avez une idée ou avez identifié un bug, créez une nouvelle issue en décrivant clairement :
   - Pour une fonctionnalité : son objectif, les bénéfices attendus et une description générale de l'implémentation
   - Pour un bug : les étapes pour reproduire, le comportement attendu vs. actuel, et des captures d'écran si pertinent

3. **Faites un fork du projet** : Créez votre propre copie du dépôt sur laquelle vous pourrez travailler.

4. **Créez une branche dédiée** :
   ```bash
   git checkout -b type/nom-descriptif
   ```
   Où `type` peut être : `feature`, `bugfix`, `hotfix`, `docs`, etc.

5. **Développez votre contribution** : Implémentez les changements en suivant les conventions de code décrites ci-dessous.

6. **Testez vos modifications** : Assurez-vous que vos modifications fonctionnent comme prévu et n'introduisent pas de régressions.

7. **Soumettez une Pull Request** : Une fois votre travail terminé, soumettez une PR vers la branche principale du projet.

### Conventions de code

Pour maintenir un code propre, lisible et cohérent, veuillez suivre ces conventions :

1. **Langue** : 
   - Les noms de variables, fonctions et commentaires doivent être en français
   - Les commentaires de documentation doivent être détaillés et explicatifs

2. **Formatage** :
   - Indentation de 2 espaces (pas de tabulations)
   - Limite de 100 caractères par ligne
   - Utilisez des accolades pour tous les blocs, même les instructions uniques
   - Placez les accolades ouvrantes sur la même ligne que la déclaration

   ```typescript
   // Bon style
   if (condition) {
     faireQuelqueChose();
   }
   
   // À éviter
   if (condition)
     faireQuelqueChose();
   ```

3. **Nommage** :
   - Variables et fonctions : camelCase (`envoyerMessage`, `nombreUtilisateurs`)
   - Classes : PascalCase (`CommandeUtilisateur`, `GestionnaireEvents`)
   - Constantes : SNAKE_CASE_MAJUSCULE (`MAX_TENTATIVES`, `DELAI_ATTENTE`)
   - Interfaces : PascalCase avec préfixe I (`IConfiguration`, `ICommande`)

4. **Organisation du code** :
   - Une classe ou fonction par fichier (sauf si très liées)
   - Organisez les imports alphabétiquement
   - Groupez les imports par origine (natifs, externes, locaux)

5. **Documentation** :
   - Documentez chaque fonction, classe et méthode publique avec des commentaires JSDoc
   ```typescript
   /**
    * Récupère les informations d'un membre du comité.
    * 
    * @param {string} role - Le rôle du membre à rechercher
    * @returns {Promise<MembreComite>} Les informations du membre
    * @throws {Error} Si le membre n'est pas trouvé
    */
   async function trouverMembreParRole(role: string): Promise<MembreComite> {
     // Implémentation...
   }
   ```

### Processus de Pull Request

1. **Création de la PR** :
   - Utilisez un titre clair et descriptif
   - Référencez l'issue concernée (exemple : "Fixes #42")
   - Fournissez une description détaillée des changements
   - Ajoutez des captures d'écran pour les changements visuels

2. **Revue de code** :
   - Toutes les PR doivent être revues par au moins un autre contributeur
   - Répondez aux commentaires et suggestions de manière constructive
   - Effectuez les modifications demandées ou expliquez pourquoi vous ne le faites pas

3. **Validation** :
   - La PR doit passer tous les tests automatisés
   - Les conflits de fusion doivent être résolus avant l'approbation
   - La documentation doit être mise à jour si nécessaire

4. **Fusion** :
   - Une fois approuvée, la PR sera fusionnée par un mainteneur
   - Privilégiez la fusion par rebase pour garder un historique propre

### Règles de commit

1. **Format des messages** : Utilisez un format structuré pour vos messages de commit
   ```
   type(portée): description courte
   
   Description détaillée si nécessaire sur plusieurs lignes.
   
   Issue: #42
   ```

2. **Types de commit** :
   - `feat` : Nouvelle fonctionnalité
   - `fix` : Correction de bug
   - `docs` : Modifications de la documentation
   - `style` : Formatage, point-virgules manquants, etc. (pas de changement de code)
   - `refactor` : Refactorisation du code
   - `test` : Ajout ou modification de tests
   - `chore` : Modifications de l'infrastructure de build, des dépendances, etc.

3. **Description** :
   - Utilisez l'impératif présent ("Ajoute", "Corrige", "Met à jour", pas "Ajouté" ou "Correction")
   - Ne mettez pas de point final
   - Limitez à 50 caractères si possible, max 72
   - Première lettre en majuscule

4. **Exemples** :
   ```
   feat(commandes): Ajoute la commande /evenements
   
   fix(auth): Corrige la vérification des permissions
   
   docs(readme): Met à jour les instructions d'installation
   ```

### Guidelines pour les tests

1. **Types de tests** :
   - **Tests unitaires** : Pour les fonctions et classes individuelles
   - **Tests d'intégration** : Pour les interactions entre composants
   - **Tests de bout en bout** : Simulation de scénarios d'utilisation complets

2. **Framework de test** :
   - Utilisez Jest pour les tests unitaires et d'intégration
   - Utilisez des mocks pour simuler les API Discord

3. **Structure des tests** :
   - Organisez les fichiers de test dans un dossier `__tests__` à côté du code testé
   - Nommez les fichiers de test avec le suffix `.test.ts` ou `.spec.ts`

4. **Bonnes pratiques** :
   - Testez les cas normaux et les cas d'erreur
   - Utilisez des assertions claires et descriptives
   - Isolez les tests (pas de dépendances entre tests)
   - Évitez les tests flaky (résultats inconsistants)

5. **Exemple de test** :
   ```typescript
   describe('GestionnaireCommandes', () => {
     it('devrait enregistrer une nouvelle commande', () => {
       // Arrange
       const gestionnaire = new GestionnaireCommandes();
       const commande = new CommandeTest();
       
       // Act
       gestionnaire.enregistrer(commande);
       
       // Assert
       expect(gestionnaire.trouverCommande(commande.nom)).toBe(commande);
     });
   });
   ```

6. **Exécution des tests** :
   ```bash
   # Exécuter tous les tests
   npm run test
   
   # Exécuter les tests avec watch mode
   npm run test:watch
   
   # Vérifier la couverture de code
   npm run test:coverage
   ```

### Contacts pour l'aide

Si vous avez besoin d'aide pour contribuer au projet, n'hésitez pas à contacter :

- **Mainteneurs principaux** :
  - [Nom du mainteneur principal] - [email@domaine.fr]
  - Discord: [@username]

- **Canal de discussion** :
  - Discord: [#nom-du-canal]
  - Réunions hebdomadaires : Tous les mercredis à 18h sur Discord

- **Rapport de bugs et demandes de fonctionnalités** :
  - Utilisez le [système d'issues](https://github.com/organisation/bot-discord-du-comite/issues) sur GitHub
  - Pour les questions urgentes, contactez directement un mainteneur sur Discord

Nous vous remercions de votre intérêt pour l'amélioration du Bot Discord du Comité !

# CEI-Bot

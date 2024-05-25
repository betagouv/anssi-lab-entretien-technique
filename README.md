# Entretien technique pour le Lab ANSSI

Ce dépôt sert de terrain de jeu pour les entretiens techniques.

## 💡 Idée générale

Une app qui charge la météo de l'emplacement actuel du navigateur.  
Le code présente pas mal de défauts… Le premier étant qu'il n'est pas terminé.

## 🧰 Techno

Il s'agit d'une app Svelte / Vite / Typescript créée via [la ligne de commande Vite](https://vitejs.dev/guide/).

Prettier est également présent et peut être lancé manuellement.

## 📝 Objectifs

- Travailler en binôme ou mob avec les futurs collègues.
- Commencer par terminer l'app :
  - les prévisions de température du jour doivent s'afficher à l'écran
- Puis attaquer du refactoring sur l'app, en visant :
  - émergence d'un modèle du domaine
  - utilisation d'injection de dépendances
  - ajout de tests automatisés (soit tester le GUI, soit tester les éléments émergeants du refactoring)
  - utilisation poussée de l'IDE, du clavier si possible
- Suggestions de fonctionnalités additionnelles :
  - obtenir davantage de données sur la météo : moyenne des températures par exemple
  - prévoir un mode « DÉMO » où l'on peut piloter manuellement la géolocalisation utilisée
- Sujets de conversation :
  - Au-delà du code, parler du pipeline de build et de déploiement qui irait bien

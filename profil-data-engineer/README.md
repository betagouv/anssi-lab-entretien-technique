# Entretien d'un profil d'ingénieur.e data

## 💡 Idée générale

Une application qui autorise le téléversement de PDF, et qui en extrait des métadonnées.
Le code actuel est une API simple avec deux tests unitaires, dont un qui est omis.

## 🧰 Techno

Il s'agit d'une application web Python / FastAPI, qui peut être lancée via la commande `uvicorn src.main:app --reload`.

Pytest est également présent et peut être lancé via la commande `pytest`.

## 📝 Objectifs

- Travailler en binôme ou mob avec les futurs collègues.
- Lancer, puis faire passer `xtest_sait_dire_bonjour_au_candidat`
- Puis on s'attaque à l'implémentation d'une fonctionnalité métier, par des cycles TDD :
  - Permettre le téléversement d'un fichier PDF (un exemple d'un tel fichier dans `./documents/guide_hygiene_informatique_anssi.pdf`)
  - Lire les métadonnées du PDF (nombre de pages, auteur, etc...)
  - Chunker le contenu des pages avec une taille limite à définir
  - Envoyer les chunks vers un endpoint tiers fictif
    - On souhaite simuler le comportement du tiers avec une fonction locale
    - Ce endpoint fictif doit renvoyer le nombre de chunks traités
  - Persister sur disque les informations du PDF traités
    - Nom du fichier
    - Métadonnées éventuelles
    - Nombre de chunks
  - Renvoyer une erreur HTTP si le PDF existe déjà dans la persistance
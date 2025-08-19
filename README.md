![PokeCard](/img/pokecard.png)

---

# Sujet

Technologies: React + Typescript avec Vite

1ere étape => Creer une SPA qui liste les pokemons (only 1st gen) sous forme de cards contenant :

- Nom
- Image
- Type (sous forme de tag avec la bonne couleur similaire au jeu)
- Poids (en kg)
- Taille (en cm)
- Description

La liste doit être paginée (via système de pages numérotées) et filtrable par type et searchable par nom.

2ème étape => Pour chaque card de pokemon, ajouter un bouton "Voir plus" qui ouvre un modal contenant :

- Listes des moves possibles avec leur nom et description

BONUS =>

- Utiliser SWR pour simplifier/cache les calls API.
- Partager l'état de la SPA entre les onglets.
- Ajouter un thème sombre.
- Ajouter un système de favoris pour les pokemons et les stocker localement (Si t'est un bonhomme avec IndexedDB).
- Modifier la pagination pour une pagination infinie (scroll infini).

CONDITIONS : Interdit d'utiliser une "limit" sur les calls de listes supérieure a 20

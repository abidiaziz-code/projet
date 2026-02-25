export const agriculturalData = {
  locations: [
    {
      id: 1,
      name: "Jendouba - Centre",
      type: "Ville",
      lat: 36.5011,
      lng: 8.7802,
      postalCode: "8100",
      description: "Zone urbaine et périurbaine avec agriculture maraîchère et arboriculture. Sols fertiles et accès à l'irrigation.",
      crops: [
        { name: "Pomme de terre", type: "légumes", season: "Printemps-Été" },
        { name: "Tomate", type: "légumes", season: "Printemps-Été" },
        { name: "Olive", type: "fruits", season: "Automne" },
        { name: "Agrumes", type: "fruits", season: "Hiver" }
      ],
      calendar: [
        { month: "Janvier", planting: 10, harvesting: 30 },
        { month: "Février", planting: 20, harvesting: 25 },
        { month: "Mars", planting: 40, harvesting: 15 },
        { month: "Avril", planting: 30, harvesting: 10 },
        { month: "Mai", planting: 15, harvesting: 20 },
        { month: "Juin", planting: 5, harvesting: 35 },
        { month: "Juillet", planting: 0, harvesting: 40 },
        { month: "Août", planting: 5, harvesting: 35 },
        { month: "Septembre", planting: 15, harvesting: 25 },
        { month: "Octobre", planting: 25, harvesting: 15 },
        { month: "Novembre", planting: 30, harvesting: 5 },
        { month: "Décembre", planting: 15, harvesting: 10 }
      ],
      tips: [
        "Irrigation goutte-à-goutte recommandée pour économiser l'eau",
        "Rotation des cultures pour préserver la fertilité du sol",
        "Contrôle biologique des parasites recommandé"
      ],
      color: "#2ecc71"
    },
    {
      id: 2,
      name: "Aïn Draham",
      type: "Zone montagneuse",
      lat: 36.7775,
      lng: 8.6925,
      postalCode: "8110",
      description: "Région montagneuse avec forêts et agriculture de montagne. Climat frais et pluvieux.",
      crops: [
        { name: "Pomme", type: "fruits", season: "Automne" },
        { name: "Poire", type: "fruits", season: "Automne" },
        { name: "Framboise", type: "fruits", season: "Été" },
        { name: "Légumes de montagne", type: "légumes", season: "Été" }
      ],
      calendar: [
        { month: "Janvier", planting: 5, harvesting: 0 },
        { month: "Février", planting: 10, harvesting: 0 },
        { month: "Mars", planting: 25, harvesting: 5 },
        { month: "Avril", planting: 30, harvesting: 10 },
        { month: "Mai", planting: 20, harvesting: 15 },
        { month: "Juin", planting: 10, harvesting: 30 },
        { month: "Juillet", planting: 5, harvesting: 40 },
        { month: "Août", planting: 5, harvesting: 35 },
        { month: "Septembre", planting: 10, harvesting: 25 },
        { month: "Octobre", planting: 15, harvesting: 15 },
        { month: "Novembre", planting: 20, harvesting: 5 },
        { month: "Décembre", planting: 10, harvesting: 0 }
      ],
      tips: [
        "Utilisation de terrasses pour lutter contre l'érosion",
        "Culture sous serre pour protéger des gelées",
        "Valorisation des produits locaux"
      ],
      color: "#e74c3c"
    },
    {
      id: 3,
      name: "Tabarka",
      type: "Côtière",
      lat: 36.9544,
      lng: 8.7581,
      postalCode: "8120",
      description: "Zone côtière avec agriculture méditerranéenne et pêche. Climat doux et humide.",
      crops: [
        { name: "Citron", type: "fruits", season: "Hiver" },
        { name: "Orange", type: "fruits", season: "Hiver" },
        { name: "Légumes méditerranéens", type: "légumes", season: "Printemps-Été" },
        { name: "Coriandre", type: "légumes", season: "Printemps" }
      ],
      calendar: [
        { month: "Janvier", planting: 5, harvesting: 40 },
        { month: "Février", planting: 10, harvesting: 35 },
        { month: "Mars", planting: 25, harvesting: 20 },
        { month: "Avril", planting: 30, harvesting: 15 },
        { month: "Mai", planting: 20, harvesting: 10 },
        { month: "Juin", planting: 10, harvesting: 5 },
        { month: "Juillet", planting: 5, harvesting: 5 },
        { month: "Août", planting: 10, harvesting: 10 },
        { month: "Septembre", planting: 15, harvesting: 15 },
        { month: "Octobre", planting: 25, harvesting: 20 },
        { month: "Novembre", planting: 30, harvesting: 25 },
        { month: "Décembre", planting: 15, harvesting: 30 }
      ],
      tips: [
        "Protection contre les vents marins",
        "Irrigation avec eau saumâtre possible",
        "Culture en association avec les arbres fruitiers"
      ],
      color: "#3498db"
    },
    {
      id: 4,
      name: "Fernana",
      type: "Vallée",
      lat: 36.6553,
      lng: 8.6950,
      postalCode: "8130",
      description: "Vallée fertile avec agriculture diversifiée et élevage. Sols riches et eau abondante.",
      crops: [
        { name: "Blé", type: "céréales", season: "Hiver" },
        { name: "Orge", type: "céréales", season: "Hiver" },
        { name: "Piment", type: "légumes", season: "Été" },
        { name: "Aubergine", type: "légumes", season: "Été" }
      ],
      calendar: [
        { month: "Janvier", planting: 15, harvesting: 10 },
        { month: "Février", planting: 20, harvesting: 5 },
        { month: "Mars", planting: 25, harvesting: 0 },
        { month: "Avril", planting: 20, harvesting: 0 },
        { month: "Mai", planting: 10, harvesting: 15 },
        { month: "Juin", planting: 5, harvesting: 30 },
        { month: "Juillet", planting: 0, harvesting: 45 },
        { month: "Août", planting: 0, harvesting: 40 },
        { month: "Septembre", planting: 5, harvesting: 25 },
        { month: "Octobre", planting: 15, harvesting: 10 },
        { month: "Novembre", planting: 20, harvesting: 5 },
        { month: "Décembre", planting: 15, harvesting: 10 }
      ],
      tips: [
        "Rotation blé-légumineuses recommandée",
        "Utilisation de couverts végétaux",
        "Gestion optimisée de l'irrigation"
      ],
      color: "#f39c12"
    },
    {
      id: 5,
      name: "Bousalem",
      type: "Mixte",
      lat: 36.6031,
      lng: 8.9714,
      postalCode: "8140",
      description: "Zone de plaine avec agriculture mixte céréales-légumes-fruits.",
      crops: [
        { name: "Blé dur", type: "céréales", season: "Hiver" },
        { name: "Olive", type: "fruits", season: "Automne" },
        { name: "Légumes divers", type: "légumes", season: "Printemps-Été" },
        { name: "Amande", type: "fruits", season: "Été" }
      ],
      calendar: [
        { month: "Janvier", planting: 10, harvesting: 20 },
        { month: "Février", planting: 15, harvesting: 15 },
        { month: "Mars", planting: 25, harvesting: 10 },
        { month: "Avril", planting: 30, harvesting: 15 },
        { month: "Mai", planting: 25, harvesting: 20 },
        { month: "Juin", planting: 15, harvesting: 30 },
        { month: "Juillet", planting: 10, harvesting: 40 },
        { month: "Août", planting: 10, harvesting: 35 },
        { month: "Septembre", planting: 15, harvesting: 25 },
        { month: "Octobre", planting: 20, harvesting: 20 },
        { month: "Novembre", planting: 15, harvesting: 15 },
        { month: "Décembre", planting: 10, harvesting: 20 }
      ],
      tips: [
        "Association céréales-légumineuses bénéfique",
        "Taille des oliviers en hiver",
        "Gestion intégrée des parasites"
      ],
      color: "#9b59b6"
    }
  ],

  // Autres données
  cropDetails: {
    "Pomme de terre": { water: "Élevé", duration: "3-4 mois", rotation: "3 ans" },
    "Tomate": { water: "Élevé", duration: "3-4 mois", rotation: "3 ans" },
    "Olive": { water: "Faible", duration: "Vivace", rotation: "Permanent" },
    "Agrumes": { water: "Moyen", duration: "Vivace", rotation: "Permanent" },
    "Pomme": { water: "Moyen", duration: "Vivace", rotation: "Permanent" },
    "Poire": { water: "Moyen", duration: "Vivace", rotation: "Permanent" },
    "Framboise": { water: "Élevé", duration: "Vivace", rotation: "10 ans" },
    "Citron": { water: "Moyen", duration: "Vivace", rotation: "Permanent" },
    "Orange": { water: "Moyen", duration: "Vivace", rotation: "Permanent" },
    "Blé": { water: "Moyen", duration: "6-7 mois", rotation: "Annuel" },
    "Orge": { water: "Faible", duration: "5-6 mois", rotation: "Annuel" },
    "Blé dur": { water: "Moyen", duration: "6-7 mois", rotation: "Annuel" },
    "Amande": { water: "Faible", duration: "Vivace", rotation: "Permanent" }
  }
};
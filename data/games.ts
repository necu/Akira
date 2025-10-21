export interface Game {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  guideTopics: string[];
  tools: {
    id: 'army-calculator' | 'build-order-helper';
    name: string;
  }[];
}

export const games: Game[] = [
  {
    id: 'total-war-warhammer-3',
    name: 'Total War: Warhammer III',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1142710/header.jpg?t=1722442436',
    description: 'El cataclísmico final de la trilogía de Total War: WARHAMMER ya está aquí. Reagrupa a tus fuerzas y adéntrate en el Reino del Caos, una dimensión de terrores enloquecedores en la que se decidirá el destino del mundo.',
    guideTopics: ['Estrategia de inicio (Imperio)', 'Composición de ejército (Altos Elfos)', 'Guía de economía (Enanos)', 'Cómo contrarrestar a Skaven'],
    tools: [{ id: 'army-calculator', name: 'Calculadora de Costo de Ejército' }],
  },
  {
    id: 'starcraft-2',
    name: 'StarCraft II',
    imageUrl: 'https://blz-content-images.s3.amazonaws.com/s2/legacy-of-the-void/images/meta-og-image.jpg',
    description: 'StarCraft II es el juego de estrategia en tiempo real de ciencia ficción definitivo. Lidera vastos ejércitos de Terran, Zerg o Protoss en una guerra galáctica por la supervivencia.',
    guideTopics: ['Build Order (Terran Bio)', 'Macro vs Micro', 'Guía de Scouting (Zerg)', 'Control de unidades Psiónicas (Protoss)'],
    tools: [],
  },
  {
    id: 'age-of-empires-4',
    name: 'Age of Empires IV',
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1466860/header.jpg?t=1719503903',
    description: 'Uno de los juegos de estrategia en tiempo real más queridos vuelve a la gloria con Age of Empires IV, donde serás el centro de las épicas batallas históricas que dieron forma al mundo que hoy conocemos.',
    guideTopics: ['Avance rápido a la Edad Feudal', 'Guía de economía (Ingleses)', 'Uso de la caballería (Franceses)', 'Defensa contra asedios tempranos'],
    tools: [],
  },
];

import { Game } from '../types/Game';

// Import all images
// Import all images
import catanImage from '../pictures/catan.avif';
import cardsAgainstHumanityImage from '../pictures/cardsagainsthumanity.webp';
import wingspanImage from '../pictures/wingspan.jpeg';
import ticketToRideImage from '../pictures/TicketToRide.webp';
import azulImage from '../pictures/azul.jpg';
import pandemicImage from '../pictures/pandemic.webp';
import disturbedFriendsImage from '../pictures/distuberedFriends.webp';
import jokingHazardImage from '../pictures/JokingHazard.webp';
import incoherentImage from '../pictures/incoherent.jpg';
import camelUpImage from '../pictures/camelup.jpg';
import tokyoHighwayImage from '../pictures/tokyohighway.webp';
import terraformingMarsImage from '../pictures/terraformingMars.avif';
import splendorImage from '../pictures/splendor.webp';
import whatDoYouMemeImage from '../pictures/whatdoyoumeme.webp';
import explodingKittensImage from '../pictures/explodingkittens.webp';
import redFlagsImage from '../pictures/redflags.jpg';
import throwThrowBurritoImage from '../pictures/throwthrowburrito.jpg';
import nightOfTheNinjaImage from '../pictures/nightoftheninja.webp';
import justOneImage from '../pictures/justone.webp';
import unoImage from '../pictures/uno.webp';
import fluxxImage from '../pictures/fluxx.jpeg';
import theMindImage from '../pictures/themind.webp';
import brassBirminghamImage from '../pictures/brassbirmingham.webp';
import codenamesImage from '../pictures/codesnames.jpg';
import monopolyImage from '../pictures/monopoly.jpg';
import scrabbleImage from '../pictures/scrabble.webp';
import kingOfTokyoImage from '../pictures/kingoftoyko.webp';
import loveLetterImage from '../pictures/loveletter.webp';
import dixitImage from '../pictures/dixit.webp';
import yahtzeeImage from '../pictures/yatzy.jpg';
import sushiGoImage from '../pictures/sushigo.webp';
import machiKoroImage from '../pictures/IDW6650_1.webp';
import clueImage from '../pictures/clue.jpg';
import betrayalImage from '../pictures/betrayal.jpg';
import gloomhavenImage from '../pictures/gloomhaven.jpg';
import riskImage from '../pictures/risk.avif';
import pictionaryImage from '../pictures/pictionary.jpg';
import munchkinImage from '../pictures/munchkin.webp';
import spotItImage from '../pictures/spotit.png';
import hitsterImage from '../pictures/hitster.webp';

export const boardGames: Game[] = [
  {
    id: '1',
    name: 'Catan',
    description: 'Trade, build, and settle the island of Catan in this modern classic. Compete for resources and build the best settlements and cities.',
    players: '3-4',
    playTime: '60-90 minutes',
    difficulty: 3,
    learningCurve: 2,
    category: ['Strategy', 'Trading', 'Family'],
    image: catanImage, // Using imported image
    youtubeUrl: 'https://www.youtube.com/watch?v=oiQ6SgBzfqY&pp=ygURY2F0YW4gaG93IHRvIHBsYXk%3D',
    manualUrl: 'https://www.catan.com/sites/default/files/2021-06/catan_base_rules_2020_200707.pdf',
    rating: 4.5
  },
  {
    id: '2',
    name: 'Cards Against Humanity',
    description: 'A party game for horrible people. Fill in the blanks with the most outrageous combinations possible.',
    players: '4-20+',
    playTime: '30-60 minutes',
    difficulty: 1,
    learningCurve: 1,
    category: ['Party', 'Humor', 'Adult'],
    image: cardsAgainstHumanityImage, // Using imported image
    youtubeUrl: 'https://www.youtube.com/watch?v=QCEqUn7If44',
    manualUrl: 'https://s3.amazonaws.com/cah/CAH_Rules.pdf',
    rating: 4.2
  },
  {
    id: '3',
    name: 'Wingspan',
    description: 'Attract birds to your wildlife preserves in this beautiful engine-building game. Each bird played extends a chain of powerful combinations.',
    players: '1-5',
    playTime: '40-70 minutes',
    difficulty: 3,
    learningCurve: 3,
    category: ['Strategy', 'Engine Building', 'Nature'],
    image: wingspanImage, // Using imported image
    youtubeUrl: 'https://www.youtube.com/watch?v=lgDgcLI2B0U',
    manualUrl: 'https://stonemaiergames.com/games/wingspan/rules/',
    rating: 4.7
  },
  // Continue with all other games using imported images...
  {
    id: '4',
    name: 'Ticket to Ride',
    description: 'Collect train cards and claim railway routes across the country. Connect cities and complete destination tickets for points.',
    players: '2-5',
    playTime: '30-60 minutes',
    difficulty: 2,
    learningCurve: 2,
    category: ['Strategy', 'Route Building', 'Family'],
    image: ticketToRideImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=qHmf1bau9xQ',
    manualUrl: 'https://ncdn0.daysofwonder.com/tickettoride/en/img/tt_rules_2015_en.pdf',
    rating: 4.4
  },
  {
    id: '5',
    name: 'Azul',
    description: 'Create beautiful tile patterns inspired by Portuguese azulejos. Draft tiles strategically and avoid waste to score the most points.',
    players: '2-4',
    playTime: '30-45 minutes',
    difficulty: 2,
    learningCurve: 2,
    category: ['Strategy', 'Tile Placement', 'Abstract'],
    image: azulImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=193R2h2M3Yk&ab_channel=TripleSGames',
    manualUrl: 'https://tesera.ru/images/items/1108676/EN-Azul-Rules.pdf',
    rating: 4.6
  },
  {
    id: '6',
    name: 'Pandemic',
    description: 'Work together as disease experts to treat infections and find cures before four diseases outbreak and end humanity.',
    players: '2-4',
    playTime: '45-60 minutes',
    difficulty: 3,
    learningCurve: 3,
    category: ['Cooperative', 'Strategy', 'Medical'],
    image: pandemicImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=63Ha1ktxvoY&ab_channel=Geek%26Sundry',
    manualUrl: 'https://cdn.svc.asmodee.net/production-zman/uploads/2024/09/Pandemic_Rulebook.pdf',
    rating: 4.3
  },
  {
    id: '7',
    name: 'Disturbed Friends',
    description: 'A party game designed to find out how disturbed your friends are, but, more importantly, how disturbed they think you are.',
    players: '4-10',
    playTime: '30-60 minutes',
    difficulty: 1,
    learningCurve: 1,
    category: ['Party', 'Adult Humor', 'Social'],
    image: disturbedFriendsImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=tMrZVG2hQz8&ab_channel=HighlyRecommendedProducts',
    manualUrl: 'https://www.disturbedfriends.com/',
    rating: 4.1
  },
  {
    id: '8',
    name: 'Joking Hazard',
    description: 'Create funny and offensive comic strips using cards with cartoon panels in this party game from the creators of Cyanide & Happiness.',
    players: '3-10',
    playTime: '30-90 minutes',
    difficulty: 1,
    learningCurve: 1,
    category: ['Party', 'Adult Humor', 'Creative'],
    image: jokingHazardImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=VHquyO11uSM&ab_channel=RundliiGaming',
    manualUrl: 'https://www.kickstarter.com/projects/explosm/joking-hazard',
    rating: 4.2
  },
  {
    id: '9',
    name: 'Incohearent',
    description: 'A party game where players compete to decode ridiculous phrases by reading them exactly as written to figure out what they actually mean.',
    players: '2-8',
    playTime: '30-45 minutes',
    difficulty: 2,
    learningCurve: 1,
    category: ['Party', 'Word Game', 'Social'],
    image: incoherentImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=psFtfrNSWvM&ab_channel=PsyCatGames',
    manualUrl: 'https://www.whatdoyoumeme.com/products/incohearent',
    rating: 3.9
  },
  {
    id: '10',
    name: 'Camel Up',
    description: 'A hilarious camel racing game where players bet on crazy camel races with camels that can stack on top of each other.',
    players: '2-8',
    playTime: '20-30 minutes',
    difficulty: 2,
    learningCurve: 2,
    category: ['Family', 'Racing', 'Betting'],
    image: camelUpImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=ylpy5i7_w5s&t=78s&ab_channel=TheCasualGamers',
    manualUrl: 'https://cdn.1j1ju.com/medias/8b/c6/82-camel-up-rulebook.pdf',
    rating: 4.0
  },
  {
    id: '11',
    name: 'Tokyo Highway',
    description: 'A dexterity game where players build intersecting highway systems and score points by placing cars on roads that pass over or under other roads.',
    players: '2-4',
    playTime: '30-45 minutes',
    difficulty: 2,
    learningCurve: 2,
    category: ['Dexterity', 'Construction', 'Abstract'],
    image: tokyoHighwayImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=lBokX76WH_Q',
    manualUrl: 'https://www.itten-games.com/wp-content/uploads/2019/02/TOKYO_HIGHWAY_rule_en.pdf',
    rating: 4.2
  },
  {
    id: '12',
    name: 'Terraforming Mars',
    description: 'Compete as corporations to terraform Mars by raising temperature, oxygen, and ocean levels while developing infrastructure and cities.',
    players: '1-5',
    playTime: '90-120 minutes',
    difficulty: 4,
    learningCurve: 4,
    category: ['Strategy', 'Engine Building', 'Science Fiction'],
    image: terraformingMarsImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=n3yVpsiVwL8',
    manualUrl: 'https://cdn.1j1ju.com/medias/13/3f/fb-terraforming-mars-rule.pdf',
    rating: 4.5
  },
  {
    id: '13',
    name: 'Splendor',
    description: 'Build a gem trading empire by collecting gems to purchase development cards that provide permanent bonuses and prestige points.',
    players: '2-4',
    playTime: '30 minutes',
    difficulty: 2,
    learningCurve: 2,
    category: ['Strategy', 'Engine Building', 'Economic'],
    image: splendorImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=6Rk4nKEYrhY&ab_channel=GamePoint',
    manualUrl: 'https://cdn.1j1ju.com/medias/7f/91/ba-splendor-rulebook.pdf',
    rating: 4.1
  },
  {
    id: '14',
    name: 'What Do You Meme?',
    description: 'A party game for the social media generation where players create the funniest memes by pairing caption cards with photo cards.',
    players: '3-20',
    playTime: '30-45 minutes',
    difficulty: 1,
    learningCurve: 1,
    category: ['Party', 'Social Media', 'Humor'],
    image: whatDoYouMemeImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=UaWOmfuzcTY&ab_channel=TripleSGames',
    manualUrl: 'https://cdn.1j1ju.com/medias/e9/94/bd-what-do-you-meme-rulebook.pdf',
    rating: 3.8
  },
  {
    id: '15',
    name: 'Exploding Kittens',
    description: 'A strategic card game about exploding kittens and all the goats, magical enchiladas, and sandwich-stealing backhairs needed to avoid them.',
    players: '2-5',
    playTime: '15 minutes',
    difficulty: 1,
    learningCurve: 1,
    category: ['Card Game', 'Party'],
    image: explodingKittensImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=O3BDwMx3FpE&ab_channel=TripleSGames',
    manualUrl: 'https://ek.explodingkittens.com/downloads/rules/EK_Party_Pack-Rules_wAttack.pdf',
    rating: 3.7
  },
  {
    id: '16',
    name: 'Red Flags',
    description: 'A party game about convincing your friends to go on terrible dates by creating dating profiles with great and awful traits.',
    players: '3-10',
    playTime: '30-45 minutes',
    difficulty: 1,
    learningCurve: 1,
    category: ['Party', 'Adult Humor', 'Social'],
    image: redFlagsImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    manualUrl: 'https://www.youtube.com/watch?v=ssj3rGZpvfg&ab_channel=MatMousallam',
    rating: 4.0
  },
  {
    id: '17',
    name: 'Throw Throw Burrito',
    description: 'The world\'s first dodgeball card game where players collect cards, play their hand, and throw squishy foam burritos at each other.',
    players: '2-6',
    playTime: '15 minutes',
    difficulty: 1,
    learningCurve: 1,
    category: ['Party', 'Action'],
    image: throwThrowBurritoImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=I4Kq-H902uo&ab_channel=ExplodingKittens',
    manualUrl: 'https://dumekj556jp75.cloudfront.net/ttb/burrito-english.pdf',
    rating: 4.1
  },
  {
    id: '18',
    name: 'Night of the Ninja',
    description: 'A strategic game where players move their ninjas across a board to collect treasures while staying hidden from other players.',
    players: '2-4',
    playTime: '20-40 minutes',
    difficulty: 2,
    learningCurve: 2,
    category: ['Strategy', 'Family'],
    image: nightOfTheNinjaImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=QHRunh6PyjQ&ab_channel=BrotherwiseGames',
    manualUrl: 'https://fgbradleys.com/wp-content/uploads/Night-of-the-Ninja-Rulebook.pdf?srsltid=AfmBOooZx2g0JM9cCf89sNS1xgwADHp8zP_tVip9G1E3RcqmUROCSkEB',
    rating: 3.9
  },
  {
    id: '19',
    name: 'Just One',
    description: 'A cooperative word game where all players work together to discover as many mystery words as possible by writing one-word clues.',
    players: '3-8',
    playTime: '20 minutes',
    difficulty: 1,
    learningCurve: 1,
    category: ['Party', 'Cooperative', 'Word Game', 'Drawing'],
    image: justOneImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=4ulLmUQ7omU&ab_channel=AsmodeeNorthAmerica',
    manualUrl: 'https://cdn.1j1ju.com/medias/1f/0e/8f-just-one-rulebook.pdf',
    rating: 4.2
  },
  {
    id: '20',
    name: 'UNO',
    description: 'The classic card game where players race to empty their hand by matching colors, numbers, or symbols while using action cards to disrupt opponents.',
    players: '2-10',
    playTime: '30 minutes',
    difficulty: 1,
    learningCurve: 1,
    category: ['Card Game', 'Family'],
    image: unoImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=FkuqYtE1rw0&ab_channel=TripleSGames',
    manualUrl: 'https://www.mattelgames.com/en-us/cards/uno',
    rating: 3.5
  },
  {
    id: '21',
    name: 'Fluxx',
    description: 'A card game where the rules constantly change as you play, with goals that shift and new rules that are added throughout the game.',
    players: '2-6',
    playTime: '10-40 minutes',
    difficulty: 2,
    learningCurve: 2,
    category: ['Card Game', 'Family'],
    image: fluxxImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=VtNtUzx7dnY&ab_channel=Boardgaimz',
    manualUrl: 'https://www.looneylabs.com/games/fluxx',
    rating: 3.6
  },
  {
    id: '22',
    name: 'The Mind',
    description: 'A silent cooperative card game where players must play cards in ascending order without communicating, relying on intuition and timing.',
    players: '2-4',
    playTime: '20 minutes',
    difficulty: 2,
    learningCurve: 2,
    category: ['Cooperative', 'Card Game'],
    image: theMindImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=uXl8MC0GMYE&t=448s&ab_channel=WatchItPlayed',
    manualUrl: 'https://thesolomeeple.com/2019/11/12/the-mind/',
    rating: 4.1
  },
  {
    id: '23',
    name: 'Brass: Birmingham',
    description: 'Build networks, grow industries, and navigate the world of the Industrial Revolution in this economic strategy masterpiece.',
    players: '2-4',
    playTime: '60-120 minutes',
    difficulty: 5,
    learningCurve: 5,
    category: ['Strategy', 'Economic','Tile Placement'],
    image: brassBirminghamImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=Lzxf4tfq9as&t=275s&ab_channel=WatchItPlayed',
    manualUrl: 'https://cdn.1j1ju.com/medias/60/39/64-brass-birmingham-rulebook.pdf',
    rating: 4.7
  },
  {
    id: '24',
    name: 'Codenames',
    description: 'Two teams compete to identify their field agents using one-word clues in this brilliant word-based deduction game.',
    players: '2-8',
    playTime: '15-30 minutes',
    difficulty: 2,
    learningCurve: 2,
    category: ['Party', 'Word Game', 'Deduction'],
    image: codenamesImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=cueZnzkSL20&ab_channel=CardboardCrashCourse',
    manualUrl: 'https://www.czechgames.com/games/codenames#downloads',
    rating: 4.3
  },
  {
    id: '25',
    name: 'Monopoly',
    description: 'The classic property trading game where players buy, sell, and develop properties to bankrupt their opponents.',
    players: '2-8',
    playTime: '60-180 minutes',
    difficulty: 2,
    learningCurve: 2,
    category: ['Family', 'Economic', 'Classic'],
    image: monopolyImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=AuWvMgYv03g&ab_channel=GatherTogetherGames',
    manualUrl: 'https://www.hasbro.com/common/instruct/00009.pdf',
    rating: 3.2
  },
  {
    id: '26',
    name: 'Scrabble',
    description: 'Form words on the board using letter tiles to score points. Premium squares multiply your score in this classic word game.',
    players: '2-4',
    playTime: '60-90 minutes',
    difficulty: 3,
    learningCurve: 2,
    category: ['Word Game', 'Family', 'Classic'],
    image: scrabbleImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=A9fJT13NT6g&ab_channel=TripleSGames',
    manualUrl: 'https://www.hasbro.com/common/instruct/Scrabble_(2003).pdf',
    rating: 3.8
  },
  {
    id: '27',
    name: 'King of Tokyo',
    description: 'Play as mutant monsters competing for dominance of Tokyo through dice rolling, card buying, and strategic mayhem.',
    players: '2-6',
    playTime: '30-45 minutes',
    difficulty: 2,
    learningCurve: 2,
    category: ['Dice Rolling', 'Family'],
    image: kingOfTokyoImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=_cwIdBgA_MQ&ab_channel=GamesMadeEasy',
    manualUrl: 'https://cdn.1j1ju.com/medias/f9/2f/9b-king-of-tokyo-rulebook.pdf',
    rating: 4.1
  },
  {
    id: '28',
    name: 'Love Letter',
    description: 'A quick deduction game where players use cards to deliver their letter to the princess while eliminating other suitors.',
    players: '2-4',
    playTime: '10-15 minutes',
    difficulty: 1,
    learningCurve: 1,
    category: ['Card Game', 'Deduction', 'Family'],
    image: loveLetterImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=RiQ2To5KWJM&ab_channel=WatchItPlayed',
    manualUrl: 'https://cdn.svc.asmodee.net/production-zman/uploads/2024/09/LL_Rulebook_with_Bag-1.pdf',
    rating: 3.9
  },
  {
    id: '29',
    name: 'Dixit',
    description: 'A beautifully illustrated storytelling game where players give clues to abstract art cards and try to guess correctly.',
    players: '3-8',
    playTime: '30-45 minutes',
    difficulty: 2,
    learningCurve: 2,
    category: ['Party','Mystery'],
    image: dixitImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=Qi4MoW6NuaQ&ab_channel=TripleSGames',
    manualUrl: 'https://cdn.1j1ju.com/medias/8f/03/3d-dixit-rulebook.pdf',
    rating: 4.2
  },
  {
    id: '30',
    name: 'Yahtzee',
    description: 'Roll five dice to make combinations and score points in this classic dice game of luck and strategy.',
    players: '2-10',
    playTime: '30 minutes',
    difficulty: 1,
    learningCurve: 1,
    category: ['Dice Rolling', 'Family', 'Classic'],
    image: yahtzeeImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=AHDgpuEzopc',
    manualUrl: 'https://info.lite.games/en/support/solutions/articles/60000688821-yatzy-rules',
    rating: 3.4
  },
  {
    id: '31',
    name: 'Sushi Go!',
    description: 'A fast-playing card drafting game where you pick sushi dishes to create the most delicious meal combinations.',
    players: '2-5',
    playTime: '15 minutes',
    difficulty: 1,
    learningCurve: 1,
    category: ['Card Game', 'Family'],
    image: sushiGoImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=-WO1cP9wzrw&ab_channel=GamesExplained',
    manualUrl: 'https://cdn.1j1ju.com/medias/e5/92/74-sushi-go-rulebook.pdf',
    rating: 4.0
  },
  {
    id: '32',
    name: 'Machi Koro',
    description: 'Roll dice to activate buildings in your city and collect coins to build landmarks in this charming city-building game.',
    players: '2-4',
    playTime: '30 minutes',
    difficulty: 2,
    learningCurve: 2,
    category: ['Dice Rolling', 'Strategy', 'Family'],
    image: machiKoroImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=X6y02IGRE-U&ab_channel=WatchItPlayed',
    manualUrl: 'https://cdn.1j1ju.com/medias/89/cb/e8-machi-koro-rulebook.pdf',
    rating: 3.8
  },
  {
    id: '33',
    name: 'Clue',
    description: 'Solve the murder mystery by deducing who committed the crime, where, and with what weapon in this classic detective game.',
    players: '3-6',
    playTime: '45-60 minutes',
    difficulty: 2,
    learningCurve: 2,
    category: ['Deduction', 'Mystery', 'Classic','Dice Rolling'],
    image: clueImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=LTUFY0URGQo&ab_channel=TabletopDuo',
    manualUrl: 'https://www.hasbro.com/common/documents/dad2885d1c4311ddbd0b0800200c9a66/2BFAEC9E5056900B102C3859E9AC6332.pdf',
    rating: 3.6
  },
  {
    id: '34',
    name: 'Betrayal at House on the Hill',
    description: 'Explore a haunted house until one player becomes the traitor in this atmospheric horror game with 50 different scenarios.',
    players: '3-6',
    playTime: '60-90 minutes',
    difficulty: 3,
    learningCurve: 3,
    category: ['Horror', 'Exploration', 'Betrayal'],
    image: betrayalImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=hG9XL4zQ2Ck',
    manualUrl: 'https://boardgame.bg/betrayal%20at%20house%20on%20the%20hill%20rules.pdf',
    rating: 4.0
  },
  {
    id: '35',
    name: 'Gloomhaven',
    description: 'A massive tactical combat game with a persistent world, character progression, and branching storylines.',
    players: '1-4',
    playTime: '60-120 minutes',
    difficulty: 5,
    learningCurve: 5,
    category: ['Dungeon Crawler','Strategy','Cooperative'],
    image: gloomhavenImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=8jIwaVb4oXY&ab_channel=ModernCardboard',
    manualUrl: 'https://cdn.1j1ju.com/medias/8d/c5/21-gloomhaven-rulebook.pdf',
    rating: 4.8
  },
  {
    id: '36',
    name: 'Risk',
    description: 'Command armies and conquer the world in this classic strategy game of global domination and tactical warfare.',
    players: '2-6',
    playTime: '120-240 minutes',
    difficulty: 3,
    learningCurve: 3,
    category: ['Strategy','Classic'],
    image: riskImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=wr5qMMwfUMk&ab_channel=TripleSGames',
    manualUrl: 'https://www.hasbro.com/common/instruct/risk.pdf',
    rating: 3.7
  },
  {
    id: '37',
    name: 'Pictionary',
    description: 'Draw pictures to help your team guess words and phrases in this classic party game that tests artistic skills and creativity.',
    players: '3-16',
    playTime: '30-60 minutes',
    difficulty: 1,
    learningCurve: 1,
    category: ['Party', 'Drawing', 'Cooperative'],
    image: pictionaryImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=CXUWdmZv-cg',
    manualUrl: 'https://www.hasbro.com/common/instruct/pictionary.pdf',
    rating: 3.9
  },
  {
    id: '38',
    name: 'Munchkin',
    description: 'A satirical dungeon-crawling card game where players backstab friends, grab treasure, and reach level 10 first.',
    players: '3-6',
    playTime: '60-120 minutes',
    difficulty: 2,
    learningCurve: 2,
    category: ['Card Game', 'Humor','Betrayal'],
    image: munchkinImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=WTFCWILpEo8&ab_channel=RollForCrit',
    manualUrl: 'https://munchkin.game/site-munchkin/assets/files/1138/munchkin_rules-1.pdf',
    rating: 3.8
  },
  {
    id: '39',
    name: 'Spot It!',
    description: 'A fast-paced matching game where players race to find the matching symbol between any two cards.',
    players: '2-8',
    playTime: '15 minutes',
    difficulty: 1,
    learningCurve: 1,
    category: ['Party', 'Family'],
    image: spotItImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=Y6N6UmsNGsk&ab_channel=BrimleyGames',
    manualUrl: 'https://www.ipswichlibrary.org/wp-content/uploads/2021/04/IPL-LOT-Manual-Spot-It-Game-Instructions.pdf',
    rating: 4.0
  },
  {
    id: '40',
    name: 'Hitster',
    description: 'A fast-paced game which you have to guess the song between time lines',
    players: '2-99',
    playTime: '15 minutes',
    difficulty: 1,
    learningCurve: 1,
    category: ['Party', 'Family','Social Media'],
    image: hitsterImage,
    youtubeUrl: 'https://www.youtube.com/watch?v=Y_NW6iZh1O0&ab_channel=SPIELREGELNTV',
    manualUrl: 'https://nordics.hitstergame.com/sv-en/how-to-play/',
    rating: 4.0
  }
];

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  gameLink?: string;
  recommendedGames?: Game[];
}

export const gameCategories = [
 'All Games',
'Betrayal',
'Card Game',
'Classic',
'Cooperative',
'Deduction',
'Dice Rolling',
'Drawing',
'Dungeon Crawler',
'Economic',
'Engine Building',
'Exploration',
'Family',
'Horror',
'Humor',
'Mystery',
'Party',
'Route Building',
'Social Media',
'Strategy',
'Tile Placement',
'Trading'
];
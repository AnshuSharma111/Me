/**
 * Emotion Classification Utility
 * 
 * This module handles the detection of emotions in text and generates
 * appropriate poetic reflections based on the detected emotions.
 */

// Map emotions to character image filenames
const emotionToCharacterMap = {
  joy: 'happy.png',
  calm: 'drowsy.png',
  melancholy: 'depressed.png',
  anxiety: 'dazed.png',
  hope: 'happy_2.png',
  wonder: 'tipsy.png',
  gratitude: 'happy.png',
  anger: 'angry.png',
  queasy: 'queasy.png'
};

// Map emotions to ornament types
const emotionToOrnamentMap = {
  joy: 'joy-star.png',
  calm: 'calm-leaf.png',
  melancholy: 'melancholy-raindrop.png',
  anxiety: 'anxiety-mist.png',
  hope: 'hope-bubble.png',
  wonder: 'wonder-sparkle.png',
  gratitude: 'gratitude-light.png',
  anger: 'joy-star.png', // Fallback to existing ornaments
  queasy: 'calm-leaf.png' // Fallback to existing ornaments
};

// Emotion keywords for classification
const emotionKeywords = {
  joy: [
    'happy', 'joy', 'delighted', 'excited', 'pleased', 'glad', 
    'cheerful', 'content', 'thrilled', 'elated', 'wonderful',
    'great', 'amazing', 'fantastic', 'good', 'positive', 'smile',
    'laugh', 'fun', 'enjoy', 'celebration', 'delight', 'satisfaction'
  ],
  calm: [
    'calm', 'peaceful', 'relaxed', 'tranquil', 'serene', 
    'quiet', 'still', 'centered', 'balanced', 'steady',
    'composed', 'collected', 'gentle', 'easy', 'sleepy', 'drowsy',
    'rest', 'peace', 'harmony', 'balance', 'meditation', 'breath'
  ],
  melancholy: [
    'sad', 'melancholy', 'blue', 'down', 'unhappy', 'somber',
    'gloomy', 'wistful', 'nostalgic', 'heavy', 'low',
    'depressed', 'sorrowful', 'grief', 'miss', 'lost', 'longing',
    'regret', 'yearning', 'memory', 'tears', 'heartache'
  ],
  anxiety: [
    'anxious', 'worried', 'nervous', 'tense', 'stressed',
    'uneasy', 'afraid', 'fearful', 'concerned', 'apprehensive',
    'restless', 'agitated', 'overwhelmed', 'panic', 'dazed', 'confused',
    'dread', 'uncertainty', 'doubt', 'pressure', 'racing'
  ],
  hope: [
    'hope', 'optimistic', 'looking forward', 'anticipate', 'expect',
    'promising', 'potential', 'possibility', 'future', 'better',
    'improve', 'progress', 'believe', 'faith', 'trust', 'dream',
    'aspire', 'wish', 'desire', 'tomorrow', 'horizon'
  ],
  wonder: [
    'wonder', 'awe', 'amazed', 'curious', 'fascinated',
    'intrigued', 'surprised', 'astonished', 'marveling',
    'captivated', 'spellbound', 'discovery', 'learning', 'mystery',
    'explore', 'question', 'imagine', 'possibility', 'magic'
  ],
  gratitude: [
    'grateful', 'thankful', 'appreciative', 'blessed', 'fortunate',
    'appreciate', 'thanks', 'gratitude', 'indebted', 'recognition',
    'acknowledging', 'value', 'cherish', 'lucky', 'honored',
    'privilege', 'gift', 'abundance'
  ],
  anger: [
    'angry', 'mad', 'frustrated', 'annoyed', 'irritated',
    'furious', 'enraged', 'upset', 'outraged', 'hostile',
    'resentful', 'indignant', 'irate', 'livid', 'fuming',
    'rage', 'temper', 'fury', 'hatred', 'bitter'
  ],
  queasy: [
    'sick', 'nauseous', 'queasy', 'ill', 'unwell',
    'dizzy', 'lightheaded', 'uncomfortable', 'unsettled', 'uneasy',
    'stomach', 'vomit', 'throw up', 'puke', 'nauseated',
    'discomfort', 'pain', 'ache', 'hurt', 'suffering'
  ]
};

/**
 * Detects the dominant emotion in a text using keyword analysis
 * @param {string} text - The text to analyze
 * @returns {Object} An object containing the primary emotion, intensity, and other data
 */
const detectEmotion = (text) => {
  // Normalize text
  const normalizedText = text.toLowerCase();
  
  // Initialize scores for each emotion
  const scores = Object.keys(emotionKeywords).reduce((acc, emotion) => {
    acc[emotion] = 0;
    return acc;
  }, {});
  
  // Calculate scores based on keyword matches
  Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
    keywords.forEach(keyword => {
      // Count occurrences of each keyword
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const matches = normalizedText.match(regex);
      if (matches) {
        scores[emotion] += matches.length;
      }
    });
  });
  
  // Find the dominant emotion
  let dominantEmotion = 'calm'; // Default to calm if no emotions detected
  let highestScore = 0;
  
  Object.entries(scores).forEach(([emotion, score]) => {
    if (score > highestScore) {
      highestScore = score;
      dominantEmotion = emotion;
    }
  });
  
  // Calculate intensity (0-1 scale)
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const intensity = totalScore > 0 ? Math.min(highestScore / totalScore, 1) : 0.5;
  
  // Identify significant emotions (those with non-zero scores)
  const significantEmotions = Object.entries(scores)
    .filter(([_, score]) => score > 0)
    .map(([emotion, _]) => emotion);
  
  // Determine if the entry contains mixed emotions
  const isMixed = significantEmotions.length > 1;
  
  return {
    primary: dominantEmotion,
    intensity,
    mixed: isMixed,
    emotions: scores,
    significantEmotions
  };
};

/**
 * Maps an emotion to a visual element type
 * @param {string} emotion - The emotion to map
 * @param {number} intensity - The intensity of the emotion (0-1)
 * @returns {Object} An object containing the visual element type and intensity
 */
const mapEmotionToVisual = (emotion, intensity = 0.5) => {
  const visualMap = {
    joy: 'star',
    calm: 'leaf',
    melancholy: 'raindrop',
    anxiety: 'mist',
    hope: 'bubble',
    wonder: 'sparkle',
    gratitude: 'light',
    anger: 'flash',
    queasy: 'wave'
  };
  
  return {
    type: visualMap[emotion] || 'leaf',
    intensity
  };
};

/**
 * Gets the character image filename for an emotion
 * @param {string} emotion - The emotion to get a character for
 * @returns {string} The filename of the character image
 */
const getCharacterImage = (emotion) => {
  return emotionToCharacterMap[emotion] || 'happy.png';
};

/**
 * Gets the ornament image filename for an emotion
 * @param {string} emotion - The emotion to get an ornament for
 * @returns {string} The filename of the ornament image
 */
const getOrnamentImage = (emotion) => {
  return emotionToOrnamentMap[emotion] || 'calm-leaf.png';
};

/**
 * Generates a poetic reflection based on the detected emotion
 * @param {string} emotion - The emotion to generate a reflection for
 * @param {number} intensity - The intensity of the emotion (0-1)
 * @returns {string} A poetic reflection
 */
const generateReflection = (emotion, intensity = 0.5) => {
  const reflections = {
    joy: [
      "The light you carry today\ndances like morning dew,\neach moment a small celebration\nof being wonderfully you.",
      "Joy rises in you like birdsong,\na melody that colors the air\nwith the bright hues of possibility.",
      "Today's happiness sparkles\nlike sunlight on water,\ncreating patterns of light\nthat illuminate from within."
    ],
    calm: [
      "The quiet steps you took today\necho in the chambers of tomorrow.\nEach breath, a gentle reminder\nof your presence in this moment.",
      "In this pool of calm you've created,\nripples of peace extend outward,\ntouching all that surrounds you.",
      "Serenity settles around you\nlike morning mist on still water,\nholding space for clarity\nto emerge in its own time."
    ],
    melancholy: [
      "Some days the rain falls softly within.\nRemember: even in shadows,\nyou are growing, unseen,\nlike roots beneath quiet soil.",
      "Your melancholy is a deep river,\ncarrying memories to a distant sea.\nEven in its depths, light filters through.",
      "In the gentle ache of today,\nthere is a wisdom that whispers\nof the fullness of being human,\nholding both shadow and light."
    ],
    anxiety: [
      "Your racing thoughts are leaves in the wind.\nWatch them flutter, acknowledge their dance,\nthen feel the steady ground beneath you,\nholding you through the storm.",
      "When anxiety circles like a restless bird,\nremember that you are the sky,\nvast enough to hold all weather.",
      "The tension you carry is a messenger,\nnot a permanent resident.\nListen to what it needs to say,\nthen let it continue on its journey."
    ],
    hope: [
      "Hope is the tender green shoot\npushing through concrete impossibility.\nYou water it with each forward step,\neach quiet belief in tomorrow.",
      "The seeds of hope you plant today\nwill grow in ways you cannot yet imagine,\nreaching toward a sun that always returns.",
      "Even in uncertainty,\nyou've held space for possibility.\nThis quiet courage\nis the lantern that lights the way forward."
    ],
    wonder: [
      "In your wondering is the ancient wisdom\nof stars and children's questions.\nThe universe expands in your curiosity,\ncreating new constellations of thought.",
      "Wonder opens doors between worlds.\nStand at this threshold and marvel\nat how much remains to be discovered,\neven within familiar landscapes.",
      "Your curiosity is a compass\npointing toward unexplored territories.\nFollow its gentle pull\ninto the mystery of what might be."
    ],
    gratitude: [
      "Gratitude turns what you have\ninto enough, and more.\nIt transforms the ordinary\ninto vessels of extraordinary light.",
      "In your thankfulness, you become\na living celebration of connection,\nacknowledging the invisible threads\nthat weave you into the fabric of everything.",
      "The appreciation you express today\nreverberates like a bell's clear tone,\nreminding you of the abundance\nthat exists even in simplicity."
    ],
    anger: [
      "Your anger is a flame that speaks\nof boundaries crossed and needs unmet.\nListen to its message without judgment,\nthen let it transform into clarity.",
      "In the heat of your frustration\nlies the core of what matters to you.\nHonor this energy as it moves through,\nneither clinging nor pushing away.",
      "The fire of your indignation\nilluminates what you value most.\nLet it forge understanding\nrather than consume your peace."
    ],
    queasy: [
      "Discomfort in the body speaks\nin its own language of pause.\nHonor this moment of unease\nas your system finds its balance again.",
      "Like waves that rise and fall,\nthis feeling will not last forever.\nBreathe through the unsettled moments,\nknowing steadier shores await.",
      "When the body feels uncertain,\nit asks for gentleness and patience.\nEach moment of care you offer\nis a step toward equilibrium."
    ]
  };
  
  // Select a reflection based on emotion and intensity
  const options = reflections[emotion] || reflections.calm;
  
  // Use intensity to influence selection (higher intensity = later options)
  const index = Math.min(
    Math.floor(intensity * options.length),
    options.length - 1
  );
  
  return options[index];
};

export { 
  detectEmotion, 
  mapEmotionToVisual, 
  generateReflection, 
  getCharacterImage,
  getOrnamentImage
};
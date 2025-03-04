// Full 78-card tarot deck with detailed interpretations
// Replace the simplified tarotCards array in your main script with this complete database

const tarotCards = [
  // Major Arcana (22 cards)
  {
    id: 0,
    name: "The Fool",
    arcana: "major",
    suit: null,
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "New beginnings, innocence, spontaneity, free spirit, taking risks, beginner's mind",
      reversed: "Recklessness, foolishness, naivety, inconsideration, risk-taking, gullibility"
    },
    description: "The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner's luck, improvisation and believing in the universe."
  },
  {
    id: 1,
    name: "The Magician",
    arcana: "major",
    suit: null,
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Manifestation, resourcefulness, power, inspired action, creation, talent",
      reversed: "Manipulation, poor planning, untapped talents, trickery, illusions"
    },
    description: "The Magician represents manifestation, resourcefulness, power, inspired action, creation and personal power. The Magician has all the tools and resources available to manifest their intentions into being."
  },
  {
    id: 2,
    name: "The High Priestess",
    arcana: "major",
    suit: null,
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Intuition, sacred knowledge, divine feminine, the subconscious mind, inner voice",
      reversed: "Secrets, disconnected from intuition, withdrawal and silence, repressed feelings"
    },
    description: "The High Priestess represents secrets, mystery, intuition, wisdom, knowledge and understanding. She suggests a time for learning and listening to your intuition rather than prioritizing intellect and conscious mind."
  },
  {
    id: 3,
    name: "The Empress",
    arcana: "major",
    suit: null,
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Femininity, beauty, nature, nurturing, abundance, fertility, creation",
      reversed: "Creative block, dependence, smothering, emptiness, lack of growth"
    },
    description: "The Empress represents feminine energy, beauty, nature, nurturing, abundance and creativity. She suggests a time of growth, creation and the nurturing of ideas or relationships."
  },
  {
    id: 4,
    name: "The Emperor",
    arcana: "major",
    suit: null,
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Authority, father figure, structure, control, leadership, stability, protection",
      reversed: "Domination, rigidity, inflexibility, excessive control, tyranny, immaturity"
    },
    description: "The Emperor represents authority, structure, control, leadership, worldly power and regulation. He suggests a time for creating order and structure in your life and laying down strong foundations for the future."
  },
  {
    id: 5,
    name: "The Hierophant",
    arcana: "major",
    suit: null,
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Spiritual wisdom, religious beliefs, tradition, conformity, education, institutions",
      reversed: "Personal beliefs, unconventionality, freedom, challenging the status quo"
    },
    description: "The Hierophant represents spiritual wisdom, religious beliefs, tradition, conformity and institutions. He suggests a time for following the tried and tested route and learning from teachers or mentors."
  },
  {
    id: 6,
    name: "The Lovers",
    arcana: "major",
    suit: null,
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Love, harmony, relationships, values, choices, alignment, connection",
      reversed: "Self-love, disharmony, misalignment, imbalance, detachment, poor choices"
    },
    description: "The Lovers represents relationships, choices, alignments, love and harmony. This card suggests a time for making important decisions related to relationships or personal values."
  },
  {
    id: 7,
    name: "The Chariot",
    arcana: "major",
    suit: null,
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Control, willpower, success, determination, action, direction, focus",
      reversed: "Lack of control, lack of direction, aggression, obstacles, powerlessness"
    },
    description: "The Chariot represents control, willpower, victory, determination and overcoming obstacles. It suggests a time for taking control of your destiny and pushing forward with confidence and determination."
  },
  {
    id: 8,
    name: "Strength",
    arcana: "major",
    suit: null,
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Inner strength, courage, persuasion, influence, compassion, patience",
      reversed: "Self-doubt, weakness, insecurity, inadequacy, cowardice, low confidence"
    },
    description: "Strength represents inner strength, courage, persuasion, patience and control. It suggests a time for developing inner strength and courage to overcome obstacles with grace and determination."
  },
  {
    id: 9,
    name: "The Hermit",
    arcana: "major",
    suit: null,
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Soul searching, introspection, solitude, inner guidance, contemplation",
      reversed: "Isolation, loneliness, withdrawal, rejection, returning to society"
    },
    description: "The Hermit represents soul searching, introspection, solitude and inner guidance. It suggests a time for withdrawing from the noise of life to seek your own truth and wisdom."
  },
  {
    id: 10,
    name: "Wheel of Fortune",
    arcana: "major",
    suit: null,
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Good luck, karma, cycles, destiny, turning point, change, fortune",
      reversed: "Bad luck, negative external forces, out of control, resistance to change"
    },
    description: "The Wheel of Fortune represents good luck, karma, life cycles, destiny and change. It suggests a time when fate is at work in your life, bringing change and new opportunities."
  },
  {
    id: 11,
    name: "Justice",
    arcana: "major",
    suit: null,
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Justice, fairness, truth, cause and effect, law, integrity, clarity",
      reversed: "Unfairness, lack of accountability, dishonesty, failure of justice"
    },
    description: "Justice represents fairness, truth, cause and effect, and law. It suggests a time for truth-seeking, fairness in judgments and taking responsibility for your actions."
  },
  {
    id: 12,
    name: "The Hanged Man",
    arcana: "major",
    suit: null,
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Pause, surrender, letting go, new perspectives, suspension, sacrifice",
      reversed: "Delays, resistance, stalling, indecision, stagnation, avoiding sacrifice"
    },
    description: "The Hanged Man represents surrender, letting go, new perspectives and sacrifice. It suggests a time for pausing, surrendering to what is, and looking at things from a new perspective."
  },
  {
    id: 13,
    name: "Death",
    arcana: "major",
    suit: null,
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Endings, change, transformation, transition, letting go, release",
      reversed: "Resistance to change, inability to move on, stagnation, decay"
    },
    description: "Death represents endings, change, transformation and transition. It suggests a time for letting go of what no longer serves you to make way for new beginnings and transformation."
  },
  {
    id: 14,
    name: "Temperance",
    arcana: "major",
    suit: null,
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Balance, moderation, patience, purpose, harmony, health, integration",
      reversed: "Imbalance, excess, self-healing, realignment, lack of harmony"
    },
    description: "Temperance represents balance, moderation, patience and purpose. It suggests a time for finding middle ground, practicing patience and moving forward with purpose and calm."
  },
  {
    id: 15,
    name: "The Devil",
    arcana: "major",
    suit: null,
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Shadow self, attachment, addiction, negativity, materialism, bondage",
      reversed: "Releasing limiting beliefs, detachment, breaking free, independence"
    },
    description: "The Devil represents shadow self, attachment, addiction and restriction. It suggests a time for examining how you may be giving your power away through unhealthy attachments or beliefs."
  },
  {
    id: 16,
    name: "The Tower",
    arcana: "major",
    suit: null,
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Sudden change, upheaval, chaos, revelation, awakening, truth, destruction",
      reversed: "Fear of change, avoiding disaster, delaying the inevitable"
    },
    description: "The Tower represents sudden change, upheaval, chaos and awakening. It suggests a time of unexpected change that may feel disruptive but is ultimately clearing the way for something better."
  },
  {
    id: 17,
    name: "The Star",
    arcana: "major",
    suit: null,
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Hope, inspiration, optimism, spirituality, healing, renewal, faith",
      reversed: "Lack of faith, despair, self-doubt, disconnection, hopelessness"
    },
    description: "The Star represents hope, faith, purpose, renewal and spirituality. It suggests a time of healing, inspiration and renewed hope after a difficult period."
  },
  {
    id: 18,
    name: "The Moon",
    arcana: "major",
    suit: null,
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Illusion, fear, anxiety, subconscious, intuition, dreams, confusion",
      reversed: "Release of fear, repressed emotions, clarity, confusion subsiding"
    },
    description: "The Moon represents illusion, fear, anxiety, intuition and the subconscious. It suggests a time of confusion or uncertainty, where things may not be as they seem and intuition should be trusted."
  },
  {
    id: 19,
    name: "The Sun",
    arcana: "major",
    suit: null,
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Positivity, success, joy, vitality, enlightenment, happiness, optimism",
      reversed: "Temporary depression, lack of clarity, diminished joy, pessimism"
    },
    description: "The Sun represents success, joy, positivity and vitality. It suggests a time of happiness, clarity of mind and warm energy that brings positive outcomes and optimism."
  },
  {
    id: 20,
    name: "Judgement",
    arcana: "major",
    suit: null,
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Rebirth, inner calling, absolution, self-evaluation, awakening, renewal",
      reversed: "Self-doubt, lack of self-awareness, failure to learn lessons, denial"
    },
    description: "Judgement represents rebirth, inner calling and absolution. It suggests a time of self-evaluation, awakening to your true purpose and answering a higher calling."
  },
  {
    id: 21,
    name: "The World",
    arcana: "major",
    suit: null,
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Completion, achievement, fulfillment, travel, wholeness, harmony, integration",
      reversed: "Lack of completion, unfinished business, stagnation, delay"
    },
    description: "The World represents completion, achievement and fulfillment. It suggests a time of completion, accomplishment and the end of a cycle that brings a sense of wholeness and fulfillment."
  },
  
  // Suit of Wands (14 cards)
  {
    id: 22,
    name: "Ace of Wands",
    arcana: "minor",
    suit: "wands",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Creation, willpower, inspiration, desire, new ventures, beginnings, potential",
      reversed: "Lack of energy, lack of passion, delays, creative blocks, false starts"
    },
    description: "The Ace of Wands represents creation, willpower, inspiration and new opportunities. It signifies the initial spark of a new idea or venture that has the potential for growth."
  },
  {
    id: 23,
    name: "Two of Wands",
    arcana: "minor",
    suit: "wands",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Planning, future, discovery, progress, decisions, courage, personal power",
      reversed: "Fear of unknown, lack of planning, bad planning, disorganization, playing it safe"
    },
    description: "The Two of Wands represents planning, future thinking and making decisions. It suggests a time for carefully planning your next steps and considering the bigger picture."
  },
  {
    id: 24,
    name: "Three of Wands",
    arcana: "minor",
    suit: "wands",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Expansion, foresight, progress, overseas opportunities, exploration",
      reversed: "Obstacles, delays, frustration, lack of foresight, lack of cooperation"
    },
    description: "The Three of Wands represents expansion, foresight and overseas opportunities. It suggests a time for looking ahead, exploring your options and taking the broader view."
  },
  {
    id: 25,
    name: "Four of Wands",
    arcana: "minor",
    suit: "wands",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Celebration, harmony, marriage, home, community, reunions, joy",
      reversed: "Lack of harmony, lack of support, transition, postponed celebration"
    },
    description: "The Four of Wands represents celebration, harmony and home. It suggests a time of joy, stability and happy gatherings, often with a focus on home or community."
  },
  {
    id: 26,
    name: "Five of Wands",
    arcana: "minor",
    suit: "wands",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Conflict, competition, disagreements, tension, diversity, strife",
      reversed: "End of conflict, compromise, resolution, harmony, winning, peace"
    },
    description: "The Five of Wands represents conflict, competition and disagreements. It suggests a time of tension and competing interests that may require you to stand up for yourself."
  },
  {
    id: 27,
    name: "Six of Wands",
    arcana: "minor",
    suit: "wands",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Victory, success, public recognition, progress, achievement, triumph",
      reversed: "Failure, lack of recognition, no rewards, egotism, insecurity, fall from grace"
    },
    description: "The Six of Wands represents victory, success and public recognition. It suggests a time of achievement, well-deserved rewards and recognition for your efforts."
  },
  {
    id: 28,
    name: "Seven of Wands",
    arcana: "minor",
    suit: "wands",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Challenge, competition, perseverance, defense, protection, maintaining control",
      reversed: "Surrender, overwhelmed, giving up, exhausted, self-doubt, threatened"
    },
    description: "The Seven of Wands represents challenges, perseverance and defense. It suggests a time for standing your ground, defending your position and persevering against opposition."
  },
  {
    id: 29,
    name: "Eight of Wands",
    arcana: "minor",
    suit: "wands",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Movement, swift action, quick decisions, progress, air travel, momentum",
      reversed: "Delays, frustration, slowing down, obstacles, waiting, panic, chaos"
    },
    description: "The Eight of Wands represents swift movement, progress and quick decisions. It suggests a time of accelerated progress, fast developments and messages that may require quick action."
  },
  {
    id: 30,
    name: "Nine of Wands",
    arcana: "minor",
    suit: "wands",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Resilience, courage, persistence, strength, stamina, last stand, boundaries",
      reversed: "Exhaustion, giving up, too stubborn to quit, defensiveness, martyrdom"
    },
    description: "The Nine of Wands represents resilience, courage and persistence. It suggests a time for perseverance and drawing on your inner strength, even when you're feeling tired or battle-worn."
  },
  {
    id: 31,
    name: "Ten of Wands",
    arcana: "minor",
    suit: "wands",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Burden, responsibility, hard work, stress, overwhelmed, struggle",
      reversed: "Stress release, delegating, sharing burden, overwhelmed, burnout"
    },
    description: "The Ten of Wands represents burdens, responsibility and hard work. It suggests a time when you may be taking on too much responsibility or feeling weighed down by your obligations."
  },
  {
    id: 32,
    name: "Page of Wands",
    arcana: "minor",
    suit: "wands",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Exploration, excitement, freedom, adventure, enthusiasm, new ideas",
      reversed: "Lack of direction, procrastination, canceled plans, bad news, lack of passion"
    },
    description: "The Page of Wands represents exploration, enthusiasm and new ideas. It suggests a time of excitement, free-spirited adventure and being open to new opportunities and inspiration."
  },
  {
    id: 33,
    name: "Knight of Wands",
    arcana: "minor",
    suit: "wands",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Action, adventure, fearlessness, energy, impulsiveness, passion",
      reversed: "Anger, impulsiveness, recklessness, frustration, speed, burnout"
    },
    description: "The Knight of Wands represents action, adventure and fearlessness. It suggests a time of high energy, passion and enthusiasm, but perhaps also impulsiveness that requires careful management."
  },
  {
    id: 34,
    name: "Queen of Wands",
    arcana: "minor",
    suit: "wands",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Courage, determination, joy, vibrancy, radiance, passion, charisma",
      reversed: "Self-doubt, jealousy, insecurity, manipulation, overbearing, demanding"
    },
    description: "The Queen of Wands represents courage, determination and vibrancy. It suggests a time for expressing your passions confidently, taking the lead and inspiring others with your charisma and energy."
  },
  {
    id: 35,
    name: "King of Wands",
    arcana: "minor",
    suit: "wands",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Leadership, vision, inspiration, charisma, courage, authority, power",
      reversed: "Impulsiveness, haste, ruthlessness, power-hungry, domineering, forceful"
    },
    description: "The King of Wands represents leadership, vision and inspiration. It suggests a time for taking charge, expressing natural charisma and authority, and leading others with passion and courage."
  },
  
  // Suit of Cups (14 cards)
  {
    id: 36,
    name: "Ace of Cups",
    arcana: "minor",
    suit: "cups",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "New feelings, spirituality, intuition, love, compassion, creativity, emotional fulfillment",
      reversed: "Emotional loss, blocked creativity, emptiness, feeling unloved, repressed feelings"
    },
    description: "The Ace of Cups represents new feelings, spirituality and emotional fulfillment. It suggests a time of new emotional beginnings, whether in love, creativity or spiritual growth."
  },
  {
    id: 37,
    name: "Two of Cups",
    arcana: "minor",
    suit: "cups",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Unity, partnership, attraction, connection, close bonds, joining forces",
      reversed: "Separation, rejection, imbalance, tension, bad communication, disconnection"
    },
    description: "The Two of Cups represents partnership, attraction and connection. It suggests a time of forming meaningful bonds, finding harmony in relationships and uniting with others."
  },
  {
    id: 38,
    name: "Three of Cups",
    arcana: "minor",
    suit: "cups",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Celebration, friendship, joy, creativity, collaboration, community",
      reversed: "Overindulgence, excess, gossip, isolation, lonely, exclusion, end of friendship"
    },
    description: "The Three of Cups represents celebration, friendship and collaboration. It suggests a time of joyful gatherings, community support and celebrating life's pleasures with others."
  },
  {
    id: 39,
    name: "Four of Cups",
    arcana: "minor",
    suit: "cups",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Apathy, contemplation, disconnection, reevaluation, meditation, boredom",
      reversed: "Clarity, awareness, acceptance, new opportunities, movement, forward focus"
    },
    description: "The Four of Cups represents apathy, contemplation and disconnection. It suggests a time of introspection, withdrawal and reevaluation, possibly indicating a need to look beyond current limitations."
  },
  {
    id: 40,
    name: "Five of Cups",
    arcana: "minor",
    suit: "cups",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Loss, grief, disappointment, regret, failure, pessimism, self-pity",
      reversed: "Acceptance, moving on, finding peace, forgiveness, looking forward"
    },
    description: "The Five of Cups represents loss, grief and disappointment. It suggests a time of emotional pain and suggests the need to acknowledge what has been lost while also recognizing what remains."
  },
  {
    id: 41,
    name: "Six of Cups",
    arcana: "minor",
    suit: "cups",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Nostalgia, memories, innocence, reunion, childhood, goodwill, comfort",
      reversed: "Stagnation, escaping reality, unrealistic, being stuck in the past, naive"
    },
    description: "The Six of Cups represents nostalgia, memories and reunion. It suggests a time of looking back with fondness, reconnecting with people from your past, or recapturing the innocence and joy of childhood."
  },
  {
    id: 42,
    name: "Seven of Cups",
    arcana: "minor",
    suit: "cups",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Choices, fantasy, imagination, illusion, opportunity, wishful thinking",
      reversed: "Clarity, focus, determination, decisions, commitment, avoiding distractions"
    },
    description: "The Seven of Cups represents choices, fantasy and illusion. It suggests a time of many options that may seem appealing but require careful discernment to separate fantasy from reality."
  },
  {
    id: 43,
    name: "Eight of Cups",
    arcana: "minor",
    suit: "cups",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Walking away, disillusionment, leaving behind, seeking deeper meaning, abandonment",
      reversed: "Confusion, aimless drifting, fear of change, fear of loss, staying in a bad situation"
    },
    description: "The Eight of Cups represents walking away, disillusionment and seeking deeper meaning. It suggests a time of emotional transition, where you may need to leave behind what is familiar but unfulfilling."
  },
  {
    id: 44,
    name: "Nine of Cups",
    arcana: "minor",
    suit: "cups",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Contentment, satisfaction, gratitude, wish come true, abundance, happiness",
      reversed: "Materialism, dissatisfaction, greed, unfulfilled wishes, smugness"
    },
    description: "The Nine of Cups represents contentment, satisfaction and wishes fulfilled. It suggests a time of emotional wellbeing, gratitude and enjoying the abundance in your life."
  },
  {
    id: 45,
    name: "Ten of Cups",
    arcana: "minor",
    suit: "cups",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Harmony, fulfillment, happiness, alignment of values, family, community, peace",
      reversed: "Disconnection, misaligned values, dysfunctional family, external facade"
    },
    description: "The Ten of Cups represents harmony, fulfillment and happiness. It suggests a time of emotional fulfillment, particularly in family and community, with a sense of peace and alignment with your values."
  },
  {
    id: 46,
    name: "Page of Cups",
    arcana: "minor",
    suit: "cups",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Creativity, intuition, sensitivity, new ideas, artistic pursuits, good news",
      reversed: "Emotional immaturity, creative blocks, mood swings, emotional manipulation"
    },
    description: "The Page of Cups represents creativity, intuition and sensitivity. It suggests a time of emotional renewal, creative inspiration and openness to new feelings or intuitive messages."
  },
  {
    id: 47,
    name: "Knight of Cups",
    arcana: "minor",
    suit: "cups",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Romance, charm, imagination, idealism, seeking meaning, following the heart",
      reversed: "Moodiness, disappointment, emotional manipulation, withdrawal, unrealistic"
    },
    description: "The Knight of Cups represents romance, charm and idealism. It suggests a time of following your heart, pursuing creative or romantic quests, and bringing imagination into reality."
  },
  {
    id: 48,
    name: "Queen of Cups",
    arcana: "minor",
    suit: "cups",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Compassion, nurturing, intuition, empathy, emotional security, healing",
      reversed: "Martyrdom, insecurity, overemotional, needy, smothering, too dependent"
    },
    description: "The Queen of Cups represents compassion, nurturing and intuition. It suggests a time for leading with your heart, trusting your intuition and offering emotional support to others."
  },
  {
    id: 49,
    name: "King of Cups",
    arcana: "minor",
    suit: "cups",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Emotional balance, compassion with boundaries, emotional control, counseling",
      reversed: "Emotional manipulation, emotional volatility, moodiness, cold-heartedness"
    },
    description: "The King of Cups represents emotional balance, compassion and control. It suggests a time for mastering your emotions, offering wise counsel, and balancing heart and head in leadership."
  },
  
  // Suit of Swords (14 cards)
  {
    id: 50,
    name: "Ace of Swords",
    arcana: "minor",
    suit: "swords",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Clarity, truth, breakthrough, new perspective, mental clarity, revelation",
      reversed: "Confusion, chaos, clouded judgment, brutality, misuse of power"
    },
    description: "The Ace of Swords represents clarity, truth and new perspectives. It suggests a time of mental breakthrough, cutting through confusion, and receiving the insight or clarity needed to move forward."
  },
  {
    id: 51,
    name: "Two of Swords",
    arcana: "minor",
    suit: "swords",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Difficult choices, stalemate, indecision, truce, denial, balance, blocked emotions",
      reversed: "Decision making, avoiding confrontation, broken truce, releasing tension"
    },
    description: "The Two of Swords represents difficult choices, stalemate and blocked emotions. It suggests a time of indecision, avoiding difficult truths, or trying to maintain balance in tense situations."
  },
  {
    id: 52,
    name: "Three of Swords",
    arcana: "minor",
    suit: "swords",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Heartbreak, grief, sorrow, trauma, pain, separation, sadness, distress",
      reversed: "Recovery, moving on, healing, forgiveness, overcoming grief, reconciliation"
    },
    description: "The Three of Swords represents heartbreak, grief and emotional pain. It suggests a time of suffering, often due to separation, loss or painful truths that must be faced."
  },
  {
    id: 53,
    name: "Four of Swords",
    arcana: "minor",
    suit: "swords",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Rest, recuperation, stillness, solitude, meditation, contemplation, relaxation",
      reversed: "Restlessness, burnout, exhaustion, stagnation, awakening, readiness to act"
    },
    description: "The Four of Swords represents rest, recuperation and stillness. It suggests a time of recovery after stress or conflict, taking time out for contemplation, and giving your mind a chance to relax."
  },
  {
    id: 54,
    name: "Five of Swords",
    arcana: "minor",
    suit: "swords",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Conflict, tension, loss, defeat, win at all costs, hostility, aggressiveness",
      reversed: "Reconciliation, making amends, forgiveness, moving on, recovery"
    },
    description: "The Five of Swords represents conflict, tension and defeat. It suggests a time of disagreement, where winning may come at a cost, or where you need to decide when to walk away from a fight."
  },
  {
    id: 55,
    name: "Six of Swords",
    arcana: "minor",
    suit: "swords",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Transition, change, leaving behind, moving forward, processing, journey",
      reversed: "Resistance to change, stuck, unable to move on, baggage, return to trouble"
    },
    description: "The Six of Swords represents transition, leaving behind troubles and moving forward. It suggests a time of necessary change that may be challenging but leads to calmer waters ahead."
  },
  {
    id: 56,
    name: "Seven of Swords",
    arcana: "minor",
    suit: "swords",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Deception, strategy, sneakiness, cunning, stealth, getting away with something",
      reversed: "Exposed, caught out, coming clean, rethinking approach, consequences"
    },
    description: "The Seven of Swords represents deception, strategy and stealth. It suggests a time of acting strategically, perhaps avoiding confrontation or using cunning to achieve your aims."
  },
  {
    id: 57,
    name: "Eight of Swords",
    arcana: "minor",
    suit: "swords",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Restriction, imprisonment, victim mentality, feeling trapped, powerlessness",
      reversed: "Freedom, release, taking control, facing fears, empowerment, self-limitation"
    },
    description: "The Eight of Swords represents restriction, imprisonment and feeling trapped. It suggests a time of perceived powerlessness, where limitations may be more mental than real."
  },
  {
    id: 58,
    name: "Nine of Swords",
    arcana: "minor",
    suit: "swords",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Anxiety, worry, fear, depression, despair, nightmares, haunted, trauma",
      reversed: "Releasing fear, facing anxiety, recovery, hope, finding perspective"
    },
    description: "The Nine of Swords represents anxiety, worry and nightmares. It suggests a time of mental anguish, where fears and worries may be overwhelming, especially at night."
  },
  {
    id: 59,
    name: "Ten of Swords",
    arcana: "minor",
    suit: "swords",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Painful endings, rock bottom, failure, collapse, betrayal, crisis, wounds",
      reversed: "Recovery, regeneration, resurrection, upward movement, inevitable end"
    },
    description: "The Ten of Swords represents painful endings, rock bottom and betrayal. It suggests a time of painful conclusion that, while difficult, marks the end of difficulties and the possibility of new beginnings."
  },
  {
    id: 60,
    name: "Page of Swords",
    arcana: "minor",
    suit: "swords",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "New ideas, curiosity, mental energy, intelligence, communication, truth-seeking",
      reversed: "Deception, manipulation, gossip, impulsive communication, all talk"
    },
    description: "The Page of Swords represents new ideas, curiosity and mental energy. It suggests a time of intellectual curiosity, seeking truth, and communicating with enthusiasm and energy."
  },
  {
    id: 61,
    name: "Knight of Swords",
    arcana: "minor",
    suit: "swords",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Action, impulsiveness, defending beliefs, charging ahead, swift movement",
      reversed: "No direction, disregard for consequences, unpredictability, verbal aggression"
    },
    description: "The Knight of Swords represents action, impulsiveness and defending beliefs. It suggests a time of charging ahead with determination and focus, though possibly with too much haste."
  },
  {
    id: 62,
    name: "Queen of Swords",
    arcana: "minor",
    suit: "swords",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Independent, objective, intellectual, perceptive, direct, honest, experienced",
      reversed: "Excessive harshness, bitterness, judgment, coldness, cutting communication"
    },
    description: "The Queen of Swords represents independence, objective thinking and perception. It suggests a time for clear thinking, direct communication, and making decisions based on experience rather than emotion."
  },
  {
    id: 63,
    name: "King of Swords",
    arcana: "minor",
    suit: "swords",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Authority, intellectual power, truth, clear thinking, mental clarity, discipline",
      reversed: "Tyrannical, abusive, ruthless, manipulative, harsh judgment, cold-hearted"
    },
    description: "The King of Swords represents authority, intellectual power and truth. It suggests a time for exercising clear thinking, speaking truth, and applying discipline and ethical principles to your decisions."
  },
  
  // Suit of Pentacles (14 cards)
  {
    id: 64,
    name: "Ace of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "New financial opportunity, abundance, prosperity, security, groundedness",
      reversed: "Missed opportunity, lack of planning, instability, insecurity, material loss"
    },
    description: "The Ace of Pentacles represents new financial or material opportunities and prosperity. It suggests a time of potential abundance, security and groundedness, with practical opportunities presenting themselves."
  },
  {
    id: 65,
    name: "Two of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Balance, adaptability, juggling, flexibility, multiple priorities, time management",
      reversed: "Imbalance, disorganization, overwhelm, too many commitments, dropping balls"
    },
    description: "The Two of Pentacles represents balance, adaptability and juggling priorities. It suggests a time of managing multiple responsibilities, maintaining flexibility, and adapting to changing circumstances."
  },
  {
    id: 66,
    name: "Three of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Teamwork, collaboration, learning, implementation, mastery, expertise",
      reversed: "Lack of teamwork, disorganization, competition, poor craftsmanship, discord"
    },
    description: "The Three of Pentacles represents teamwork, collaboration and developing skills. It suggests a time of working with others to create something of quality, learning from experts, and being recognized for your skills."
  },
  {
    id: 67,
    name: "Four of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Security, conservatism, scarcity, control, wealth, stability, possession",
      reversed: "Generosity, giving, spending, insecurity, greed, materialism"
    },
    description: "The Four of Pentacles represents security, control and conservatism with resources. It suggests a time of seeking stability and protection, though possibly at the risk of being too controlling or focused on material possessions."
  },
  {
    id: 68,
    name: "Five of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Financial loss, poverty, insecurity, worry, isolation, feeling abandoned",
      reversed: "Recovery, support, spiritual wealth, new chances, attention to finances"
    },
    description: "The Five of Pentacles represents financial hardship, poverty and insecurity. It suggests a time of material struggle or worry, but also indicates that help may be available if you're willing to seek it."
  },
  {
    id: 69,
    name: "Six of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Generosity, charity, giving, receiving, sharing, support, gratitude",
      reversed: "Debt, obligation, one-sided giving, selfish charity, strings attached, exploitation"
    },
    description: "The Six of Pentacles represents generosity, charity and sharing wealth. It suggests a time of giving or receiving help, finding balance in financial relationships, and experiencing material harmony."
  },
  {
    id: 70,
    name: "Seven of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Patience, endurance, investment, slow growth, perseverance, evaluation",
      reversed: "Impatience, poor planning, unfinished work, laziness, poor investments"
    },
    description: "The Seven of Pentacles represents patience, endurance and evaluation of long-term efforts. It suggests a time of waiting for investments to grow, reviewing progress, and deciding whether to continue on your current path."
  },
  {
    id: 71,
    name: "Eight of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Skill development, craftsmanship, quality, learning, education, achievement",
      reversed: "Lack of focus, poor quality work, cutting corners, diminishing returns"
    },
    description: "The Eight of Pentacles represents skill development, craftsmanship and dedication to quality. It suggests a time of learning, developing expertise, and committing to producing quality work through diligence and attention to detail."
  },
  {
    id: 72,
    name: "Nine of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Luxury, financial independence, self-sufficiency, prosperity, refinement, reward",
      reversed: "Superficiality, showiness, living beyond means, insecurity, materialism"
    },
    description: "The Nine of Pentacles represents luxury, self-sufficiency and enjoying the fruits of your labor. It suggests a time of financial independence, being comfortable with solitude, and appreciating the finer things in life."
  },
  {
    id: 73,
    name: "Ten of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Legacy, inheritance, family, long-term success, contribution, wealth, retirement",
      reversed: "Family conflicts, financial failure, loss of legacy, bankruptcy, instability"
    },
    description: "The Ten of Pentacles represents legacy, inheritance and long-term success. It suggests a time of family wealth, security that extends beyond yourself, and the establishment of something that will last beyond your lifetime."
  },
  {
    id: 74,
    name: "Page of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Manifestation, study, new opportunity, planning, reliability, curiosity",
      reversed: "Poor focus, lack of commitment, unreliability, daydreaming, impracticality"
    },
    description: "The Page of Pentacles represents manifestation, planning and new opportunities in material matters. It suggests a time of curiosity about practical skills, reliable efforts towards goals, and manifesting ideas into reality."
  },
  {
    id: 75,
    name: "Knight of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Hard work, reliability, routine, conservatism, methodical approach, diligence",
      reversed: "Boredom, feeling stuck, perfectionism, workaholic, procrastination, dull"
    },
    description: "The Knight of Pentacles represents hard work, reliability and methodical progress. It suggests a time of steady effort, patient dedication to routine, and making progress through persistence rather than speed."
  },
  {
    id: 76,
    name: "Queen of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Nurturing, abundance, financial security, practicality, homemaker, provider",
      reversed: "Materialism, self-centeredness, jealousy, smothering, insecurity, codependency"
    },
    description: "The Queen of Pentacles represents nurturing, abundance and practicality. It suggests a time of creating comfort and security, balancing material and emotional needs, and nurturing prosperity for yourself and those you care about."
  },
  {
    id: 77,
    name: "King of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    image: "https://api.placeholder.com/120/210",
    meaning: {
      upright: "Wealth, leadership, security, stability, abundance, material success, enterprise",
      reversed: "Greed, materialism, corruption, cruelty, bad financial decisions, inflexibility"
    },
    description: "The King of Pentacles represents wealth, leadership and security in material matters. It suggests a time of exercising sound financial judgment, establishing stability, and enjoying the rewards of hard work and wise investments."
  }
];

// Enhanced spread meanings to improve card interpretations
const spreadMeanings = {
  "single-card": [
    {
      position: "Insight",
      description: "A single card to provide insight into your current situation or question.",
      interpretation: {
        upright: {
          major: "This card represents a significant force or energy affecting your situation.",
          wands: "Focused energy and passion are influencing your path.",
          cups: "Emotional currents are key to understanding your situation.",
          swords: "Mental clarity or conflict is central to this situation.",
          pentacles: "Material or practical considerations are most important now."
        },
        reversed: {
          major: "This energy is blocked or manifesting in unexpected ways.",
          wands: "Creative energy is being blocked or misdirected.",
          cups: "Emotional blockage or internal conflict is present.",
          swords: "Mental confusion or miscommunication is affecting you.",
          pentacles: "Material concerns may be causing stress or instability."
        }
      }
    }
  ],
  "three-card": [
    {
      position: "Past",
      description: "Influences from the past that are affecting your situation.",
      interpretation: {
        upright: {
          major: "A significant life event or lesson continues to influence you.",
          wands: "Past creative endeavors or passions set the foundation for today.",
          cups: "Emotional experiences from your past are coloring your perspective.",
          swords: "Previous mental patterns or conflicts still affect your thinking.",
          pentacles: "Your material foundation was established by past decisions."
        },
        reversed: {
          major: "You may be struggling to integrate lessons from the past.",
          wands: "Past creative blocks or passion-draining experiences affect you.",
          cups: "Unresolved emotional issues continue to create challenges.",
          swords: "Past misunderstandings or mental conflicts need resolution.",
          pentacles: "Material or practical setbacks continue to influence you."
        }
      }
    },
    {
      position: "Present",
      description: "Current energies and factors at play.",
      interpretation: {
        upright: {
          major: "You're in a significant phase of development right now.",
          wands: "Creative energy and passion are prominent in your current situation.",
          cups: "Emotional currents are strongly influencing your present experience.",
          swords: "Your mental state and communication are key factors right now.",
          pentacles: "Practical matters and material concerns are your current focus."
        },
        reversed: {
          major: "You may be resisting or misunderstanding current lessons.",
          wands: "Your creative energy may be blocked or scattered at present.",
          cups: "Emotional confusion or resistance is affecting you now.",
          swords: "Mental clarity is lacking, or communication is difficult.",
          pentacles: "Material insecurity or practical problems need attention."
        }
      }
    },
    {
      position: "Future",
      description: "Potential outcomes and energies moving forward.",
      interpretation: {
        upright: {
          major: "An important life lesson or significant event is approaching.",
          wands: "Passion and creativity will lead to new opportunities.",
          cups: "Emotional fulfillment or important relationships are developing.",
          swords: "Mental clarity and decisive action will be important.",
          pentacles: "Material growth and practical stability are on the horizon."
        },
        reversed: {
          major: "You may face challenges in learning coming life lessons.",
          wands: "Be cautious of burned-out energy or creative frustration.",
          cups: "Emotional challenges or relationship issues may emerge.",
          swords: "Mental confusion or conflict could arise if not addressed.",
          pentacles: "Financial or practical concerns may require attention."
        }
      }
    }
  ],
  "celtic-cross": [
    {
      position: "Present",
      description: "Represents your current situation and the energy surrounding it.",
      interpretation: {
        upright: {
          major: "A significant life theme or lesson is central to your situation now.",
          wands: "Creativity, passion or action is at the heart of your situation.",
          cups: "Emotional matters or relationships are central to your current experience.",
          swords: "Mental activity, communication or conflict defines your situation.",
          pentacles: "Material concerns or practical matters are your current focus."
        },
        reversed: {
          major: "You may be struggling with or resisting an important life lesson.",
          wands: "Your creative energy or passion may be blocked or misdirected.",
          cups: "Emotional confusion or relationship challenges are present.",
          swords: "Mental blocks or communication difficulties are affecting you.",
          pentacles: "Material insecurity or practical problems are your concern."
        }
      }
    },
    {
      position: "Challenge",
      description: "A challenge or obstacle that's crossing your path.",
      interpretation: {
        upright: {
          major: "You face a significant challenge related to your life journey.",
          wands: "Obstacles to your creative expression or passionate pursuits.",
          cups: "Emotional or relationship challenges are creating difficulties.",
          swords: "Mental conflicts or communication issues are creating barriers.",
          pentacles: "Material or practical concerns pose significant challenges."
        },
        reversed: {
          major: "The challenge may be internal or related to resistance to change.",
          wands: "Your own lack of energy or inspiration may be holding you back.",
          cups: "Inner emotional conflicts or self-sabotage create obstacles.",
          swords: "Mental confusion or self-defeating thoughts block your path.",
          pentacles: "Financial insecurity or practical limitations challenge you."
        }
      }
    },
    {
      position: "Foundation",
      description: "What is beneath the situation; the foundation or underlying cause.",
      interpretation: {
        upright: {
          major: "Life experiences or key lessons form the foundation of this situation.",
          wands: "Passion, creativity or spiritual experiences underlie your situation.",
          cups: "Emotional patterns or relationship history form the foundation.",
          swords: "Mental conditioning or belief systems underlie current events.",
          pentacles: "Material conditions or practical concerns are foundational."
        },
        reversed: {
          major: "Unresolved past issues may be affecting your current situation.",
          wands: "Repressed creative energy or passion may be causing problems.",
          cups: "Unaddressed emotional needs or patterns form a shaky foundation.",
          swords: "Limiting beliefs or unresolved mental conflicts underlie issues.",
          pentacles: "Material insecurity or practical problems form the foundation."
        }
      }
    },
    {
      position: "Recent Past",
      description: "Influences from the recent past that are still affecting the situation.",
      interpretation: {
        upright: {
          major: "Recent significant events continue to influence your situation.",
          wands: "Recent creative endeavors or passionate pursuits still affect you.",
          cups: "Recent emotional experiences or relationships influence you now.",
          swords: "Recent decisions or communications continue to have an impact.",
          pentacles: "Recent material developments continue to affect your situation."
        },
        reversed: {
          major: "You may be having difficulty integrating recent experiences.",
          wands: "Recent creative blocks or wasted energy still affect you.",
          cups: "Recent emotional challenges or relationship issues linger.",
          swords: "Recent mental conflicts or miscommunications affect the present.",
          pentacles: "Recent material setbacks or practical challenges persist."
        }
      }
    },
    {
      position: "Potential",
      description: "Possible outcome if you continue on your current path.",
      interpretation: {
        upright: {
          major: "You're approaching an important life lesson or significant event.",
          wands: "Your energy and creativity are leading to new possibilities.",
          cups: "Emotional growth or relationship developments are likely.",
          swords: "Mental clarity or important decisions will soon be needed.",
          pentacles: "Material progress or practical solutions are developing."
        },
        reversed: {
          major: "You may struggle with coming life lessons if you don't adjust.",
          wands: "Your energy may be scattered or wasted if you continue this way.",
          cups: "Emotional challenges or relationship issues may develop.",
          swords: "Mental confusion or conflicts may arise if not addressed.",
          pentacles: "Material or practical problems may emerge without changes."
        }
      }
    },
    {
      position: "Near Future",
      description: "What is coming in the near future.",
      interpretation: {
        upright: {
          major: "An important development or life lesson is approaching.",
          wands: "New creative opportunities or passionate pursuits are coming.",
          cups: "Emotional or relationship developments will soon emerge.",
          swords: "Mental clarity or important communications are approaching.",
          pentacles: "Material improvements or practical progress is coming soon."
        },
        reversed: {
          major: "Upcoming challenges may require adjustment to your approach.",
          wands: "Creative blocks or energy issues may emerge soon.",
          cups: "Emotional challenges or relationship issues are approaching.",
          swords: "Mental confusion or communication problems may develop.",
          pentacles: "Material concerns or practical problems may arise soon."
        }
      }
    },
    {
      position: "Self",
      description: "How you see yourself in relation to the situation.",
      interpretation: {
        upright: {
          major: "You see yourself engaged in an important life process or lesson.",
          wands: "You identify with your creative power and passionate energy.",
          cups: "You're aware of your emotional state and relationship needs.",
          swords: "You focus on your mental abilities and rational perspective.",
          pentacles: "You see yourself as practical and focused on material concerns."
        },
        reversed: {
          major: "You may be struggling to understand your role in this situation.",
          wands: "You may doubt your creative abilities or passionate drive.",
          cups: "You may be confused about your emotions or relationship needs.",
          swords: "You may doubt your mental clarity or decision-making ability.",
          pentacles: "You may be insecure about your practical skills or resources."
        }
      }
    },
    {
      position: "Environment",
      description: "External influences and how others see you.",
      interpretation: {
        upright: {
          major: "Others see you engaging with significant life experiences.",
          wands: "Your environment supports creativity and passionate action.",
          cups: "Emotional support or nurturing relationships surround you.",
          swords: "Intellectually stimulating people or clear communication are present.",
          pentacles: "Material support or practical assistance is available to you."
        },
        reversed: {
          major: "Others may misunderstand your journey or life situation.",
          wands: "Your environment may suppress your creativity or drain your energy.",
          cups: "Emotional support may be lacking or relationships may be draining.",
          swords: "Communication challenges or mental conflicts surround you.",
          pentacles: "Material support may be lacking or practical challenges abound."
        }
      }
    },
    {
      position: "Hopes/Fears",
      description: "Your hopes and fears regarding the situation.",
      interpretation: {
        upright: {
          major: "You hope for or fear significant life changes or experiences.",
          wands: "You hope for creative success or fear failure of your passions.",
          cups: "You hope for emotional fulfillment or fear emotional pain.",
          swords: "You hope for mental clarity or fear difficult truths.",
          pentacles: "You hope for material security or fear practical problems."
        },
        reversed: {
          major: "Your hopes or fears may be unrealistic or based on misconceptions.",
          wands: "You may fear creative blocks or hope unrealistically for success.",
          cups: "You may have unrealistic emotional hopes or exaggerated fears.",
          swords: "Your mental fears may be exaggerated or hopes unrealistic.",
          pentacles: "You may have unrealistic material hopes or exaggerated fears."
        }
      }
    },
    {
      position: "Outcome",
      description: "The likely outcome if all energies remain as they are.",
      interpretation: {
        upright: {
          major: "A significant life lesson or experience awaits as the outcome.",
          wands: "Creative fulfillment or passionate achievement is likely.",
          cups: "Emotional satisfaction or relationship harmony is indicated.",
          swords: "Mental clarity or resolution of conflicts is the outcome.",
          pentacles: "Material success or practical resolution is the likely result."
        },
        reversed: {
          major: "The outcome may require you to learn from challenges or setbacks.",
          wands: "Creative frustration or energy depletion may result without changes.",
          cups: "Emotional disappointment or relationship issues may develop.",
          swords: "Mental confusion or ongoing conflicts may be the outcome.",
          pentacles: "Material setbacks or practical problems may result."
        }
      }
    }
  ]
};

// AI interpretation enhancement function
function generateAIEnhancedInterpretation(cards, spreadPositions) {
  // This would normally connect to an AI service
  // For demo purposes, we're creating more detailed interpretations by combining
  // card meanings with position interpretations and adding personalized elements
  
  const personalPrompts = [
    "Consider how you might integrate this energy into your daily practice.",
    "Reflect on how this relates to your current goals and aspirations.",
    "This card suggests paying attention to how you respond emotionally to challenges.",
    "Notice how this energy manifests in your relationships with others.",
    "This indicates a need to balance your practical concerns with spiritual growth.",
    "Consider how past experiences might be influencing your perception here."
  ];
  
  const timeReferences = [
    "In the coming weeks",
    "As you move forward",
    "Throughout this process",
    "In this current cycle",
    "As you navigate this situation",
    "While working through these energies"
  ];
  
  const adviceElements = [
    "practice mindfulness around",
    "pay special attention to",
    "consciously work with",
    "be gentle with yourself regarding",
    "seek support when dealing with",
    "trust your intuition about"
  ];
  
  let interpretations = [];
  
  cards.forEach((cardData, index) => {
    if (index >= spreadPositions.length) return;
    
    const { card, position, isReversed } = cardData;
    const orientation = isReversed ? 'reversed' : 'upright';
    const spreadPosition = spreadPositions[index];
    
    // Get card type (major arcana or suit)
    let cardType = card.arcana === 'major' ? 'major' : card.suit;
    
    // Base interpretation
    let interpretation = "";
    
    // Add position-specific interpretation if available
    const positionInterpretation = spreadMeanings[position.name] && 
                                  spreadMeanings[position.name].interpretation && 
                                  spreadMeanings[position.name].interpretation[orientation] && 
                                  spreadMeanings[position.name].interpretation[orientation][cardType];
    
    if (positionInterpretation) {
      interpretation += positionInterpretation + " ";
    }
    
    // Add card meaning
    interpretation += card.meaning[orientation] + " ";
    
    // Add personalized elements
    interpretation += personalPrompts[Math.floor(Math.random() * personalPrompts.length)] + " ";
    interpretation += timeReferences[Math.floor(Math.random() * timeReferences.length)] + ", ";
    interpretation += adviceElements[Math.floor(Math.random() * adviceElements.length)] + " ";
    interpretation += (isReversed ? "the challenging aspects of this energy." : "the supportive aspects of this energy.");
    
    interpretations.push({
      position: position.name,
      card: card.name,
      orientation: orientation,
      interpretation: interpretation
    });
  });
  
  // Add overall reading synthesis
  const overallThemes = [
    "harmony between emotional and practical concerns",
    "balancing intuition with rational thinking",
    "navigating change while maintaining stability",
    "healing past wounds while moving forward",
    "building new foundations from existing resources",
    "transforming challenges into opportunities for growth"
  ];
  
  const selectedTheme = overallThemes[Math.floor(Math.random() * overallThemes.length)];
  
  const overall = `This reading highlights the importance of ${selectedTheme}. The cards suggest that your current situation involves multiple layers that require both inner reflection and concrete action. By honoring both your intuitive wisdom and practical needs, you can navigate this period with greater confidence and purpose. Notice the interconnections between different aspects of your life, as this reading indicates that addressing one area will naturally support healing and growth in others.`;
  
  return {
    individual: interpretations,
    overall: overall
  };
}

// Export the full tarot database and interpretation functions
// In a real implementation, this would be in a separate file and imported

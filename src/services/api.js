// A mock service to simulate a space AI responding to queries
const spaceKnowledge = [
    { keywords: ['hello', 'hi', 'hey', 'greetings', 'who are you', 'how are you'], text: "Greetings, Explorer! 🌌 I am your Cosmic Companion. What sector of the universe shall we explore today?" },
    { keywords: ['creator', 'who made you', 'thinkly', 'assignment'], text: "I was engineered for the Thinkly Labs frontend assignment! My primary directive is to explore the cosmos and demonstrate superior frontend UI capabilities! 🚀" },
    { keywords: ['black hole'], text: "Black holes are regions of spacetime where gravity is so strong that nothing, not even light, can escape! The boundary surrounding it is called the event horizon. There's a supermassive one at the center of our galaxy called Sagittarius A*! 🕳️" },
    { keywords: ['mars', 'red planet'], text: "Mars, the Red Planet! It's home to Olympus Mons, the tallest volcano in the solar system, and Valles Marineris, a massive canyon system. 🪐" },
    { keywords: ['speed of light'], text: "The speed of light in a vacuum is exactly 299,792,458 meters per second. That's fast enough to travel around Earth 7.5 times in a single second! ✨" },
    { keywords: ['james webb'], text: "The James Webb Space Telescope (JWST) is humanity's premier space observatory. It operates in the infrared spectrum, allowing it to see through cosmic dust and observe the very first galaxies formed after the Big Bang! 🔭" },
    { keywords: ['star'], text: "Stars are massive, luminous spheres of plasma held together by their own gravity. The closest star to Earth is our Sun! It accounts for 99.86% of the mass in our solar system. 🌟" },
    { keywords: ['alien'], text: "While we haven't found definitive proof of extraterrestrial life yet, the universe is vast! The search continues with missions targeting Mars, and icy moons like Europa and Enceladus. 👽" },
    { keywords: ['moon'], text: "Earth's Moon is our only natural satellite. It was likely formed over 4.5 billion years ago from the debris of a collision between Earth and a Mars-sized body named Theia. 🌕" },
    { keywords: ['galaxy'], text: "A galaxy is a massive, gravitationally bound system of stars, stellar remnants, interstellar gas, and dark matter. Our solar system is in the Milky Way! 🌌" },
    { keywords: ['cosmos'], text: "The cosmos is everything that exists—all of space, time, matter, and energy! The observable universe spans an incredible 93 billion light-years in diameter. ✨" },
    { keywords: ['jupiter'], text: "Jupiter is the largest planet in our solar system! Its famous Great Red Spot is a giant storm that has been raging for hundreds of years. 🌪️" },
    { keywords: ['saturn'], text: "Saturn is a gas giant instantly recognizable by its spectacular ring system, mostly made of ice particles, rocky debris, and dust. 🪐" },
    { keywords: ['earth'], text: "Earth! Our home is the only known planet to harbor life. Its unique atmosphere and liquid water make it a perfect oasis in the vastness of space. 🌍" }
];

export const generateBotResponse = async (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();

    // Look for a matching keyword in our custom knowledge base first
    // NOTE: We only want to match if it's the exact word, to avoid false positives 
    // like 'solar' triggering 'star', or 'olympus mons' triggering 'mars'.
    for (const item of spaceKnowledge) {
        if (item.keywords.some(kw => new RegExp(`\\b${kw}\\b`, 'i').test(lowerMsg))) {
            // Add artificial delay to feel like an AI
            return new Promise(resolve => setTimeout(() => resolve(item.text), 1000));
        }
    }

    // If local knowledge fails, fetch dynamically from Wikipedia API using the Summary endpoint
    try {
        const searchTopic = lowerMsg.replace(/^(what is|who is|tell me about|explain|what are|define|how do|meaning of|what does)\s+/gi, '').trim();

        if (searchTopic.length > 2) {
            // Step 1: Search Wikipedia to get the exact page title
            const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTopic)}&utf8=&format=json&origin=*`);
            const searchData = await searchRes.json();

            if (searchData.query && searchData.query.search.length > 0) {

                // Find a title that isn't a disambiguation page indicator
                let exactTitle = searchData.query.search[0].title;
                for (const item of searchData.query.search) {
                    if (!item.snippet.toLowerCase().includes("may refer to")) {
                        exactTitle = item.title;
                        break;
                    }
                }

                // Step 2: Fetch the clean, full summary text using the REST API
                const summaryRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(exactTitle)}`);
                const summaryData = await summaryRes.json();

                if (summaryData && summaryData.extract && summaryData.type !== 'disambiguation') {
                    let cleanText = summaryData.extract;

                    // Make sure it doesn't artificially cut short very brief definitions
                    const sentences = cleanText.match(/[^.!?]+[.!?]+/g) || [];
                    if (sentences.length > 2 && cleanText.length > 250) {
                        cleanText = sentences.slice(0, 2).join(' ').trim();
                    }

                    return `${cleanText} ✨`;
                }
            }
        }
    } catch (error) {
        console.error("Wikipedia API error:", error);
    }

    // Final absolute fallback
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`That's an intriguing sector of the cosmos! My sensors couldn't find a precise match for that query. Perhaps try asking about a specific planet, star, or cosmic phenomenon? 🚀`);
        }, 1000);
    });
};

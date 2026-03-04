import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { imdbId } = await req.json();
    const trimmedId = imdbId.trim();

    // ID validation
    if (!trimmedId || !/^tt\d{7,8}$/.test(trimmedId)) {
      return NextResponse.json(
        { success: false, errorMessage: "Invalid IMDb ID format. Example: tt0133093" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, errorMessage: "OpenAI API Key is missing in server setup." },
        { status: 500 }
      );
    }

    // ==========================================
    // STEP 1: Fetch REAL Poster from IMDb Public API
    // ==========================================
    let realPosterUrl = "";
    let realTitle = "";
    try {
      const imdbRes = await fetch(`https://v2.sg.media-imdb.com/suggestion/t/${trimmedId}.json`);
      const imdbData = await imdbRes.json();
      if (imdbData && imdbData.d && imdbData.d.length > 0) {
        const movieObj = imdbData.d.find(item => item.id === trimmedId) || imdbData.d[0];
        if (movieObj.i && movieObj.i.imageUrl) {
          realPosterUrl = movieObj.i.imageUrl;
          realTitle = movieObj.l;
        }
      }
    } catch (err) {
      console.log("Failed to fetch real poster from IMDb. Fallback to AI.");
    }

    // ==========================================

    // STEP 2: Ask OpenAI for Movie Intelligence Features
    // ==========================================
    const url = "https://api.openai.com/v1/chat/completions";
    const prompt = `You are an expert movie database and creative AI assistant. For the IMDb movie ID: ${trimmedId} ${realTitle ? `(Title: ${realTitle})` : ""}, return the following in JSON:
    - success (boolean)
    - errorMessage (string)
    - title (string)
    - year (string)
    - rating (string)
    - plot (string)
    - posterUrl (string)
    - cast (array of strings)
    - plotRewrites (array of objects: { genre, audience, rewrittenPlot }) for at least 3 genres/audiences: e.g. 'Romantic Comedy', 'Sci-Fi Thriller', 'For Kids'
    - characterProfiles (array of objects: { name, profile, motivation, backstory }) for main cast
    - culturalImpact (string): summary of the movie's cultural, social, or historical impact
    - triviaQuiz (array of objects: { question, options, answer }) with at least 3 quiz questions about the movie
    If the ID is invalid or unknown, return success: false and an errorMessage.`;

    const payload = {
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("OpenAI API request failed");
    }

    const result = await response.json();
    const responseText = result.choices?.[0]?.message?.content;
    if (!responseText) throw new Error("Invalid response from OpenAI");

    const data = JSON.parse(responseText);

    // ==========================================
    // STEP 3: Combine Real Poster with AI Data
    // ==========================================
    if (data.success && realPosterUrl) {
      data.posterUrl = realPosterUrl;
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, errorMessage: "Server error occurred while analyzing." },
      { status: 500 }
    );
  }
}

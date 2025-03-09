export async function GET(req) {
    try {
      // Mock data for flight recommendations (replace this with actual database/API fetch)
      const recommendedFlights = [
        { id: 1, from: "NYC", to: "LAX", airline: "Delta", price: 250 },
        { id: 2, from: "NYC", to: "ORD", airline: "United", price: 180 },
        { id: 3, from: "NYC", to: "MIA", airline: "American Airlines", price: 220 }
      ];
      
      return Response.json({ flights: recommendedFlights });
    } catch (error) {
      console.error("API Error:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  
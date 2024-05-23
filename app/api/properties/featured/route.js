import connectDB from "@/config/db";
import Property from "@/models/Property";

///Get /api/properties/featured
export const GET = async () => {
  try {
    await connectDB();

    const properties = await Property.find({
      is_featured: true,
    });

    return new Response(JSON.stringify(properties), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};

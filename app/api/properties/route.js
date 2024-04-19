import connectDB from "@/config/db";
import Property from "@/models/Property";

///Get /api/properties
export const GET = async () => {
  try {
    await connectDB();
    const properties = await Property.find({});
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    return new Response("somethhing went wrong", { status: 500 });
  }
};

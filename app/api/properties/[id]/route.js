import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
///Get /api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const property = await Property.findById(params.id);
    if (!property) return new Response("Property Not Found", { status: 404 });
    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("somethhing went wrong", { status: 500 });
  }
};
///Delete /api/properties/:id
export const Delete = async (request, { params }) => {
  try {
    await connectDB();
    const propertyId = params.id;
    const sessionUser = await getSessionUser();
    ///check for session
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id is required", { status: 401 });
    }

    const { userId } = sessionUser;

    const property = await Property.findById(propertyId);

    if (!property) return new Response("Property Not Found", { status: 404 });
    //verify ownership
    if (property?.owner.toString() !== userId) {
      return new Response("un-authorized", { status: 401 });
    }
    await property.deleteOne();

    return new Response("Property Deleted", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Somethhing went wrong", { status: 500 });
  }
};

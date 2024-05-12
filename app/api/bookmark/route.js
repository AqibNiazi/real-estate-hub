import connectDB from "@/config/db";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
export const dynamic = "force-dynamic";
export const POST = async (request) => {
  try {
    await connectDB();
    const { propertyId } = await request.json();
    const session = await getSessionUser();
    if (!session || !session?.userId) {
      return new Response("User Id is required", { status: 401 });
    }
    const { userId } = session;
    //find user from the data

    const user = await User.findById(userId);

    //check if property is already bookmarked
    let isBookmarked = user?.bookmarks?.includes(propertyId);

    let message;
    if (isBookmarked) {
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed Successfully";
      isBookmarked = false;
    } else {
      user.bookmarks.push(propertyId);
      message = "Bookmark added Successfully";
      isBookmarked = true;
    }
    await user.save();
    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", { status: 500 });
  }
};

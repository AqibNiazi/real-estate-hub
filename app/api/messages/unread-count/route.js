import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

//GET /api/messages/unread-count
export const GET = async () => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(
        JSON.stringify({ message: "You must be loggedIn to send a message" }),
        { status: 401 }
      );
    }
    //Extract user object from session user
    const { userId } = sessionUser;
    const unreadMessagesCount = await Message.countDocuments({
      recipient: userId,
      read: false,
    });

    return new Response(JSON.stringify({ count: unreadMessagesCount }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", { status: 500 });
  }
};

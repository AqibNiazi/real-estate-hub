import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

//PUT /api/messages/:id
export const PUT = async (request, { params }) => {
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
    const { id } = params;

    const message = await Message.findById(id);
    if (!message)
      return new Response(JSON.stringify({ message: "Message not found" }), {
        status: 404,
      });

    //Verify Ownership
    if (message.recipient.toString() !== userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    // update message status to read/unread depending on current status
    message.read = !message.read;
    message.save();
    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", { status: 500 });
  }
};

//Delete /api/messages/:id
export const DELETE = async (request, { params }) => {
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
    const { id } = params;

    const message = await Message.findById(id);
    if (!message)
      return new Response(JSON.stringify({ message: "Message not found" }), {
        status: 404,
      });

    //Verify Ownership
    if (message.recipient.toString() !== userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    // update message status to read/unread depending on current status
    await message.deleteOne();
    return new Response(JSON.stringify("Message deleted successfully"), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", { status: 500 });
  }
};

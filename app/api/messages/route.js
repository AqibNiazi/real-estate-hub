import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";
//GET /api/messages
export const GET=async ()=>{
try {
  await connectDB()
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.user) {
    return new Response(
      JSON.stringify({ message: "You must be loggedIn to send a message" }),
      { status: 401 }
    );
  }
  //Extract user object from session user
  const { userId } = sessionUser;
  const messages=await Message.find({recipient:userId})
  .populate('sender',"name")
  .populate('property',"title")
  
return new Response(JSON.stringify(messages),{status:200})
  
} catch (error) {
  console.log(error);
  return new Response(JSON.stringify({ message: "Something Went Wrong" }), {
    status: 500,
  });
}
}

//POST /api/messages
export const POST = async (request) => {
  try {
    await connectDB();
    const { name, email, phone, message, recipient, property } =
      await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(
        JSON.stringify({ message: "You must be loggedIn to send a message" }),
        { status: 401 }
      );
    }
    //Extract user object from session user
    const { user } = sessionUser;
    //Check User cann't send message to self
    if (user.id === recipient) {
      return new Response(
        JSON.stringify({ message: "User cann't send message to self" }),
        { status: 400 }
      );
    }

    const newMessage = new Message({
      sender: user.id,
      recipient,
      property,
      name,
      email,
      phone,
      body: message,
    });

    await newMessage.save();

    return new Response(
      JSON.stringify({ message: "Message Sent Successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something Went Wrong" }), {
      status: 500,
    });
  }
};

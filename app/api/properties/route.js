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

//POST /api/properties
export const POST=async (request)=>{
  try {
    const formData=await request.formData()
    //Access All values from Amenities and Images
   const amenities= formData.getAll('amenities')
   const images= formData.getAll('images').filter((image)=>image.name!=='')
   console.log("amenties",amenities,"pictures",images);
    return new Response(JSON.stringify({message:"success"},{status:200}))
    
  } catch (error) {
    return new Response("Failed to add property",{status:500})
  }
}
import axios from "axios";
export const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

///Function to get all properties
async function fetchProperties({ showFeatured = false } = {}) {
  try {
    if (!apiDomain) {
      return [];
    }
    const res = await axios.get(
      `${apiDomain}/properties${showFeatured ? "/featured" : ""}`,
      {
        cache: "no-store",
      }
    );

    return res?.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
///Function to get single property
async function fetchProperty(id) {
  try {
    if (!apiDomain) {
      return null;
    }
    const res = await axios.get(`${apiDomain}/properties/${id}`);
    return res?.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export { fetchProperties, fetchProperty };

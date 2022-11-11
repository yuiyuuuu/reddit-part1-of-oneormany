import axios from "axios";

//api get
export async function makeGetRequest(url) {
  try {
    const { data } = await axios.get(`/api/${url}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

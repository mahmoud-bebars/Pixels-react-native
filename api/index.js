import Axios from "axios";
import { API_KEY, URL } from "../constants/api";

export const apiFetch = async (params) => {
  try {
    const { data } = await Axios.get(URL, {
      params: {
        key: API_KEY,
        per_page: 25,
        safesearch: true,
        editors_choice: true,
        ...params,
      },
    });
    console.log("fetching data for page ", params.page);
    console.log(params);
    return { sucess: true, results: data.hits };
  } catch (error) {
    console.log(error);
    return { sucess: false, results: error.message };
  }
};

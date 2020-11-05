import { useLocation } from "react-router-dom";
import { SERVER_ENDPOINT } from "../constants"

// Url constructor
export const urlConstructor = ({ isLaunchSuccess, isLandSuccess, year }) => {
  const createURL = () => {
    let url = SERVER_ENDPOINT;
    url += isLaunchSuccess ? `&launch_success=${isLaunchSuccess}` : "";
    url += isLandSuccess ? `&land_success=${isLandSuccess}` : "";
    url += year ? `&launch_year=${year}` : "";
    return url
  }

  return createURL();
}


// Fetch Programs service // TODO: Create more generic service
export const fetchPrograms = (data) => {

  if (typeof window !== "undefined" && urlConstructor(data)) {

    //Reset programs list
    data.setPrograms([]);

    fetch(urlConstructor(data))
      .then(response => response.json())
      .then(response => {
        data.setPrograms(response) // Set programs list in local state
        data.setLoading(false) // Remove loader
      })
      .catch(() => {
        data.setLoading(false) // Remove loader
        data.setError(true) // Raise Error
      })
  }

}


// Returns location
export const useSearchParams = () => {
  const searchParams = useLocation().search;
  const location = new URLSearchParams(searchParams);
  return location;
}

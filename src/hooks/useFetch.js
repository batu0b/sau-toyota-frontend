import React from "react";
import axios from "axios";

export const useFetch = (Url) => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchData = async (url) => {
    setIsLoading(true);
    axios
      .get(url)
      .then(function (response) {
        // handle success
        setData(response.data);
      })
      .catch(function (error) {
        // handle error
        setError(error);
      })
      .finally(function () {
        // always executed
        setIsLoading(false)
      });
  };
  
  React.useEffect(() => {
    fetchData(Url);
  }, [Url]);

  return { isLoading, error, data };
};

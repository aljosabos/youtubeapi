import axios from "axios";

axios.interceptors.response.use(
  function (response) {
    console.log(response);
    return response;
  },
  function (error) {
    if (
      error.response.status === 403 &&
      error.response.data.error.message.indexOf(
        "The request cannot be completed because you have exceeded your"
      ) >= 0
    ) {
      console.log("You have reached your daily quota");
    }
    return Promise.reject(error);
  }
);

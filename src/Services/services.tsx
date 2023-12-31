import axios from "axios";
import { PATH } from "../PATH";

const services = {
  getTranscriptions: async (page: string) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${
          apiToken || sessionStorage.getItem("credentials")
        }`,
      },
    };
    return axios
      .get(
        `${PATH.base}/transcriptions/${
          page ? `?page=${page}` : ""
        }&is_done=true`,
        header
      )
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => console.log(err));
  },
  getTranscribe: async (page: string) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${
          apiToken || sessionStorage.getItem("credentials")
        }`,
      },
    };
    return axios
      .get(
        `${PATH.base}/transcriptions/${
          page ? `?page=${page}` : ""
        }&is_done=false`,
        header
      )
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => console.log(err));
  },
  upload: async (body: FormData) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${
          apiToken || sessionStorage.getItem("credentials")
        }`,
      },
    };
    return axios
      .post(PATH.base + "/transcribe/", body, header)
      .then((response: any) => {
        return response;
      })
      .catch((err: any) => console.log(err));
  },
  login: async (credentials: { username: string; password: string }) => {
    const headers = {
      headers: {
        Authorization:
          "Basic " + btoa(`${credentials.username}:${credentials.password}`),
      },
    };
    return axios
      .get(`${PATH.base}/transcriptions/?is_done=true`, headers)
      .then((data: any) => {
        if (credentials.username && credentials.password) {
          sessionStorage.setItem(
            "credentials",
            btoa(`${credentials.username}:${credentials.password}`)
          );
        }
        return data;
      })
      .catch((err: any) => console.log(err));
  },
  deleteFile: async (file: string) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${
          apiToken || sessionStorage.getItem("credentials")
        }`,
      },
    };
    return axios
      .get(`${PATH.base}/delete/?audio_id=${file}`, header)
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => console.log(err));
  },
  resetPassword: async (body: any) => {
    return axios
      .post(`${PATH.base}/password-reset/`, body)
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => console.log(err));
  },
  getTranscript: async (id: string) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${
          apiToken || sessionStorage.getItem("credentials")
        }`,
      },
    };
    return axios
      .get(`${PATH.base}/audio/?audio_id=${id}`, header)
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => console.log(err));
  },
  postSketch: async (body: { audio_id: number; transcription: string }) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${
          apiToken || sessionStorage.getItem("credentials")
        }`,
      },
    };
    return axios
      .post(PATH.base + "/update/", body, header)
      .then((response: any) => {
        return response;
      })
      .catch((err: any) => console.log(err));
  },
};

export default services;

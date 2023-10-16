import axios from "axios";
import { PATH } from "../PATH";

const services = {
  getTranscriptions: async (page: string) => {
    const header = {
      headers: {
        Authorization: "Basic " + sessionStorage.getItem("credentials"),
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
  resetPassword: async (body: any) => {
    return axios
      .post(`${PATH.base}/password-reset/`, body)
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => console.log(err));
  },
};

export default services;

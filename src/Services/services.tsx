import axios from "axios";
import { PATH } from "../PATH";

const username = sessionStorage.getItem("username");
const password = sessionStorage.getItem("password");
const encodedCredentials = btoa(`${username}:${password}`);

export const defaultHeaders = {
  headers: {
    Authorization: "Basic " + encodedCredentials,
  },
};

const services = {
  getTranscriptions: async (page: string, headers: any) => {
    const tempHeader = { headers: { Authorization: "Basic " + headers, }, };
    return axios
        .get(`${PATH.base}/transcriptions/${page ? `?page=${page}` : ""}&?is_done=true`, tempHeader)
        .then((data: any) => {
          return data;
        })
        .catch((err: any) => console.log(err));
  },
  login: async (page: string, credentials: { username: string; password: string }) => {
    const headers = {
      headers: {
        Authorization: "Basic " + btoa(`${credentials.username}:${credentials.password}`),
      },
    };
    return axios
      .get(`${PATH.base}/transcriptions/${page ? `?page=${page}` : ""}&?is_done=true`, headers)
      .then((data: any) => {
        if (credentials.username && credentials.password) {
          sessionStorage.setItem("username", credentials.username);
          sessionStorage.setItem("password", credentials.password);
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

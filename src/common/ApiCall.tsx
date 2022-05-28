import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { hideLoader, showLoader } from "../app/AppLoader";
import { ApiConstModel } from "./constant/ApiConst";

const get = async function (url: string, params: object = {}) {
  const options: AxiosRequestConfig = {
    url: url,
    method: "GET",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
      Authorization: "6371b3f93f4b4ce0b5be8ece19a4113a",
    },
    params: params,
    timeout: 30000,
  };

  return await axios.request<AxiosResponse>(options);
};

const post = async (url: string, params: object = {}) => {
  const options: AxiosRequestConfig = {
    url: url,
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "6371b3f93f4b4ce0b5be8ece19a4113a",
    },
    data: params,
    timeout: 30000,
  };
  return new Promise((resolve, reject) => {
    axios.request<AxiosResponse>(options).then(
      (result: AxiosResponse) => {
        if (result.status === 200 || result.status === 0) {
          resolve(result.data.resultObject);
        } else {
          reject(result.data.description);
        }
      },
      (err) => {
        reject(err);
      }
    );
  });
  // return await axios.request<AxiosResponse>(options);
};

function objToQueryString(obj: any) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(
      encodeURIComponent(key) + "=" + encodeURIComponent(obj[key])
    );
  }
  return keyValuePairs.join("&");
}

export default function ApiGet(url: string = "", params: object = {}) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    showLoader();
    const options: AxiosRequestConfig = {
      url: url,
      method: "GET",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      params: params,
      timeout: 30000,
    };

    (async function fetchData() {
      try {
        const response = await axios.request(options);
        if (response.status === 200) {
          console.log(response.status);
          console.log(response.data);
          setData(response.data || null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        hideLoader();
      }
    })();
  }, []);

  return { data };
}

const request = async (apiConst: ApiConstModel, params: object = {}) => {
  let url = "http://103.9.0.193:9020" + apiConst.service + apiConst.functionUrl;
  switch (apiConst.method) {
    case "GET":
      return await get(url, params);
    case "POST":
      return await post(url, params);
    case "PUT":
      break;
    case "DELETE":
      break;
    default:
      return await get(url, params);
  }
};
export const ApiCall = {
  get,
  post,
  request,
};

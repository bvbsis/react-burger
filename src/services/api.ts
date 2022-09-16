import { Obj } from "reselect/es/types";

export const apiUrl = (endpoint: string): string => {
  return `https://norma.nomoreparties.space/api/${endpoint}`;
};

export const checkResponse = async (res: Response) => {
  if (res.ok) {
    return await res.json();
  }
  const error = await res.json();
  return Promise.reject(error.message);
};

const refreshToken = async () => {
  const token = localStorage.getItem("refreshToken");
  const res = await fetch(apiUrl("auth/token"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  });
  const refreshData = await checkResponse(res);
  if (!refreshData.success) {
    return Promise.reject(refreshData);
  }
  localStorage.setItem("refreshToken", refreshData.refreshToken);
  setCookie("accessToken", refreshData.accessToken);
  return refreshData;
};

export const fetchWithRefresh = async (url: string, options: Obj<any>) => {
  try {
    const res = await fetch(url, options);
    const data = await checkResponse(res);
    return data;
  } catch (err: any) {
    console.log(err);
    if (
      err.message === "jwt expired" ||
      (localStorage.getItem("refreshToken") && !getCookie("accessToken"))
    ) {
      const refreshData = await refreshToken();
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      const data = await checkResponse(res);
      return data;
    } else {
      return Promise.reject(err);
    }
  }
};

export const getCookie = (name: string) => {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + // eslint-disable-line
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (
  name: string,
  value: string,
  options: Obj<any> = {}
) => {
  options = {
    path: "/",
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
};

export const deleteCookie = (name: string) => {
  setCookie(name, "", {
    "max-age": -1,
  });
};

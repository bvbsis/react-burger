import { Obj } from "reselect/es/types";

import {
  apiUrl,
  checkResponse,
  deleteCookie,
  fetchWithRefresh,
  getCookie,
  setCookie,
} from "./api";

type TUserForm = {
  name?: string;
  email: string;
  password: string;
};

const useAuth = () => {
  const getUser = async () => {
    return await fetchWithRefresh(apiUrl("auth/user"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: getCookie("accessToken"),
      },
    });
  };

  const setUser = async (form: TUserForm) => {
    return await fetchWithRefresh(apiUrl("auth/user"), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: getCookie("accessToken"),
      },
      body: JSON.stringify(form),
    });
  };

  const logIn = async (form: TUserForm) => {
    const res = await fetch(apiUrl("auth/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await checkResponse(res);

    if (data.success) {
      localStorage.setItem("refreshToken", data.refreshToken);
      setCookie("accessToken", data.accessToken);
    }
    return data;
  };

  const register = async (form: TUserForm) => {
    const res: Response = await fetch(apiUrl("auth/register"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data: {
      success: boolean;
      refreshToken: string;
      accessToken: string;
    } = await checkResponse(res);

    if (data.success) {
      localStorage.setItem("refreshToken", data.refreshToken);
      setCookie("accessToken", data.accessToken);
    }
    return data;
  };

  const logOut = async () => {
    const token = localStorage.getItem("refreshToken");
    const res = await fetch(apiUrl("auth/logout"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
      }),
    });
    const data: Obj<any> = await checkResponse(res);
    if (data.success) {
      localStorage.removeItem("refreshToken");
      deleteCookie("accessToken");
    }
    return data;
  };

  const sendPasswordResetEmail = async (email: string) => {
    const res = await fetch(apiUrl("password-reset"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    const data = await checkResponse(res);
    return data;
  };

  const confirmPasswordReset = async (form: TUserForm) => {
    const res = await fetch(apiUrl("password-reset/reset"), {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = checkResponse(res);
    return data;
  };

  return {
    getUser,
    setUser,
    logIn,
    register,
    logOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
};

const getUser = async () => {
  return await fetchWithRefresh(apiUrl("auth/user"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
};

const setUser = async (form: TUserForm) => {
  return await fetchWithRefresh(apiUrl("auth/user"), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getCookie("accessToken")}`,
    },
    body: JSON.stringify(form),
  });
};

const logIn = async (form: TUserForm) => {
  const res = await fetch(apiUrl("auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  const data = await checkResponse(res);

  if (data.success) {
    localStorage.setItem("refreshToken", data.refreshToken);
    setCookie("accessToken", data.accessToken.replace("Bearer ", ""));
  }
  return data;
};

const register = async (form: TUserForm) => {
  const res = await fetch(apiUrl("auth/register"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  const data = await checkResponse(res);

  if (data.success) {
    localStorage.setItem("refreshToken", data.refreshToken);
    setCookie("accessToken", data.accessToken.replace("Bearer ", ""));
  }
  return data;
};

const logOut = async () => {
  const token = localStorage.getItem("refreshToken");
  const res = await fetch(apiUrl("auth/logout"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token,
    }),
  });
  const data = await checkResponse(res);
  if (data.success) {
    localStorage.removeItem("refreshToken");
    deleteCookie("accessToken");
  }
  return data;
};

const sendPasswordResetEmail = async (email: string) => {
  const res = await fetch(apiUrl("password-reset"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
  const data = await checkResponse(res);
  return data;
};

const confirmPasswordReset = async (form: TUserForm) => {
  const res = await fetch(apiUrl("password-reset/reset"), {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(form),
  });
  const data = checkResponse(res);
  return data;
};

export {
  useAuth,
  getUser,
  setUser,
  logIn,
  register,
  logOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
};

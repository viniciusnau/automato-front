export const logout = (navigate: any) => {
  navigate("/automato/login/");
  sessionStorage.clear();
};

export const isLoggedIn = (isLogged?: boolean) => {
  const hasCredentials = !!sessionStorage.getItem("credentials");
  const hasApiToken = !!sessionStorage.getItem("apiToken");

  return hasCredentials || isLogged || hasApiToken;
};

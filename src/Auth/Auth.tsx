export const logout = (navigate: any) => {
  sessionStorage.clear();
  navigate("/automato/login/");
};

export const isLoggedIn = (isLogged?: boolean) => {
  return sessionStorage.getItem("credentials") || isLogged ? true : false;
};

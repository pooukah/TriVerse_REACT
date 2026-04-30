export const estaLogueado = () => {
  const nombre = "token=";
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i].trim();
    if (c.indexOf(nombre) === 0) return true;
  }
  return false;
};
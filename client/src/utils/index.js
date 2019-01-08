/*eslint-disable*/
export const loadData = key => {
  const data = JSON.parse(window.localStorage.getItem(key));
  if (data) {
    const timeDiff = Math.abs(data.timestamp - new Date().getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays > 1) {
      window.localStorage.removeItem("token");
      return "";
    }

    return data.token;
  }

  return "";
};

export const saveData = (key, value) => {
  const timestamp = +new Date();
  const data = JSON.stringify({ token: value, timestamp });
  window.localStorage.setItem(key, data);
};

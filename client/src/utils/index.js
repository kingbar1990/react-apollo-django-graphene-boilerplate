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

export const getCurrentDate = date => {
  let today = date;
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return (today = `${yyyy}-${month}-${day}`);
};

export const getBase64 = file =>
 new Promise((resolve, reject) => {
     const reader = new FileReader()
     reader.readAsDataURL(file)
     reader.onload = () => resolve(reader.result)
     reader.onerror = (error) => reject(error);
 })

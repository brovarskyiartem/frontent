export const readJsonFile = (setUsers, setFileError) => {
  fetch("./users.json")
    .then((res) => {
      if (!res.ok) throw new Error("Не вдалося отримати users.json");
      return res.json();
    })
    .then(setUsers)
    .catch((err) => {
      console.error(err);
      setFileError("Не вдалося зчитати users.json. Використовуються дефолтні користувачі.");
    });
};
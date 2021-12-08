const getCSRFToken = async () => {
  let result = await fetch("http://localhost:5000/form", {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors",
  });
  const parsed = await result.json();
  return parsed.csrfToken;
};

export default getCSRFToken;

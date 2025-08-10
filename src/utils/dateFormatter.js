export function formatDateToIndo(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  const options = {
    hours: "2-digit",
    minutes: "2-digit",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return (
    date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }) +
    " " +
    date.toLocaleDateString("id-ID", options)
  );
}

export function formatDateToIndoSimple(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return date.toLocaleDateString("id-ID", options);
}

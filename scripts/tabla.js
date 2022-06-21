export function crearTabla(vec) {
  const table = document.createElement("table");
  table.appendChild(crearCabecera(vec[0]));
  table.appendChild(crearCuerpo(vec));
  return table;
}

function crearCabecera(vec) {
  const thead = document.createElement("thead"),
    tr = document.createElement("tr");
  thead.appendChild(tr);
  for (const key in vec) {
    if (key !== "id") {
      const thead = document.createElement("th");
      thead.textContent = key;
      tr.appendChild(thead);
    }
  }
  return thead;
}

function crearCuerpo(vec) {
  const tbody = document.createElement("tbody"),
    tr = document.createElement("tr");
  tbody.setAttribute("id", "body");
  tbody.appendChild(tr);
  vec.forEach((elemento) => {
    const tr = document.createElement("tr");
    tr.setAttribute("class", "pointer");
    for (const key in elemento) {
      if (key === "id") {
        tr.setAttribute("data-id", elemento[key]);
      } else {
        const td = document.createElement("td");
        td.textContent = elemento[key];
        tr.appendChild(td);
      }
    }
    tbody.appendChild(tr);
  });
  return tbody;
}
export default crearTabla;

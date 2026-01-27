<%*
const dv = app.plugins.plugins["dataview"].api;

// Consulta: ficheros de apertura de cada módulo
const query = `
TABLE WITHOUT ID file.path, file.folder
FROM "CURSO"
WHERE contains(file.name, "-00-apertura")
SORT file.folder ASC
`;

const result = await dv.query(query);

if (result.successful && result.value.values.length > 0) {
  const markdownList = result.value.values
    .map(row => {
      const path = row[0];
      const folder = row[1];
      // Extraer número y nombre: modulo-01-consciente-de-lo-que-soy → 01 | Consciente de lo que soy
      const match = folder.match(/modulo-(\d{2})-(.+)/);
      if (match) {
        const num = match[1];
        const name = match[2]
          .replace(/-/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase()); // Capitaliza cada palabra
        const filename = path.split('/').pop();
        return `- [Módulo ${num}: ${name}](${folder}/${filename})`;
      }
      return null;
    })
    .filter(x => x)
    .join("\n");

  tR += markdownList;
} else {
  tR += "No se encontraron módulos.";
}
%>

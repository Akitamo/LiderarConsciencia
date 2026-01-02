<%*
const dv = app.plugins.plugins["dataview"].api;
const currentFolder = tp.file.folder(true);

// Consulta: archivos del módulo actual, excluyendo índices
const query = `
TABLE WITHOUT ID file.path, file.name
FROM "${currentFolder}"
WHERE !contains(file.name, "-00-indice")
SORT file.name ASC
`;

const result = await dv.query(query);

if (result.successful && result.value.values.length > 0) {
  const markdownList = result.value.values
    .map(row => {
      const path = row[0];
      const filename = row[1];
      // Extraer título limpio: m01-01-el-cerebro... → El cerebro...
      const displayText = filename
        .replace(/^m\d{2}-[e]?\d{2}-/, '')  // quita prefijo mXX-NN- o mXX-eNN-
        .replace(/-/g, ' ')                  // guiones a espacios
        .replace(/^\w/, c => c.toUpperCase()); // capitaliza
      
      // Añadir .md para compatibilidad con GitHub
      return `- [${displayText}](./${encodeURI(filename)}.md)`;
    })
    .join("\n");
  
  tR += markdownList;
} else {
  tR += "No se encontraron archivos en este módulo.";
}
%>

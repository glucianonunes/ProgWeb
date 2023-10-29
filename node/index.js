const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const dirPath = url.searchParams.get('dir') || __dirname;

    fs.readdir(dirPath, (err, files) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Diretório não encontrado ou acesso negado.');
      } else {
        let fileList = '<ul>';
        files.forEach(file => {
          fileList += `<li>${file}</li>`;
        });
        fileList += '</ul>';

        const html = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>Lista de Arquivos e Subdiretórios</title>
            </head>
            <body>
              <h1>Lista de Arquivos e Subdiretórios em ${dirPath}</h1>
              ${fileList}
            </body>
          </html>
        `;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
      }
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Método não permitido.');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor em execução em http://localhost:${PORT}`);
});

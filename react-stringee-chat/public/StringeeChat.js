let StringeeClient = window.StringeeClient || null;

function getContentIframe(iframe_html) {
    //tao the div chua iframe
    let div = document.createElement("div");
    div.setAttribute('style', 'text-align: center');

    //iframe
    let iframe = document.createElement('iframe');
    iframe.setAttribute('class', 'iframe');
    iframe.setAttribute('width', '1000');
    iframe.setAttribute('height', '600');

    div.appendChild(iframe);

    document.body.appendChild(div);

    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(iframe_html);
    iframe.contentWindow.document.close();

    if (StringeeClient) {
        StringeeClient._iframe = iframe;
    }

    console.log('++++ 1 append xong')
}

let iframe_html = '<!doctype html>\n' +
    '<html lang="en">\n' +
    '<head>\n' +
    '    <meta charset="utf-8"/>\n' +
    '    <link rel="icon" href="/favicon.ico"/>\n' +
    '    <meta name="viewport" content="width=device-width,initial-scale=1"/>\n' +
    '    <meta name="theme-color" content="#000000"/>\n' +
    '    <meta name="description" content="Web site created using create-react-app"/>\n' +
    '    <link rel="apple-touch-icon" href="/logo192.png"/>\n' +
    '    <link rel="manifest" href="/manifest.json"/>\n' +
    '    <title>React App</title>\n' +
    '    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">\n' +
    '    <script defer="defer" src="http://localhost:3001/static/js/main.3f927159.js"></script>\n' +
    '    <link href="http://localhost:3001/static/css/main.041889cf.css" rel="stylesheet">\n' +
    '</head>\n' +
    '<body>\n' +
    '<noscript>You need to enable JavaScript to run this app.</noscript>\n' +
    '<div id="root"></div>\n' +
    '</body>\n' +
    '</html>';

getContentIframe(iframe_html);



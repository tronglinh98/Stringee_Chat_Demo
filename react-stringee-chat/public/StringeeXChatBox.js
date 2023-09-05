var timmer_stringeedx = setTimeout(function () {
    var bodyDx = document.querySelector("body");
    if (bodyDx) {
        load();
        clearTimeout(timmer_stringeedx);
    }
}, 10);

function getContentIframe(iframe_html) {
    let div = document.createElement("div");
    div.setAttribute('class', 'stringeeX_chatbox_iframe_wrapper k8s');
    div.setAttribute('id', 'stringeeX_chatbox_iframe_wrapper');
    div.setAttribute('style', 'right: 15px; bottom: 15px');

    let iframe = document.createElement('iframe');
    iframe.setAttribute('class', 'iframe');
    iframe.setAttribute('id', 'stringeeChatIframe');

    div.appendChild(iframe);
    document.body.appendChild(div);

    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(iframe_html);
    iframe.contentWindow.document.close();
}

function load() {
    console.log("++ I am StringeeXChat Embeded Script");

    let x = document.getElementsByTagName('head')[0];
    let style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.stringeeX_chatbox_iframe_wrapper.full-open{border-radius: 10px;width: 380px;height: 580px;margin-bottom: 0;margin-right: 0;box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 40px}.stringeeX_chatbox_iframe_wrapper{margin-top: 0;margin-right: 0;margin-bottom: 0;padding: 0;display: block;background: transparent;position: fixed !important;z-index: 99999;width: 56px;height: 56px;box-sizing: content-box}.stringeeX_chatbox_iframe_wrapper .iframe{background-color: transparent;vertical-align: text-bottom;position: relative;width: 100%;height: 100%;min-width: 100%;min-height: 100%;max-width: 100%;max-height: 100%;margin: 0;overflow: hidden;display: block;border-width: 0}.drop-down-rectangle1{position: absolute;width: 15px;height: 15px;background: #FFF;transform: rotate(45deg);top: -5px;right: 35px;border: 1px solid #E9EBED}.stringeeX_chatbox_iframe_wrapper.full-open .header{height: 40px;width: calc(100% - 70px);position: absolute;z-index: 1000;cursor: move}@media only screen and (min-device-width: 280px) and (max-device-width: 1024px) and (orientation: portrait){.stringeeX_chatbox_iframe_wrapper.full-open{width: 100%;height: 100%;margin-bottom: 0;margin-right: 0}.stringeeX_chatbox_iframe_wrapper{width: 56px;height: 56px;right: 0 !important;bottom: 0 !important}}@media only screen and (min-device-width: 280px) and (max-device-width: 1024px)  and (orientation: portrait){.stringeeX_chatbox_iframe_wrapper.full-open{width: 100%;height: 100%;margin-bottom: 0;margin-right: 0}.stringeeX_chatbox_iframe_wrapper{width: 56px;height: 56px;right: 0 !important;bottom: 0 !important}}@media only screen and (min-device-width: 280px) and (max-device-width: 1024px)  and (orientation: landscape){.stringeeX_chatbox_iframe_wrapper.full-open{width: 100%;height: 100%;margin-bottom: 0;margin-right: 0}.stringeeX_chatbox_iframe_wrapper{width: 56px;height: 56px;right: 0 !important;bottom: 0 !important}}@media only screen and (min-device-width: 280px) and (max-device-width: 1024px) and (orientation: landscape){.stringeeX_chatbox_iframe_wrapper.full-open{width: 100%;height: 100%;margin-bottom: 0;margin-right: 0}.stringeeX_chatbox_iframe_wrapper{width: 56px;height: 56px;right: 0 !important;bottom: 0 !important}}';
    x.appendChild(style);

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
        '    <script defer="defer" src="http://localhost:3001/static/js/main.1c978ec2.js"></script>\n' +
        '    <link href="http://localhost:3001/static/css/main.041889cf.css" rel="stylesheet">\n' +
        '</head>\n' +
        '<body>\n' +
        '<noscript>You need to enable JavaScript to run this app.</noscript>\n' +
        '<div id="root"></div>\n' +
        '</body>\n' +
        '</html>';

    getContentIframe(iframe_html);
}

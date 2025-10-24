export function createElement(tag, className, html) {
    const el = document.createElement(tag);
    if (className) {
        el.className = className;
    }
    if (html) {
        el.innerHTML = html;
    }
    return el;
}

export function querySelector(selector) {
    return document.querySelector(selector);
}

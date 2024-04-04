import { SignalGetter } from "./signal";

type SyntheticEvent = (event: Event) => void;
type ElementProps = {
  [key: string]: string | SyntheticEvent;
};

type Element = {
  tag: keyof HTMLElementTagNameMap;
  props: ElementProps;
  children: (Element | string | SignalGetter<any>)[];
};

export function createElement(tag: Element["tag"], props: Element["props"], children: Element["children"]) {
  return { tag, props, children };
}

export function renderElement(element: Element | string) {
  if (typeof element === "string") {
    return document.createTextNode(element);
  }

  const $el = document.createElement(element.tag);
  for (const [key, value] of Object.entries(element.props)) {
    if (typeof value === "function") {
      registerSyntheticEvent($el, key, value);
      continue;
    }

    $el.setAttribute(key, value);
  }

  for (const child of element.children) {
    if (typeof child === "function") {
      $el.appendChild(renderSignal(child));
      continue;
    }

    $el.appendChild(renderElement(child));
  }

  return $el;
}

export function createRenderer($root: HTMLElement) {
  return (element: Element) => {
    $root.innerHTML = "";
    $root.appendChild(renderElement(element));
  };
}

function registerSyntheticEvent($el: HTMLElement, key: string, value: SyntheticEvent) {
  if (key.startsWith("on")) {
    const event = key.substring(2).toLowerCase();
    $el.addEventListener(event, value);
  }
}

function renderSignal(signal: SignalGetter<any>) {
  const $text = document.createTextNode("");
  $text.nodeValue = signal((value) => ($text.nodeValue = value));
  return $text;
}

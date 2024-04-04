import { createElement } from "./lib/render";
import { createSignal } from "./lib/signal";

export function counter() {
  const [counter, setCounter] = createSignal(0);

  return createElement("div", {}, [
    createElement(
      "button",
      {
        onclick: () => {
          setCounter(counter() + 1);
        },
      },
      ["+"]
    ),
    createElement("span", {}, [counter]),
    createElement(
      "button",
      {
        onclick: () => {
          setCounter(counter() - 1);
        },
      },
      ["-"]
    ),
  ]);
}

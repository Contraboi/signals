import { counter } from "./counter";
import { createElement, createRenderer } from "./lib/render";
import "./style.css";

const renderer = createRenderer(document.querySelector("#app")!);

renderer({
  tag: "div",
  props: {},
  children: [
    createElement("h1", {}, ["My crapy counter app!"]),
    createElement("h2", {}, ["With my crappy signals!"]),
    counter(),
  ],
});


import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import Like from "../Like";

let container;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<Like />, container);
    });
  });
  
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });
  
  describe("Probando el componente Like.", () => {
    it("Por defecto, el contador en el párrafo se inicia en 0.", () => {
      const p = container.querySelector("p");
      expect(p.textContent).toBe("Likes: 0");
    });
  
  
    it("El número de likes se incrementa en 1 al hacer click.", () => {
      const p = container.querySelector("p");
      const button = container.querySelector("#increment")
      act(() => {
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
      expect(p.textContent).toBe("Likes: 1");
    });

    it("El número de likes se decrementa en 1 al hacer click.", () => {
        const p = container.querySelector("p");
        const button = container.querySelector("#decrement")
        act(() => {
          button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(p.textContent).toBe("Likes: -1");
      });
  });
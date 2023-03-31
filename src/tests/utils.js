import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export function setup(jsx) {
  return {
    user: userEvent.setup(),

    // Think of this like a 'mix-in' of the entries from the returned object.
    ...render(jsx),
  };
}

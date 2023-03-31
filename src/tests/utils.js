import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";

export // setup function
function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

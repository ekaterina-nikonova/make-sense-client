import React from "react";
import { render } from "@testing-library/react";

import Footer from "../Footer";

describe('Footer', () => {
  test('has 2 links in Resources section', () => {
    const { getByTestId } = render(<Footer />);
    expect(getByTestId('resources-section')
      .querySelectorAll('a'))
      .toHaveLength(2);
  });

  test('has 5 links in Source Code section', () => {
    const { getByTestId } = render(<Footer />);
    expect(getByTestId('source-code-section')
      .querySelectorAll('a'))
      .toHaveLength(5);
  });

  test('has an image with Google Play reference in Apps section', () => {
    const { getAllByAltText } = render(<Footer />);
    expect(getAllByAltText('Get it on Google Play')).toHaveLength(1);
  });

  test('has 3 links in Contacts section', () => {
    const { getByTestId } = render(<Footer />);
    expect(getByTestId('contacts-section')
      .querySelectorAll('a'))
      .toHaveLength(3);
  });

  test('has copyright info', () => {
    const { getByText } = render(<Footer />);
    expect(getByText(/Ekaterina Nikonova/))
  });
});

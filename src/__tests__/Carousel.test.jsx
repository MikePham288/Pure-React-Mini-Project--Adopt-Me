import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import Carousel from "../Carousel";

test("let users click on thumbnails to make them the hero", async () => {
  const images = ["1.jpg", "2.jpg", "3.jpg"];
  const carousel = render(<Carousel images={images} />);
  const hero = await carousel.findByTestId("hero");

  expect(hero.src).toContain(images[0]);

  for (let i = 0; i < images.length; i++) {
    const currentImage = images[i];
    const thumb = await carousel.findByTestId(`thumbnail${i}`);
    await thumb.click();

    expect(hero.src).toContain(currentImage);
  }

  carousel.unmount();
});

import { Component, MouseEvent } from "react";

interface IProps {
  images: string[];
}

class Carousel extends Component<IProps> {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com"],
  };

  handleIndexClick = (e: MouseEvent<HTMLElement>) => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }
    if (e.target.dataset.index) {
      this.setState({
        active: +e.target.dataset.index,
      });
    }
  }; // arrow function it doesn't create new scope, Normal functions invoke new scope at the point of invocation

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="mt-2 flex h-96 items-center justify-around">
        <img
          className="max-h-96 max-w-[45%]"
          src={images[active]}
          alt="animal hero"
        />
        <div className="w-[50%]">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              onClick={this.handleIndexClick}
              data-index={index}
              key={photo}
              src={photo}
              alt="animal thumbnail"
              className={`m-4 inline-block h-16 w-16 cursor-pointer rounded-[50%] border-2 border-gray-800 md:h-24 md:w-24 ${
                index === active && "opacity-60"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;

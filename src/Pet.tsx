// const Pet = (props) => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, props.name),
//     React.createElement("h2", {}, props.animal),
//     React.createElement("h2", {}, props.breed),
//   ]);

import { Link } from "react-router-dom";
import { Animal } from "./APIResponsesTypes";

interface IProps {
  name: string;
  animal: Animal;
  breed: string;
  images: string[];
  location: string;
  id: number;
}

// };
const Pet = (props: IProps) => {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (props.images.length) {
    hero = props.images[0];
  }

  return (
    <Link to={`/details/${props.id}`} className="relative block">
      <div className="image-container">
        <img src={hero} alt={props.name} />
      </div>
      <div className="absolute bottom-0 left-0 bg-gradient-to-tr from-white to-transparent pr-2 pt-2">
        <h1>{props.name}</h1>
        <h2>
          {props.animal} - {props.breed} - {props.location}
        </h2>
      </div>
    </Link>
  );

  // return (
  //   <div>
  //     <h1>{props.name}</h1>
  //     <h2>{props.animal}</h2>
  //     <h2>{props.breed}</h2>
  //   </div>
  // );
};

export default Pet;

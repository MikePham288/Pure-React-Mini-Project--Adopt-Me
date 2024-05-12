import { useEffect, useState } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";
const ANIMALS = ["dog", "cat", "bird", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreeds] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);
  // Equivalent
  // const locationHook - useState('');
  // const location = locationHook[0];
  // const setLocation = locationHook[1];

  useEffect(() => {
    // run the same as ComponentDidMount
    requestPets(); // runs every times there's an event without an empty array. Empty array makes it run only on the first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );

    const json = await res.json();
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            placeholder="Location"
            id="location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreeds("");
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
              setBreeds("");
            }}
            id="animal"
          >
            <option value="" />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            value={breed}
            onChange={(e) => {
              setBreeds(e.target.value);
            }}
            id="breed"
            disabled={breed.length === 0}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>

        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;

//render functions in React: your render function need to be fast and they need to be stateless

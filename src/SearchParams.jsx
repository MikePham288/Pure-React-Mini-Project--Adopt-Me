import { useDeferredValue, useMemo, useState, useTransition } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";
// import { useQuery } from "@tanstack/react-query";
// import fetchSearch from "./fetchSearch";
import { useDispatch, useSelector } from "react-redux";
import { all } from "./searchParamsSlice";
import { useSearchQuery } from "./petApiService";
const ANIMALS = ["dog", "cat", "bird", "rabbit", "reptile"];

const SearchParams = () => {
  // Equivalent
  // const locationHook - useState('');
  // const location = locationHook[0];
  // const setLocation = locationHook[1];
  // const [requestParams, setRequestParams] = useState({
  //   location: "",
  //   animal: "",
  //   breed: "",
  // });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  // const [adoptedPet] = useContext(AdoptedPetContext);
  const [isPending, startTransition] = useTransition();
  const adoptedPet = useSelector((state) => state.adoptedPet.value);
  const searchParams = useSelector((state) => state.searchParams.value);
  const dispatch = useDispatch();

  // const results = useQuery(["search", searchParams], fetchSearch);

  // const pets = results?.data?.pets ?? [];
  const { data: pets } = useSearchQuery(searchParams);
  const deferredPets = useDeferredValue(pets);
  const renderedPets = useMemo(
    () => <Results pets={deferredPets} />,
    [deferredPets]
  );

  //   useEffect(() => {
  //     // run the same as ComponentDidMount
  //     requestPets(); // runs every times there's an event without an empty array. Empty array makes it run only on the first render
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  //   async function requestPets() {
  //     const res = await fetch(
  //       `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  //     );

  //     const json = await res.json();
  //     setPets(json.pets);
  //   }

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            location: formData.get("location") ?? "",
            breed: formData.get("breed") ?? "",
          };
          startTransition(() => {
            dispatch(all(obj));
          });
        }}
      >
        {adoptedPet ? (
          <div className="circle-clip float-left mt-0 mb-1 mr-5 ml-2 block h-24 w-24 overflow-hidden border-2 border-gray-800">
            <img
              className="min-h-24 w-24"
              src={adoptedPet.images[0]}
              alt={adoptedPet.name}
            />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            type="text"
            className="search-inputs"
            placeholder="Location"
            id="location"
            name="location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            value={animal}
            className="search-inputs"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
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
            className="search-inputs grayed-out-disabled"
            name="breed"
            id="breed"
            disabled={!breeds.length}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        {isPending ? (
          <div className="flex items-center justify-center p-4">
            <h2 className="animate-spin text-[100px]">🌀</h2>
          </div>
        ) : (
          <button className="rounded border-none bg-orange-500 px-6 py-2 text-white hover:opacity-50">
            Submit
          </button>
        )}
      </form>
      {/* <Results pets={pets} /> */}
      {renderedPets}
    </div>
  );
};

export default SearchParams;

//render functions in React: your render function need to be fast and they need to be stateless

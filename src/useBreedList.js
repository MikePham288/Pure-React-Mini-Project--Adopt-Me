import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";

// const localCache = {};

export default function useBreedList(animal) {
  // DOn't need this anymore
  //   const [breedList, setBreedList] = useState([]);
  //   const [status, setStatus] = useState("unloaded");

  //   useEffect(() => {
  //     if (!animal) {
  //       setBreedList([]);
  //     } else if (localCache[animal]) {
  //       setBreedList(localCache[animal]);
  //     } else {
  //       requestBreedList();
  //     }

  // why custom hook is not an async function? the requestBreedList doesn't return anything, so you don't have to make the parent function async? useEffect can't be async,
  // so if you want async await inside the effect, you must create an async function inside of the effect

  //     async function requestBreedList() {
  // Why inside? 1. React encourage to do this way.
  // 2. This is atomically what you want to happen ever single time this custom hook re - renders, and so you want this effect to happen that way.which makes sense to group everything together.the inner function all happening at the same time, closure, state.
  // so, in short, simply for tidy

  //       setBreedList([]);
  //       setStatus("loading");
  //       const res = await fetch(
  //         `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
  //       );

  //       const json = await res.json();

  //       localCache[animal] = json.breeds || [];

  //       setBreedList(localCache[animal]);
  //       setStatus("loaded"); // Better for testing
  //     }
  //   }, [animal]);

  const result = useQuery(["breeds", animal], fetchBreedList);

  return [result?.data?.breeds ?? [], result.status];
}

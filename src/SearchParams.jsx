import { useState } from "react";

const SearchParams = () => {
  const [location, setLocation] = useState("Toronto, ON");
  // Equivalent
  // const locationHook - useState('');
  // const location = locationHook[0];
  // const setLocation = locationHook[1];

  return (
    <div className="search-params">
      <form action="">
        <label htmlFor="location">
          Location
          <input
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            placeholder="Location"
            id="location"
          />
        </label>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;

//render functions in React: your render function need to be fast and they need to be stateless

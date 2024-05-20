import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import { lazy, useContext, useState } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
const Modal = lazy(() => import("./Modal"));

const Details = () => {
  const { id } = useParams();
  const result = useQuery(["details", id], fetchPet);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  if (result.isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <h2 className="animate-spin text-[100px]">🌀</h2>
      </div>
    );
  }

  const pet = result.data.pets[0];
  return (
    // <h2>hi, {id}!</h2>
    <div className="my-0 mx-auto mb-6 w-[95%] rounded-lg p-4 xl:mx-auto xl:mb-6 xl:mt-0 xl:rounded-md xl:bg-pink-100 xl:p-4 xl:shadow-xl">
      <Carousel images={pet.images} />
      <div>
        <h1 className="my-1 mx-0 text-center text-6xl text-gray-800">
          {pet.name}
        </h1>
        <h2 className="mx-0 mt-1 mb-5 text-center">
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
          <button
            className="my-0 mx-auto block cursor-pointer rounded-md border-2 border-gray-800 bg-red-600 py-1 px-5 text-white"
            onClick={() => setShowModal(true)}
          >
            Adopt {pet.name}
          </button>
          <p className="py-0 px-4 leading-normal">{pet.description}</p>
          {showModal ? (
            <Modal>
              <div className="max-w-[500px] rounded-3xl bg-pink-100 p-4 text-center">
                <h1>Would you like to adopt {pet.name}?</h1>
                <div className="mr-4 inline-block">
                  <button
                    className="my-0 mx-auto block cursor-pointer rounded-md border-2 border-gray-800 bg-red-600 py-1 px-5 text-white"
                    onClick={() => {
                      setAdoptedPet(pet);
                      navigate("/");
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className="my-0 mx-auto block cursor-pointer rounded-md border-2 border-gray-800 bg-red-600 py-1 px-5 text-white"
                    onClick={() => setShowModal(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </Modal>
          ) : null}
        </h2>
      </div>
    </div>
  );
};

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;

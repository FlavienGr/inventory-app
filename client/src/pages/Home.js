import React from "react";
import CookingImg from "../img/alyson-mcphee-yWG-ndhxvqY-unsplash.jpg";

const Home = () => {
  return (
    <div>
      <div>
        <h3>Welcome to this inventory app</h3>
      </div>
      <div className="my-5">
        <p>Select your products in a list and add them to your inventory</p>
      </div>
      <div>
        <img src={CookingImg} alt="coocking" width="100%" />
      </div>
    </div>
  );
};

export default Home;

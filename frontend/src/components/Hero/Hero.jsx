import { useNavigate } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <img
          src="images/hero.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover filter brightness-50"
        />
      </div>

      <div className="relative z-10 pt-20 pb-32 px-4">
        <h1 className="text-5xl font-bold text-white text-center mb-20">
          Where Past Meets Future
        </h1>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-white border border-white/20 hover:bg-white/20 transition duration-300">
            <h2 className="text-3xl font-bold mb-4 text-center">Prehistoric</h2>
            <p className="mb-6 text-center">
              Journey back to the dawn of civilization and explore the mysteries
              of our ancient past.
            </p>
            <button
              onClick={() => navigate("/prehistoric")}
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Explore Prehistoric Era
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-white border border-white/20 hover:bg-white/20 transition duration-300">
            <h2 className="text-3xl font-bold mb-4 text-center">Medieval</h2>
            <p className="mb-6 text-center">
              Step into the age of knights, castles, and epic battles that
              shaped our world.
            </p>
            <button
              onClick={() => navigate("/medieval")}
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Explore Medieval Era
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-white border border-white/20 hover:bg-white/20 transition duration-300">
            <h2 className="text-3xl font-bold mb-4 text-center">Future</h2>
            <p className="mb-6 text-center">
              Venture into tomorrow's world and discover what lies ahead for
              humanity.
            </p>
            <button
              onClick={() => navigate("/future")}
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Explore Future Era
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

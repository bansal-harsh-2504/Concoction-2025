import { Link } from "react-router-dom";

const Historic = () => {
  const events = [
    {
      id: 1,
      title: "Cave Art Workshop",
      image: "/images/cave.jpg",
      date: "April 15, 2024",
      description: "Learn the ancient techniques of cave painting",
      location: "Prehistoric Gallery",
      price: "$25",
    },
    {
      id: 2,
      title: "Stone Age Crafts",
      image: "/images/stone.jpg",
      date: "April 20, 2024",
      description: "Hands-on experience with prehistoric tool making",
      location: "Ancient Workshop",
      price: "$30",
    },
    {
      id: 3,
      title: "Dinosaur Exhibition",
      image: "/images/dino.jpg",
      date: "April 25, 2024",
      description: "Experience life-sized dinosaur models",
      location: "Main Exhibition Hall",
      price: "$20",
    },
  ];

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('/images/prehistoric.jpg')" }}
    >
      <nav className="bg-stone-900/80 p-4">
        <Link
          to="/"
          className="text-amber-200 text-3xl font-[Cinzel] hover:text-amber-400 transition-colors"
        >
          FusionEra
        </Link>
      </nav>

      <div className="h-[60vh] flex items-center justify-center bg-black/50">
        <h1 className="text-6xl md:text-7xl text-amber-200 font-[Cinzel] text-center px-4 leading-tight">
          Journey Through Time:
          <br />
          Where History Comes Alive
        </h1>
      </div>

      <div className="bg-stone-900/90 py-16 px-4">
        <h2 className="text-4xl text-amber-200 font-[Cinzel] text-center mb-12">
          Upcoming Prehistoric Adventures
        </h2>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-stone-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300 shadow-lg shadow-amber-900/20"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-[Cinzel] text-amber-200 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-amber-100/80 mb-2">{event.date}</p>
                  <p className="text-gray-400 mb-3">{event.description}</p>
                  <div className="border-t border-stone-700 pt-3">
                    <p className="text-amber-100/80">📍 {event.location}</p>
                    <p className="text-amber-200 font-semibold">
                      {event.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Historic;

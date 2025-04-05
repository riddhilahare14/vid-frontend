import React, { useState } from 'react';
import Sidebar from "./SideBar/Sidebar";
import SearchBar from "./Searchbar";
import GenreCard from "./GenreCard";
import img1 from "../../assets/img1.png";  // Move up two levels to access 'assets'

const genres = [
  "Editing & Post-Production",
  "Social & Marketing Videos",
  "Presenter Videos",
  "Explainer Videos",
  "Music Videos",
  "Documentary Videos",
  "Event Videos",
  "Corporate Videos",
  "Tutorial Videos",
  "Wedding Videos",
  "Animation Videos",
  "Game Footage Videos"
];

const HireAnEditor = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleSearch = () => {
    // Logic to search suitable editors based on the prompt
    console.log("Searching for editors based on:", prompt);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">Hire a Video Editor</h2>

        {/* Search Bar */}
        <div className="mb-12">
          <SearchBar prompt={prompt} setPrompt={setPrompt} handleSearch={handleSearch} />
        </div>

        {/* Genre Cards */}
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Select a Video Editing Genre</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {genres.map((genre, index) => (
            <GenreCard
              key={index}
              genre={genre}
              image={img1}
              isSelected={selectedGenre === genre}
              onClick={() => setSelectedGenre(genre)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HireAnEditor;

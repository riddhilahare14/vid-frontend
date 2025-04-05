import SearchBar from "./Searchbar"
import VideoCategory from "./Videocategory"
import CategoryCarousel from "./CatergoryCarousal"
import CategoryCard from "./CategoryCard"
import Carousel from "./Carousal"
import img1 from "../../assets/img3.jpg"

const categories = [
  {
    title: "Animation",
    image: img1,
    color: "#2A9D8F",
    subtypes: [
      { name: "Character Animation" },
      { name: "Animated GIFs" },
      { name: "Animation for Kids" },
      { name: "Animation for Streamers" },
      { name: "NFT Animation", isNew: true }
    ]
  },
  {
    title: "Product Videos",
    image: img1,
    color: "#E76F51",
    subtypes: [
      { name: "3D Product Animation" },
      { name: "E-Commerce Product Videos" },
      { name: "Corporate Videos" },
      { name: "App & Website Previews", isNew: true }
    ]
  },
  {
    title: "Motion Graphics",
    image: img1,
    color: "#264653",
    subtypes: [
      { name: "Logo Animation" },
      { name: "Lottie & Web Animation" },
      { name: "Text Animation", isNew: true }
    ]
  },
  {
    title: "Video Editing",
    image: img1,
    color: "#F4A261",
    subtypes: [
      { name: "Professional Editing" },
      { name: "Social Media Editing" },
      { name: "YouTube Editing" },
      { name: "Podcast Editing", isNew: true }
    ]
  }
]

const popularCategories = [
  {
    title: "Social & Marketing",
    image: img1,
    color: "#023047",
    subtypes: [
      { name: "Social Media Videos" },
      { name: "Marketing Campaigns" },
      { name: "Brand Stories" },
      { name: "Viral Content", isNew: true }
    ]
  },
  // Add more categories...
]


export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-5xl font-bold">Video & Animation Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the perfect video service for your needs
          </p>
          <SearchBar />
        </div>

        {/* Popular Categories */}
        <section>
          <Carousel title="Most Popular Categories">
            {categories.map((category, index) => (
              <div key={index} className="min-w-[300px] md:min-w-[400px]">
                <CategoryCard {...category} />
              </div>
            ))}
          </Carousel>
        </section>

        {/* Featured Categories */}
        <section>
          <Carousel title="Featured Categories">
            {popularCategories.map((category, index) => (
              <div key={index} className="min-w-[300px] md:min-w-[400px]">
                <CategoryCard {...category} />
              </div>
            ))}
          </Carousel>
        </section>

        {/* Grid Layout */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold mb-8">Explore All Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...categories, ...popularCategories].map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}


import { Form } from 'react-bootstrap';
import './index.css'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';



const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 20;

function App() {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState([1]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchImages();
  }, [page]);


  async function fetchImages() {
    try {
      if(searchInput.current.value){
      const response = await axios.get(
        `${API_URL}?query=${searchInput.current.value.trim()}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`
      );
      setImages(response.data.results);
      setTotalPages(response.data.total_pages);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }

  const resetSearch = () =>{
    setPage(1);
    fetchImages();
    
  };



  const handleSearch = (event) => {
    event.preventDefault();
    resetSearchSearch();
  };

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    resetSearch();
  };

  console.log('page', page);

  return (
    <div className="container">
      <h1 className="title">Search image</h1>
      <div className="search">
        <form onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Input and search something"
            className="search-input"
            ref={searchInput}
          />
        </form>
      </div>
      <div className="filters">
        <div onClick={() => handleSelection('nature')}>Nature</div>
        <div onClick={() => handleSelection('birds')}>Bird</div>
        <div onClick={() => handleSelection('cats')}>Cats</div>
        <div onClick={() => handleSelection('shoes')}>Shoes</div>
      </div>
      <div className="images">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description}
            className="image"
          />
        ))}
      </div>
      <div className="buttons">
        {page > 1 && <button className="btn" onClick={() => setPage(page - 1)}>Previous</button>}
        {page < totalPages && <button className="btn" onClick={() => setPage(page + 1)}>Next</button>}
      </div>
    </div>
  );
}

export default App;

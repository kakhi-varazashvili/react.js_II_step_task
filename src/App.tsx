import { useState, ChangeEvent } from "react";
import { useFetchData } from "./api/hooks/useFetchData";

import loading from "./assets/loading.gif";
import "./App.css";
import { Modal } from "./components";
// import Nav from "./Nav";

type UnsplashPhoto = {
  id: string;
  likes: number;
  slug: string;
  alt_description: string;
  views: number;
  downloads: number;
  urls: {
    regular: string;
  };
};

type ModalProps = {
  altDescription: string;
  modalImage: string;
  numberOfLikes: number;
  numberOfViews: number;
  numberOfDownloads: number;
};

const App = () => {
  const [searchWord, setSearchWord] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalProps>({
    altDescription: "",
    modalImage: "",
    numberOfLikes: 0,
    numberOfViews: 0,
    numberOfDownloads: 0,
  });
  const { data, isLoading } = useFetchData(searchWord);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  const handleModalOpen = (element: UnsplashPhoto) => {
    setIsModalOpen(true);
    setModalData((prevData) => ({
      ...prevData,
      altDescription: element.alt_description,
      modalImage: element.urls.regular,
      numberOfLikes: element.likes,
      numberOfViews: 5,
      numberOfDownloads: 5,
    }));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <Modal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        altDescription={modalData.altDescription}
        modalImage={modalData.modalImage}
        numberOfLikes={modalData.numberOfLikes}
        numberOfViews={modalData.numberOfViews}
        numberOfDownloads={modalData.numberOfDownloads}
      />

      <div className="header-box">
        <input
          className="search-box"
          onChange={handleSearch}
          type="text"
          value={searchWord}
          autoFocus
          placeholder="Search"
        />
      </div>
      <div className="gallery">
        {data ? (
          data.map((element: UnsplashPhoto) => (
            <div
              className="image-container"
              key={element.id}
              onClick={() => handleModalOpen(element)}
            >
              <img
                className="unsplash-image"
                src={element.urls.regular}
                alt={element.alt_description}
              />
            </div>
          ))
        ) : isLoading ? (
          <img className="loading-gif" src={loading} alt="Loading" />
        ) : (
          <div>No results found</div>
        )}
      </div>
    </div>
  );
};

export default App;

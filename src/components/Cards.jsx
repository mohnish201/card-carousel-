import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useSwipeable } from "react-swipeable";

const Cards = () => {
  const [data, setData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const cardContainerRef = useRef(null);

  async function fetchData() {
    try {
      const response = await axios.get(
        "https://gist.githubusercontent.com/anishbajpai014/d482191cb4fff429333c5ec64b38c197/raw/b11f56c3177a9ddc6649288c80a004e7df41e3b9/HiringTask.json"
      );
      const responseData = response.data;

      const jsonData = responseData.startsWith("/")
        ? JSON.parse(responseData.substring(1)).data
        : responseData.data;

      setData(jsonData);
      return jsonData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleCardClick = (index) => {
    cardContainerRef.current.children[index].focus();
  };

  const handleNext = () => {
    if (startIndex < data.length - 3) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const currentCardNumber = startIndex + 1;
  const totalCards = data.length;

  return (
    <div className="carousel-container">
      <div className="card-container" ref={cardContainerRef} {...handlers}>
        {data.slice(startIndex, startIndex + 3).map((el, index) => (
          <div className="card" key={el.id} tabIndex={0}>
            <p>{el.text}</p>
          </div>
        ))}
      </div>
      <div className="button-container">
        <button onClick={handlePrev} disabled={startIndex === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={startIndex === data.length - 3}>
          Next
        </button>
      </div>
      <div className="indicator">
        Card {currentCardNumber} out of {totalCards}
      </div>
    </div>
  );
};

export default Cards;

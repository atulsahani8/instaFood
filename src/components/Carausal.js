import React from "react";
import "./Carasuel.css";

const Carausal = () => {
  return (
    <div>
      <div className="carousel-container">
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade custom-carousel"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src="https://source.unsplash.com/random/900x700/?burger"
                alt="First slide"
                style={{ filter: "brightness(30%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="https://source.unsplash.com/random/900x700/?mojito"
                alt="Second slide"
                style={{ filter: "brightness(30%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="https://source.unsplash.com/random/900x700/?pizza"
                alt="Third slide"
                style={{ filter: "brightness(30%)" }}
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleFade"
            role="button"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleFade"
            role="button"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
          </a>
        </div>

        <form className="d-flex search-bar">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success text-white bg-success"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Carausal;

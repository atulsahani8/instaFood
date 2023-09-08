import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

const Home = () => {
  const [fooditem, setfooditem] = useState([]);
  const [foodData, setfooddata] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    let response = await fetch("http://localhost:4000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    setfooditem(response[0]);
    setfooddata(response[1]);

    console.log(response[0], response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
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

          <div className="d-flex search-bar justify-content-center">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              values={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            {/* <button
              className="btn btn-outline-success text-white bg-success"
              type="submit"
            >
              Search
            </button> */}
          </div>
        </div>
      </div>
      <div className="container">
        {fooditem.length > 0 ? (
          foodData.map((data) => {
            return (
              <div key={data._id} className="row mb-3">
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                {fooditem
                  .filter(
                    (item) =>
                      item.CategoryName === data.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )

                  .map((filterItems) => {
                    return (
                      <div
                        key={filterItems._id}
                        className="col-12 col-md-6 col-lg-3"
                      >
                        <Card
                          fooditem = {filterItems}
                          options={filterItems.options[0]}
                          

                        ></Card>
                      </div>
                    );
                  })}
              </div>
            );
          })
        ) : (
          <div>"No such data found"</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

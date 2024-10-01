import React from "react";
import { Link } from "react-router-dom";

const CustomerSideFooter = () => {
  return (
    <footer
      className="text-light pt-4  mt-1"
      style={{ background: "#3b968d" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-3">
            <h5 style={{ color: "rgb(238 63 57)" }} className="text-uppercase">
              <img src="/eve-logo.png" height={45} width={40} alt="eve-logo" />{" "}
              EventEase
            </h5>
            <p>
              At <strong>EventEase</strong>, we take your celebrations to the
              next level. Whether you're planning a wedding, corporate event, or
              private party, our all-inclusive services ensure a seamless and
              unforgettable experience.
            </p>
            <p>
              From stunning venues to exquisite catering, live music, and
              professional decorators, we've got every aspect covered. Let us
              make your event the talk of the town with our expert planning and
              execution. Your dream event is just a click away!
            </p>
          </div>
          <div className="col-lg-2"></div>

          <div className="col-lg-4 mb-3">
            <div className="row">
              <div className="col-md-6">
                <h5 className="text-uppercase">Categories</h5>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/User/venue" className="text-light">
                      Venue
                    </Link>
                  </li>
                  <li>
                    <Link to="/User/catering" className="text-light">
                      Catering
                    </Link>
                  </li>
                  <li>
                    <Link to="/User/music" className="text-light">
                      Music
                    </Link>
                  </li>
                  <li>
                    <Link to="/User/decoration" className="text-light">
                      Decorator
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <h5 className="text-uppercase">Pages</h5>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/Customer" className="text-light">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/User/cart" className="text-light">
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link to="/User/checkout" className="text-light">
                      Checkout
                    </Link>
                  </li>
                  <li>
                    <Link to="/User/order" className="text-light">
                      Order
                    </Link>
                  </li>
                  <li>
                    <Link to="/User/profile" className="text-light">
                      Profile
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="row d-flex social-links">
              <span>Social : </span> 
              <a href="https://www.linkedin.com/in/amaresh-ranjan-3a180820a/" className="text-light mx-2">
                <img
                  src="https://t0.gstatic.com/images?q=tbn:ANd9GcRMCA3j2A8hfLl9p5UAU5nd9lvqLlNZvqoU4xOsZ192uH4IYS6X"
                  height={20}
                />
              </a>
            </div>
            </div>
          </div>
        </div>

        <div className="row text-center">
          <div className="col-12">
            <p>
              &copy; {new Date().getFullYear()} EventEase. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CustomerSideFooter;

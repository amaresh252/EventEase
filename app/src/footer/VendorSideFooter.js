import React from "react";
import { Link } from "react-router-dom";

const VendorSideFooter = () => {
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
              As a vendor on <strong>EventEase</strong>, you have complete control over your product listings, order tracking, and customer management. Our platform enables you to effortlessly manage your inventory, update product availability, and track orders placed by customers in real-time.
            </p>
            <p>
              Stay organized by updating the status of your orders, ensuring smooth communication and satisfaction with your customers. Use our easy-to-navigate dashboard to add new products and showcase your best offerings to clients planning their events.
            </p>
          </div>
          <div className="col-lg-2"></div>

          <div className="col-lg-4 mb-3">
            <div className="row">
            <div className="col-md-2"></div>
              <div className="col-md-10">
                <div className="row">
              <h5 className="text-uppercase">Vendor Dashboard</h5>
            <ul className="list-unstyled">
              <li><Link to="/Vendor" className="text-light">My Products</Link></li>
              <li><Link to="/Vendor/customerorder" className="text-light">Orders Placed by Customers</Link></li>
              <li><Link to="#" className="text-light">Profile</Link></li>
              <li><Link to="/Vendor/addproduct" className="text-light">Add New Product</Link></li>
            </ul>
            <div >
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

export default VendorSideFooter;

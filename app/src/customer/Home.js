import { Link } from "react-router-dom";
import { CustomerNavbar } from "../navbar/CustomerNavbar";
import "../style/customer/home.css";
import  CustomerSideFooter from "../footer/CustomerSideFooter";

export default function Home() {
  
  

  return (
    <div className="home-whole">
      <CustomerNavbar />
      <div
        id="carouselExampleAutoplaying"
        class="carousel slide carousel-fade "
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="/event-planning1.jpg"
              class="d-block w-100"
              alt="..."
              height={600}
            />
            <div className="container  carousel-item-text">
              <div class="carousel-cap">
                <h5>Transforming Ideas into</h5>
                <h5>memorable events</h5>
                <p>Start Your Journey with EventEase</p>
              </div>
            </div>
          </div>

          <div class="carousel-item">
            <img
              src="/event-planning3.jpg"
              class="d-block w-100"
              alt="..."
              height={600}
            />
            <div className="container carousel-item-text">
              <div class="carousel-cap ">
                <h5>Transforming Ideas into</h5>
                <h5>memorable events</h5>
                <p>Start Your Journey with EventEase</p>
              </div>
            </div>
          </div>

          <div class="carousel-item">
            <img
              src="/event-planning2.jpg"
              class="d-block w-100"
              alt="..."
              height={600}
            />
            <div className="container carousel-item-text">
              <div class="carousel-cap ">
                <h5>Transforming Ideas into</h5>
                <h5>memorable events</h5>
                <p>Start Your Journey with EventEase</p>
              </div>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container  py-5 ">
        <div className="row">
          <div className="col-md-7 py-4 text-center">
             <h2 className="home-type">Venue</h2>
            <p className="mt-4">
            Discover the perfect setting for your event with our diverse range
            of venues. From elegant ballrooms to picturesque outdoor spaces, we
            offer a selection of venues tailored to suit every occasion,
            ensuring your event is held in the ideal atmosphere.
            </p>
            <Link to='/User/venue'><button className="btn btn-success mt-4">Book your venue</button></Link>
          </div>

          <div className="col-md-5">
            <img src="/venue.jpg" alt="venue"   height={300}/>
          </div>
        </div>
      </div>
      <div className="container  mb-5">
        <div className="row">
          <div className="col-md-5">
          <img src="/catering.jpg" alt="catering" height={300}/>
          </div>
          <div className="col-md-7 py-4 text-center">
             <h2 className="home-type">Catering</h2>
            <p className="mt-4">
            Indulge your guests with our exquisite catering options, crafted to
            tantalize taste buds and leave a lasting impression. Whether you're
            planning a formal dinner or a casual gathering, our diverse menus
            cater to all preferences, ensuring culinary excellence at every
            event.
            </p>
            <Link to='/User/catering'><button className="btn btn-success mt-4">Book for catering</button></Link>
          </div>
        </div>
      </div>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-7 py-4 text-center">
          <h2 className="home-type">Decoration</h2>
             
            <p className="mt-4">
            Elevate your event ambiance with our stunning decoration services.
            From elegant floral arrangements to thematic décor elements, our
            creative team transforms any space into a captivating environment,
            setting the stage for an unforgettable experience.
            </p>
            <Link to='/User/decoration'><button className="btn btn-success mt-4">Book a decorator</button></Link>
          </div>
          <div className="col-md-5">
          <img src="/decoration.jpg" alt="decoration"  height={300}/>
          </div>
        </div>
      </div>
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-5">
          <img src="/music.jpg" alt="music" height={300}/>
          </div>
          <div className="col-md-7 py-4 text-center">
             <h2 className="home-type">Music</h2>
            <p className="mt-4">
            Set the mood and keep the energy alive with our curated selection of
            music services. From soothing melodies to upbeat tunes, our talented
            musicians and DJs cater to diverse preferences, ensuring the perfect
            soundtrack for your event, from start to finish.
            </p>
            <Link to='/User/music'><button className="btn btn-success mt-4">Book for music</button></Link>
          </div>
        </div>
      </div>
      <CustomerSideFooter/>
    </div>
  );
}

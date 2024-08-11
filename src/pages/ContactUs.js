import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ContactUs() {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">Contact Us</h1>
      <p className="lead">
        We'd love to hear from you! Reach out with any questions or feedback.
      </p>
      <div className="mt-4">
        <h2 className="display-5">Contact Information</h2>
        <p className="lead">
          You can email us directly at:{" "}
          <a href="mailto:team4smartj@gmail.com" className="text-primary">
            team4smartj@gmail.com
          </a>
        </p>
        <div className="mt-4">
          <h2 className="display-5">Our Commitment</h2>
          <p className="lead">
            At SMARTJ, we are committed to providing excellent support and
            feedback. Our team is dedicated to helping you with any inquiries or
            concerns you might have. Don't hesitate to get in touch, and we'll
            respond as quickly as possible.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;

import React from 'react';

const Footer = () => {
  return (
    <footer className="footer has-background-primary-dark has-text-light p-4">
      <div className="content has-text-centered">
        <p>
          <strong className="has-text-light">Typing Speed Test Skill</strong>
        </p>
        <p className="mt-4">
          <a href="https://twitter.com/yourprofile" className="icon has-text-light mx-2">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://facebook.com/yourprofile" className="icon has-text-light mx-2">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://instagram.com/yourprofile" className="icon has-text-light mx-2">
            <i className="fab fa-instagram"></i>
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

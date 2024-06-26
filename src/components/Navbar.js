import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar is-info p-5 has-background-primary-dark" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
    <h1 className="title is-3 m-4  has-text-white">Test Your Typing Skill</h1>
   </div>
        <div className="navbar-end ">
          <div className="navbar-item has-text-white">
            <p className="has-text-white is-size-4 ">
              "Accuracy is the key to successful typing."
            </p>
          </div>
 </div>
    </nav>
  );
};

export default Navbar;

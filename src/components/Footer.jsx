import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <p>
        FoodHunt &copy; {new Date().getFullYear()} — Built with ❤️ by{" "}
        <a
          href="https://lookshd.github.io/Abhishek-Mishra-Portfolio/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Abhishek Mishra
        </a>
      </p>
    </div>
  );
};

export default Footer;

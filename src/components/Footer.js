import "./Header.scss";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <h4 style={{ display: "inline" }}>
          Atliko <b>Airidas Zinkevičius</b>
        </h4>
        <h4 style={{ display: "inline", fontWeight: "400" }}>
          Visos autorinės teisės saugomos
        </h4>
      </div>
    </footer>
  );
};

export default Footer;

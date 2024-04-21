import "./Hero.scss";

const Hero = () => {
  return (
    <div className="Hero">
      <div className="hero-text">
        <h1>לוגיסטיקה גדוד 373</h1>
        <p>
          צוות הלוגיסטיקה של גדוד 373, שמח לשרת את חייליו ולתת מענה מיידי לכל
          בקשה.
        </p>
        <button className="hero-btn request-btn">הוסף בקשה לציוד</button>
        <button className="hero-btn contact-btn">צור קשר</button>
      </div>
    </div>
  );
};

export default Hero;

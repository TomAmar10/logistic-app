import Hero from "../components/Hero/Hero";
import Reason from "../components/Reason/Reason";
import Steps from "../components/Steps/Steps";
import "./Home.scss";

const Home = () => {
  return (
    <div className="Home">
      <Hero />
      <Steps />
      <Reason />
    </div>
  );
};

export default Home;

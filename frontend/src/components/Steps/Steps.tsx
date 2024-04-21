import "./Steps.scss";
import stepsList from "./steps-list";

const Steps = () => {
  return (
    <div className="Steps">
      <h2 className="header">תהליך הזמנת ציוד</h2>
      <div className="header-underline"></div>
      <div className="steps-list">
        {stepsList.map((s, i) => {
          const Icon = s.icon;
          return (
            <div className="single-step">
              <Icon className="icon" />
              <p>
                {i + 1}. {s.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Steps;

import Rui from "../image/Rui.jpg";
import Zhaopeng from "../image/Zhaopeng.jpg";
import Yuer from "../image/Yuer.jpg";
import Linyan from "../image/Linyan.jpg";
import Yifei from "../image/Yifei.jpg";

const MemberDetail = (prop) => {
  const { degree, name, sid, role } = prop;
  return (
    <div className="member-detail-container">
      <div className="member-detail-background">
        {name === "Rui Wang" && (
          <img className="member-photo" src={Rui} alt={name} />
        )}
        {name === "Zhaopeng Li" && (
          <img className="member-photo" src={Zhaopeng} alt={name} />
        )}
        {name === "Yuer Zhu" && (
          <img className="member-photo" src={Yuer} alt={name} />
        )}
        {name === "Linyan Zhu" && (
          <img className="member-photo" src={Linyan} alt={name} />
        )}
        {name === "Yifei Du" && (
          <img className="member-photo" src={Yifei} alt={name} />
        )}
        <h1>{name}</h1>
        <h2>{sid}</h2>
        <h3>{degree}</h3>
        <h3>{role}</h3>
      </div>
    </div>
  );
};

export default MemberDetail;

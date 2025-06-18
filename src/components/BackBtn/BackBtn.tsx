import { Link } from "react-router-dom";


interface BackBtnProps {
  to: string;
}

const BackBtn: React.FC<BackBtnProps> = ({to}) => {
  return (
    <Link to={to}>
      <img
        src="/Task5/Images/Backword.svg"
        alt="back btn to home"
        className="border border-1 border-black rounded-circle p-3 "
      />
    </Link>
  );
};

export default BackBtn;

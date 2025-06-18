import { Row } from 'react-bootstrap';
import { Link } from "react-router-dom";

interface AuthSwitcherProps {
  message: string;
  pageName: string;
  pageLink: string;
}

const AuthSwitcher: React.FC<AuthSwitcherProps> = ({ message, pageName, pageLink}) => {
  return (
    <Row>
        <div className="text-center auth-switcher">
          <span className="lh-1 fs-14 ls-normal text-grey">{message}</span> {' '}
          <Link to={pageLink} className="fw-semibold ls-normal lh1 fs-14 text-orange">
            {pageName}
          </Link>
        </div>
      </Row>
  );
};

export default AuthSwitcher;
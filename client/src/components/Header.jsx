import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = ({ onSignOut }) => {
  const { user } = useAuth();

  return (
    <div className="bg-primary text-white h-14">
      <div className="container h-full flex items-center justify-between">
        <h4 className="font-medium text-md font-mono">
          <Link to={"/"}>Fitness Tracker</Link>
        </h4>

        <nav>
          <ul>
            {user && user.accessToken && (
              <li
                className="text-sm font-medium cursor-pointer"
                onClick={onSignOut}
              >
                Sign out
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;

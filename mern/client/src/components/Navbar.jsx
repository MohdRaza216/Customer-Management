import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="flex items-center justify-between mb-6">
        <NavLink to="/">
          <img
            alt="MongoDB logo"
            className="inline h-10"
            src="https://raw.githubusercontent.com/mongodb-developer/mern-stack-example/603144e25ba5549159d1962601337652a7bfa253/mern/client/src/assets/mongodb.svg"
          ></img>
        </NavLink>

        <NavLink
          className="inline-flex items-center justify-center px-3 font-medium transition-colors border rounded-md whitespace-nowrap text-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-slate-100 h-9"
          to="/create"
        >
          Create Employee
        </NavLink>
      </nav>
    </div>
  );
}

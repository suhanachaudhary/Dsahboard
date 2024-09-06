
import { Link } from "react-router-dom";
import './app.css';
function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent topNavbar">
        <div className="container-fluid navbardiv">

            <Link className="navbar-brand" to="/">Dashboard</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon mt-4"></span>
            </button>

            <div className="collapse navbar-collapse ms-auto link" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-auto position-right">

                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link active" to="/availability">Availability</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link active" to="/admin/login">Admin Dashboard</Link>
                </li>
    
            </ul>
        </div>
        </div>
    </nav>
    </div>
  )
}

export default Navbar

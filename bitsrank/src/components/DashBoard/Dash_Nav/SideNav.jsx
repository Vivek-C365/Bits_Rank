
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaughWink, faTachometerAlt, faBell, faSearch, faUser, faCogs, faList, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons'
import "../css/sb-admin-2.min.css"

const SideNav = () => {
  return (
    <div id="wrapper">
      {/* Sidebar */}
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        {/* Sidebar - Brand */}
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
          <div className="sidebar-brand-icon rotate-n-15">
            <FontAwesomeIcon icon={faLaughWink} />
          </div>
          <div className="sidebar-brand-text mx-3">Bits Rank</div>
        </a>

        {/* Divider */}
        <hr className="sidebar-divider my-0" />

        {/* Nav Item - Dashboard */}
        <li className="nav-item active">
          <a className="nav-link" href="index.html">
            <FontAwesomeIcon icon={faTachometerAlt} />
            <span>Dashboard</span>
          </a>
        </li>

        {/* Divider */}
        <hr className="sidebar-divider" />

        {/* Sidebar Toggler (Sidebar) */}
        <div className="text-center d-none d-md-inline">
          <button className="rounded-circle border-0" id="sidebarToggle"></button>
        </div>
      </ul>
      {/* End of Sidebar */}

      {/* Content Wrapper */}
      <div id="content-wrapper" className="d-flex flex-column">
        {/* Main Content */}
        <div id="content">
          {/* Topbar */}
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            {/* Sidebar Toggle (Topbar) */}
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
              <FontAwesomeIcon icon={faBars} />
            </button>

            {/* Topbar Search */}
            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
              <div className="input-group">
                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>
            </form>

            {/* Topbar Navbar */}
            <ul className="navbar-nav ml-auto">
              {/* Alerts */}
              <li className="nav-item dropdown no-arrow mx-1">
                <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <FontAwesomeIcon icon={faBell} />
                  <span className="badge badge-danger badge-counter">3+</span>
                </a>
              </li>

              <div className="topbar-divider d-none d-sm-block"></div>

              {/* User Information */}
              <li className="nav-item dropdown no-arrow">
                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
                  <img className="img-profile rounded-circle" src="img/undraw_profile.svg" alt="profile" />
                </a>
                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                  <a className="dropdown-item" href="#">
                    <FontAwesomeIcon icon={faUser} /> Profile
                  </a>
                  <a className="dropdown-item" href="#">
                    <FontAwesomeIcon icon={faCogs} /> Settings
                  </a>
                  <a className="dropdown-item" href="#">
                    <FontAwesomeIcon icon={faList} /> Activity Log
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </a>
                </div>
              </li>
            </ul>
          </nav>
          {/* End of Topbar */}
        </div>
        {/* End of Main Content */}
      </div>
      {/* End of Content Wrapper */}
    </div>
  )
}

export default SideNav

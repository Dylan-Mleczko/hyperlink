import './header.css';

export const Header = ({ isLoggedIn, userName }) => {
  return (
    <nav className="navbar navbar-expand-lg nav-bar p-0">
      <div className="container-fluid">
        <a className="navbar-brand fs-2">Hyper_Link</a>

        <div
          className="collapse navbar-collapse d-flex flex-row justify-content-end"
          id="navbarNav"
        >
          <nav className="navbar">
            <form className="container-fluid justify-content-start">
              {!isLoggedIn ? (
                <>
                  <a href="/login">
                    <button className="btn nav-button me-2" type="button">
                      Log in
                    </button>
                  </a>
                  <a href="/signup">
                    <button className="btn nav-button m-2" type="button">
                      Sign up
                    </button>
                  </a>
                </>
              ) : (
                <>
                  <div className="m-3 fs-5">Hi, {userName}!</div>
                  <a href="/">
                    <button className="btn nav-button m-2" type="button">
                      Log out
                    </button>
                  </a>
                </>
              )}
            </form>
          </nav>
        </div>
      </div>
    </nav>
  );
};

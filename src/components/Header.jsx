import './header.css';

function isLoggedIn() {
  return false;
}

export const Header = () => {
  const loggedIn = isLoggedIn();
  const userName = 'Lexi';

  return (
    <nav class="navbar navbar-expand-lg nav-bar p-0">
      <div class="container-fluid">
        <a class="navbar-brand fs-2">Hyper_Link</a>

        <div class="collapse navbar-collapse d-flex flex-row justify-content-end" id="navbarNav">
          <nav class="navbar">
            <form class="container-fluid justify-content-start">
              {loggedIn ? (
                <>
                  <a href="/login">
                    <button class="btn nav-button me-2" type="button">
                      Log in
                    </button>
                  </a>
                  <a href="/signup">
                    <button class="btn nav-button m-2" type="button">
                      Sign up
                    </button>
                  </a>
                </>
              ) : (
                <>
                  <div className="m-3 fs-5">Hi, {userName}!</div>
                  <a href="/">
                    <button class="btn nav-button m-2" type="button">
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

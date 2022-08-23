import './header.css';

export const Header = () => {
  return (
    <nav class="navbar navbar-expand-lg nav-bar">
      <div class="container-fluid">
        <a class="navbar-brand fs-2">Hyper_Link</a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse d-flex flex-row justify-content-end" id="navbarNav">
          <nav class="navbar">
            <form class="container-fluid justify-content-start">
              <a href="/login">
                <button class="btn nav-button me-2" type="button">
                  Log in
                </button>
              </a>
              <a href="/signup">
                <button class="btn nav-button" type="button">
                  Sign up
                </button>
              </a>
            </form>
          </nav>
        </div>
      </div>
    </nav>
  );
};

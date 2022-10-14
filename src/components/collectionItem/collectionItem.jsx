import './styles.css';

export const CollectionItem = () => {
  return (
    <div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header header-style">
              <h1 class="modal-title text-white fs-5" id="exampleModalLabel">
                Website name
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">description of website</div>
            <div>
              <a href="#" data-bs-toggle="tooltip" title="Tooltip" className="modal-body">
                link to website
              </a>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <tr>
        <th>
          <button
            type="button"
            class="btn border-0"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <strong>Website Name</strong>
          </button>
        </th>
        <td>example</td>
        <td>example</td>
      </tr>
    </div>
  );
};

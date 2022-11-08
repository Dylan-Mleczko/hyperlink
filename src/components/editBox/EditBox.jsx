import './styles.css';

import React, { useState } from 'react';
import { EditLinkForm } from '../editLinkForm/EditLinkForm';
import { EditCollectionForm } from '../editCollectionForm/EditCollectionForm';
export const EditBox = ({ title, data, onUpdate, onDelete, isLink }) => {
  const [isEdit, setIsEdit] = useState(false);

  const EditOnclick = () => {
    setIsEdit(true);
  };

  const handleCancelUpdate = () => {
    setIsEdit(false);
  };

  const handleCloseBox = () => {
    setIsEdit(false);
  };

  const handleUpdate = async () => {
    await onUpdate();
    setIsEdit(false);
    document.getElementById('closeButton').click();
  };

  const handleDelete = () => {
    onDelete();
    setIsEdit(false);
    document.getElementById('closeButton').click();
  };

  return (
    <div>
      <button
        id="displayButton"
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        style={{ display: 'none' }}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {title}
              </h5>
            </div>

            {isEdit ? (
              <div className="modal-body">
                {isLink ? (
                  <EditLinkForm
                    data={data}
                    onCancel={handleCancelUpdate}
                    onSuccess={handleUpdate}
                  ></EditLinkForm>
                ) : (
                  <EditCollectionForm
                    data={data}
                    onSuccess={handleUpdate}
                    onCancel={handleCancelUpdate}
                  ></EditCollectionForm>
                )}
              </div>
            ) : (
              <div className="modal-body">{data.description}</div>
            )}

            <div className="modal-footer" style={{ display: isEdit ? 'none' : 'block' }}>
              <button type="button" class="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
              <button type="button" class="btn btn-primary" onClick={EditOnclick}>
                Edit
              </button>
              <button
                id="closeButton"
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleCloseBox}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

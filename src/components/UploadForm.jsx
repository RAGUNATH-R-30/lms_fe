import React from "react";

function UploadForm() {
  return (
    <>
      <div className="container mt-4">
        {/* beginner card */}
        <div className="card mb-4">
          <div
            className="card-header"
            style={{ fontWeight: "bold", fontSize: 18 }}
          >
            Beginner Module
          </div>
          <div className="card-body">
            <div className="row">
              <div className="text-end">
                <button type="button" class="btn btn-primary">
                  Add Content
                </button>
              </div>
            </div>
            <input type="text" />
          </div>
        </div>
        {/* intermediate Card */}
        <div className="card mb-4">
          <div
            className="card-header"
            style={{ fontWeight: "bold", fontSize: 18 }}
          >
            Intermediate Module
          </div>
          <div className="card-body">
          <div className="row">
              <div className="text-end">
                <button type="button" class="btn btn-primary">
                Add Content
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Advanced Card */}
        <div className="card mb-4">
          <div
            className="card-header"
            style={{ fontWeight: "bold", fontSize: 18 }}
          >
            Advanced Module
          </div>
          <div className="card-body">
          <div className="row">
              <div className="text-end">
                <button type="button" class="btn btn-primary">
                Add Content
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadForm;

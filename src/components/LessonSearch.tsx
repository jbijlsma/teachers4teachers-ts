import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";

import { useAppSelector } from "../store/hooks";

export const LessonSearch = () => {
  const history = useHistory();
  const lessons = useAppSelector((state) => state.lessons.lessons);

  const [globalFilter, setGlobalFilter] = useState<any>(null);
  const toast = useRef<any>(null);
  const dt = useRef<any>(null);

  const editLessonHandler = (lesson: any) => {
    history.push(`/lessons/${lesson.id}`);
  };

  const uploadLessonHandler = () => {
    history.push("/lessons/upload");
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Upload lesson"
          icon="pi pi-plus"
          className="p-button-success mr-2 mb-2"
          onClick={uploadLessonHandler}
        />
      </React.Fragment>
    );
  };

  const titleBodyTemplate = (rowData: any) => {
    return (
      <>
        <span className="p-column-title">Title</span>
        {rowData.title}
      </>
    );
  };

  const imageBodyTemplate = (rowData: any) => {
    return (
      <>
        <span className="p-column-title">Image</span>
        <img
          src={`assets/demo/images/lessons/${rowData.image}`}
          alt={rowData.title}
          className="product-image"
        />
      </>
    );
  };

  const subjectBodyTemplate = (rowData: any) => {
    return (
      <>
        <span className="p-column-title">Subject</span>
        {rowData.subject}
      </>
    );
  };

  const ratingBodyTemplate = (rowData: any) => {
    return (
      <>
        <span className="p-column-title">Reviews</span>
        <Rating value={rowData.rating} readOnly cancel={false} />
      </>
    );
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editLessonHandler(rowData)}
        />
      </div>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="m-0">Manage Lessons</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.currentTarget.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <Toolbar className="mb-4" left={leftToolbarTemplate} />
          <DataTable
            ref={dt}
            value={lessons}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} lessons"
            globalFilter={globalFilter}
            emptyMessage="No lessons found."
            header={header}
          >
            <Column
              field="title"
              header="Title"
              sortable
              body={titleBodyTemplate}
            />
            <Column header="Image" body={imageBodyTemplate} />
            <Column
              field="subject"
              header="Subject"
              sortable
              body={subjectBodyTemplate}
            />
            <Column
              field="rating"
              header="Reviews"
              body={ratingBodyTemplate}
              sortable
            />
            <Column body={actionBodyTemplate} />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

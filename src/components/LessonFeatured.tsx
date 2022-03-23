import { useState } from "react";
import { useHistory } from "react-router-dom";
import { DataView, DataViewLayoutType } from "primereact/dataview";
import { Rating } from "primereact/rating";

import { useAppSelector } from "../store/hooks";

export const LessonFeatured = () => {
  const lessons = useAppSelector((state) => state.lessons.lessons);
  const featuresLessons = lessons.filter((lesson) => lesson.isFeatured);
  const [layout] = useState<DataViewLayoutType>("grid");
  const history = useHistory();

  const lessonCardClickedHandler = (lessonId: string) => {
    history.push(`/lessons/${lessonId}`);
  };

  const gridItem = (lesson: any) => {
    return (
      <div
        className="col-12 md:col-4"
        onClick={() => lessonCardClickedHandler(lesson.id)}
      >
        <div className="product-grid-item card">
          <div className="product-grid-item-top">
            <div>
              <i className="pi pi-tag product-category-icon" />
              <span className="product-category">{lesson.subject}</span>
            </div>
          </div>
          <div className="product-grid-item-content">
            <img
              src={`assets/demo/images/lessons/${lesson.image}`}
              alt={lesson.title}
            />
            <div className="product-name">{lesson.title}</div>
            <div className="product-description">{lesson.description}</div>
            <Rating value={lesson.rating} readOnly cancel={false} />
          </div>
          <div className="product-grid-item-bottom"></div>
        </div>
      </div>
    );
  };

  const itemTemplate = (data: any, _: string) => {
    if (!data) {
      return;
    }

    return gridItem(data);
  };

  return (
    <div className="grid list-demo">
      <div className="col-12">
        <div className="card">
          <h5>Featured Lessons</h5>
          <DataView
            value={featuresLessons}
            layout={layout}
            paginator
            rows={6}
            itemTemplate={itemTemplate}
          />
        </div>
      </div>
    </div>
  );
};

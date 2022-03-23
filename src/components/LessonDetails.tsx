import { useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import "./LessonDetails.css";

import { useAppSelector } from "../store/hooks";

export const LessonDetails = (props: RouteComponentProps<{ id: string }>) => {
  const history = useHistory();

  const email = useAppSelector((state) => state.session.email);
  const lessons = useAppSelector((state) => state.lessons.lessons);
  const [readonly, setReadonly] = useState(true);

  const lessonId = props.match.params.id;

  const [lesson, setLesson] = useState({
    id: 5,
    title: "",
    shortDescription: "",
    teacherInfo: "",
    image: "",
    subject: "Math",
    grade: "",
    mypLevel: "",
    link: "",
    authorEmail: email,
    rating: 0,
  });

  useEffect(() => {
    if (lessonId) {
      const lesson = lessons.find(
        (l) => l.id === parseInt(props.match.params.id)
      )!;
      setReadonly(lesson.authorEmail !== email);
      setLesson({
        ...lesson,
      });
    } else {
      setReadonly(false);
    }
  }, []);

  const subjects = ["English", "Math", "Physics"];

  const grades = ["6", "7", "8", "9", "10"];

  const mypLevels = ["Standard", "Extended"];

  const getPageTitle = () => {
    if (!lessonId) return "Upload lesson";

    const lesson = lessons.find(
      (l) => l.id === parseInt(props.match.params.id)
    )!;

    return lesson.authorEmail === email ? "Edit lesson" : "View lesson";
  };

  const onSubjectChange = (e: { value: string }) => {
    setLesson((prev) => {
      return {
        ...prev,
        subject: e.value,
      };
    });
  };

  const onGradeChange = (e: { value: string }) => {
    setLesson((prev) => {
      return {
        ...prev,
        grade: e.value,
      };
    });
  };

  const onMypLevelChange = (e: { value: string }) => {
    setLesson((prev) => {
      return {
        ...prev,
        mypLevel: e.value,
      };
    });
  };

  const goBack = () => {
    history.goBack();
  };

  const actionButtons = readonly ? (
    <div className="field col-12">
      <Button label="Back" onClick={() => goBack()} />
    </div>
  ) : (
    <div className="field col-12">
      <Button
        className="cancel-btn"
        label="Cancel"
        icon="pi pi-times"
        iconPos="right"
        onClick={() => goBack()}
      />
      <Button
        className="submit-btn"
        label="Submit"
        icon="pi pi-check"
        iconPos="right"
        onClick={() => goBack()}
      />
    </div>
  );

  return (
    <div className="col-12">
      <form>
        <div className="card">
          <h5>{getPageTitle()}</h5>
          <div className="p-fluid formgrid grid">
            <div className="field col-12 md:col-6">
              <div className="field col-12 md:col-12">
                <label htmlFor="title">Subject</label>
                <Dropdown
                  disabled={readonly}
                  options={subjects}
                  placeholder="Select a subject"
                  value={lesson.subject}
                  onChange={onSubjectChange}
                />
              </div>
              <div className="field col-12 md:col-12">
                <label htmlFor="title">Grade</label>
                <Dropdown
                  disabled={readonly}
                  options={grades}
                  placeholder="Select a grade"
                  value={lesson.grade}
                  onChange={onGradeChange}
                />
              </div>
              <div className="field col-12 md:col-12">
                <label htmlFor="title">MYP level</label>
                <Dropdown
                  disabled={readonly}
                  options={mypLevels}
                  placeholder="Select a MYP level"
                  value={lesson.mypLevel}
                  onChange={onMypLevelChange}
                />
              </div>
              <div className="field col-12 md:col-12">
                <label htmlFor="title">Title</label>
                <InputText
                  readOnly={readonly}
                  id="title"
                  type="text"
                  value={lesson.title}
                />
              </div>
            </div>
            <div className="field col-12 md:col-8">
              <div className="field col-12">
                <label htmlFor="shortDescription">Short Description</label>
                <InputTextarea
                  readOnly={true}
                  id="shortDescription"
                  rows={6}
                  value={lesson.shortDescription}
                />
              </div>
              <div className="field col-12">
                <label htmlFor="teacherInfo">Teacher Information</label>
                <InputTextarea readOnly={true} id="teacherInfo" rows={6} />
              </div>
            </div>
            <div className="field col-12 md:col-12">
              <div className="field col-12">
                <label htmlFor="title">Online link</label>
                <div className="flex overflow-hidden">
                  <div className="flex-grow-1 flex align-items-left justify-content-center">
                    <InputText
                      className="inline"
                      readOnly={true}
                      id="link"
                      type="text"
                      value={lesson.link}
                    />
                  </div>
                  <div className="flex-none flex align-items-left justify-content-center input-btn-container">
                    <Button
                      onClick={() =>
                        window.open(
                          lesson.link,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="field col-12 md:col-12"></div>
            <div className="field col-12 md:col-6">
              <div className="field col-12">
                <label htmlFor="title">Lesson image</label>
                <div className="flex overflow-hidden">
                  <div className="flex-grow-1 flex align-items-left justify-content-center">
                    <InputText
                      className="inline"
                      readOnly={readonly}
                      id="image"
                      type="text"
                      value={lesson.image}
                    />
                  </div>
                  <div className="flex-none flex align-items-left justify-content-center input-btn-container">
                    <FileUpload
                      className="inline"
                      mode="basic"
                      name="demo[]"
                      url="https://primefaces.org/primereact/showcase/upload.php"
                      accept="image/*"
                      maxFileSize={1000000}
                      disabled={readonly}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="field col-12 md:col-6"></div>
            <div className="field col-12 md:col-6">
              <div className="field col-12">
                <label htmlFor="title">Grading guidelines</label>
                <div className="flex overflow-hidden">
                  <div className="flex-grow-1 flex align-items-left justify-content-center">
                    <InputText
                      className="inline"
                      readOnly={readonly}
                      id="image"
                      type="text"
                      value={lesson.image}
                    />
                  </div>
                  <div className="flex-none flex align-items-left justify-content-center input-btn-container">
                    <FileUpload
                      className="inline"
                      mode="basic"
                      name="demo[]"
                      url="https://primefaces.org/primereact/showcase/upload.php"
                      accept="image/*"
                      maxFileSize={1000000}
                      disabled={readonly}
                    />
                  </div>
                </div>
              </div>
            </div>
            {actionButtons}
          </div>
        </div>
      </form>
    </div>
  );
};

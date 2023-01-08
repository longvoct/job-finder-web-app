import React, { Fragment } from "react";
import PropTypes from "prop-types";
import pdf from "../../assets/images/pdf.png";
import cloud from "../../assets/images/cloud-computing.png";

const FileUpload = (props) => {
  const {
    name,
    nameFile,
    className = "",
    progress = 0,
    file = "",
    handleDeleteImage = () => {},
    ...rest
  } = props;
  console.log(nameFile);
  return (
    <label
      className={`cursor-pointer flex items-center justify-center border border-dashed border-orange-500 w-full rounded-lg ${className} relative overflow-hidden group`}
    >
      <input
        type="file"
        name={name}
        className="hidden-input"
        accept="application/pdf"
        onChange={() => {}}
        {...rest}
      />
      {progress !== 0 && !file && (
        <div className="absolute z-10 w-5 h-5 border-4 border-[#fc7a78] rounded-full loading border-t-transparent animate-spin"></div>
      )}
      {!file && progress === 0 && (
        <div className="flex gap-x-2 items-center text-center pointer-events-none">
          <img src={cloud} alt="" className="w-5 h-5 object-cover" />
          <p className="font-semibold">Chọn file PDF</p>
        </div>
      )}
      {file && (
        <Fragment>
          {nameFile && (
            <div className="flex gap-x-2 items-center">
              <img src={pdf} alt="" className="w-5 h-5 object-cover" />
              <span>{nameFile}</span>
            </div>
          )}
          <button
            type="button"
            className="absolute z-10 flex items-center justify-center invisible w-10 h-10 backdrop-hue-rotate-180 text-red-500 transition-all bg-red-100 rounded-full opacity-0 cursor-pointer group-hover:opacity-100 group-hover:visible"
            onClick={handleDeleteImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </Fragment>
      )}
      {!file && (
        <div
          className="absolute bottom-0 left-0 w-5 h-1 transition-all bg-[#fc7a78] image-upload-progress"
          style={{
            width: `${Math.ceil(progress)}%`,
          }}
        ></div>
      )}
    </label>
  );
};
FileUpload.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  progress: PropTypes.number,
  file: PropTypes.string,
};
export default FileUpload;

import React, { useState } from "react";
import { useWatch } from "react-hook-form";
import useClickOutSide from "../../hooks/useClickOutSide";

const DropdownHook = ({
  control,
  setValue,
  name,
  data,
  dropdownLabel,
  className,
  width = "550px",
}) => {
  const { show, setShow, nodeRef } = useClickOutSide();
  useWatch({
    control,
    name: "",
    defaultValue: "",
  });

  const handleClickDropdownItem = (e) => {
    setValue(name, e.target.dataset.value);
    setShow(false);
    setLabel(e.target.textContent);
  };
  const [label, setLabel] = useState(dropdownLabel);
  return (
    <div className="relative mb-2" ref={nodeRef}>
      <div
        onClick={() => setShow(!show)}
        className={`p-5 rounded-lg  h-[56px] bg-[#fff] border border-solid flex items-center cursor-pointer ${className} ${
          show ? "border-[#7C73F8]" : ""
        }`}
        style={{ width: width }}
      >
        <span>{label}</span>
      </div>
      <div
        style={{ width: width }}
        className={`absolute top-[110%] left-0 p-2 border border-solid shadow-xl rounded-lg bg-[#fff] ${
          show ? "" : "opacity-0 invisible"
        }`}
      >
        {data.map((item) => (
          <div
            key={item.id}
            className="p-5 cursor-pointer h-[56px] flex items-center hover:bg-gray-100 hover:rounded-lg"
            onClick={handleClickDropdownItem}
            data-value={item.name}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownHook;

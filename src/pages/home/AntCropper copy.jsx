import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useState } from "react";

export default function AntCropper() {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const onChange = ({ fileList = [] }) => {
    console.log(fileList);
    if (fileList?.length > 0) {
      fileList?.forEach((item) => {
        const file = item.originFileObj;
        const preview = URL.createObjectURL(file);
        setFiles((prev) => [...prev, file]);
        setPreviews((prev) => [...prev, preview]);
      });
    }
  };

  console.log("files", files);
  console.log("previews", previews);

  return (
    <div>
      <ImgCrop showGrid rotationSlider aspectSlider showReset>
        <Upload
          fileList={files}
          onChange={onChange}
          beforeUpload={() => false}
          showUploadList={false}
          className=""
          multiple
        >
          + Add image
        </Upload>
      </ImgCrop>

      {/* <img src={previews} alt="" /> */}
    </div>
  );
}

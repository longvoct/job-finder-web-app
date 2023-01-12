import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FileUpload from "../components/file/FileUpload";
import useFirebaseFile from "../hooks/useFirebaseFile";
import { db } from "../firebase-app/firebase-config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addDoc,
  collection,
  doc,
  limit,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useAuth } from "../contexts/auth-context";

const UploadCV = () => {
  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({});
  const {
    file,
    setFile,
    progress,
    nameFile,
    setProgress,
    handleSelectFile,
    handleDeleteFile,
  } = useFirebaseFile({ setValue, getValues });
  const [updateIdUser, setUpdateIdUser] = useState("");
  const { userInfo } = useAuth();
  const docRef = collection(db, "users");

  useEffect(() => {
    const q = query(docRef, where("user_id", "==", `${userInfo.user_id}`));
    onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        setUpdateIdUser(doc.id);
      });
    });
  }, [docRef, userInfo]);

  const onSubmit = async (values) => {
    const colRefUpdate = doc(db, "users", updateIdUser);
    await updateDoc(colRefUpdate, {
      ...values,
      file: file,
    });
    toast.success("Lưu hồ sơ thành công!");
    setFile(null);
    setProgress(0);
  };

  return (
    <>
      <div className="w-full max-w-[1240px] mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-[30px] flex flex-col"
        >
          <span className="font-bold text-[18px]">
            Cách viết CV xin việc đúng chuẩn
          </span>
          <div className="mt-5 ">
            <span className="font-bold text-[16px]">
              Thông tin cá nhân trong CV
            </span>
            <p className="mt-3 tracking-normal leading-8">
              Do CV chỉ là một bản tóm tắt những thông tin cơ bản nhất của ứng
              viên nên ở phần giới thiệu bản thân trong CV, các ứng viên tuyệt
              đối không giới thiệu quá dài dòng. Bạn cần tóm tắt ngắn gọn các
              thông tin cơ bản về bản thân, bao gồm họ tên họ tên đầy đủ, ngày
              tháng năm sinh, địa chỉ mail thật chuyên nghiệp, cũng như một số
              điện thoại để tiện liên lạc là đủ.
            </p>
          </div>
          <div className="mt-5 ">
            <span className="font-bold text-[16px]">
              Mục tiêu nghề nghiệp trong CV
            </span>
            <p className="mt-3 tracking-normal leading-8">
              Mục tiêu nghề nghiệp hiểu đơn giản là đích đến sự nghiệp mà bạn
              hướng đến trong tương lai. Mục tiêu nghề nghiệp sẽ bao gồm cả mục
              tiêu ngắn hạn và mục tiêu dài hạn. Đối với phần mục tiêu nghề
              nghiệp, các ứng viên chỉ cần nêu rõ những dự định mà bạn muốn có
              trong tương lai. Đó có thể là kế hoạch ngắn hạn hoặc dài hạn. Bạn
              cần xác định rõ để biết bản thân cần làm gì để đạt được những mục
              tiêu này. Tuy nhiên, một cách viết mục tiêu nghề nghiệp trong CV
              mà các ứng viên cần phải chú ý đó là đừng đặt mục tiêu quá cao,
              điều đó sẽ khiến bạn cảm thấy áp lực nếu không đạt được mục tiêu
              này. Mục tiêu nghề nghiệp cũng không nên quá chung chung hay sao
              chép ở đâu đó vì nhà tuyển dụng sẽ không thấy được sự khác biệt
              giữa bạn và các ứng viên khác.
            </p>
          </div>
          <div className="mt-5 ">
            <span className="font-bold text-[16px]">
              Kinh nghiệm làm việc trong CV
            </span>
            <p className="mt-3 tracking-normal leading-8">
              Kinh nghiệm là việc là phần sẽ trình bày những công việc mà bạn đã
              từng làm trước đây. Một bí kíp với phần kinh nghiệm làm việc trong
              CV đó là bạn chỉ nên viết vào bản CV những công việc có liên quan
              tới vị trí mà bạn đang mong muốn ứng tuyển để có thể gây ấn tượng
              với nhà tuyển dụng. Khi trình bày kinh nghiệm làm việc bạn nên bắt
              đầu từ những công việc gần đây nhất trở về trước. Bao gồm các
              thông tin liên quan đến công ty, vị trí làm việc, thành thích hay
              giải thưởng nếu có. Nếu bạn đang là sinh viên và chưa hề có bất cứ
              kinh nghiệm, hãy đừng ngại ngần đưa những công việc làm thêm mà
              bạn đã từng trải qua, những công việc này sẽ giúp cho bạn học hỏi
              được thêm rất nhiều kĩ năng cũng như tăng cường bản lĩnh để đối
              đầu với những điều khó khăn hơn ở trong công việc sắp tới mà ứng
              viên đang mơ ước.
            </p>
          </div>
          <div className="mt-5 ">
            <span className="font-bold text-[16px]">
              Kỹ năng trong CV xin việc
            </span>
            <p className="mt-3 tracking-normal leading-8">
              Kỹ năng là khả năng vận dụng những kiến thức trong quá trình học
              tập và cuộc sống và công việc để ứng dụng và công việc nào đó mang
              tính chuyên môn cao. Đối với phần các kỹ năng trong CV, ứng viên
              chỉ nên đưa các kĩ năng có liên quan tới công việc như: kĩ năng
              giao tiếp; thuyết phục (đối với CV nhân viên kinh doanh) hoặc
              những kĩ năng đặc thù của công việc mà bạn có nhưng phù hợp với vị
              trí công việc ứng tuyển là đủ. Ví du: kĩ năng lập trình web, kĩ
              năng thiết kế (đối với CV xin việc IT)… Thông qua các kỹ năng mà
              bạn đưa vào CV nhà tuyển dụng sẽ xem xét và đánh giá trình độ của
              bạn có phù hợp với vị trí ứng tuyển hay không.
            </p>
          </div>
          <div className="mt-5 ">
            <span className="font-bold text-[16px]">
              Điểm mạnh, điểm yếu của bản thân trong CV
            </span>
            <p className="mt-3 tracking-normal leading-8">
              Với mục điểm mạnh điểm yếu trong CV, các ứng viên nên thành thật
              với các điểm yếu của bản thân, đừng ngại thừa nhận với nhà tuyển
              dụng không chỉ trên CV mà còn là ở cả trong vòng phỏng vấn. Ai
              cũng có điểm yếu của mình nhưng nếu bạn biết mình ở đâu và có cách
              khắc phục thì chuyện gì cũng sẽ thành công.
            </p>
          </div>
          <div className="mt-5 ">
            <span className="font-bold text-[16px]">
              Chứng chỉ và giải thưởng (nếu có)
            </span>
            <p className="mt-3 tracking-normal leading-8">
              Với phần này, các ứng viên chỉ cần nêu ra những chứng chỉ liên
              quan tới công việc như: chứng chỉ ngoại ngữ, thành tích trong
              những công việc chuyên môn là được. Ngoài ra, bạn có thể trình bày
              thêm một số thông tin khác như sở thích, tình trạng hôn nhân,
              trình độ học vấn… để nhà tuyển dụng có thể hiểu rõ hơn về bạn.
            </p>
          </div>
          <div className="mt-10 flex gap-x-5 items-center">
            <label htmlFor="" className="text-[#fc7a78] text-[20px] font-[600]">
              Tải CV của bạn lên
            </label>
            <FileUpload
              className="w-[200px] h-[50px]"
              onChange={handleSelectFile}
              progress={progress}
              file={file}
              nameFile={nameFile}
              handleDeleteImage={handleDeleteFile}
            ></FileUpload>
          </div>
          <button
            type="submit"
            className={`${
              !file && docRef ? "pointer-events-none bg-opacity-50" : ""
            } my-10 inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-[#fc7a78] rounded-lg w-[200px] h-[60px]`}
          >
            Lưu hồ sơ
          </button>
        </form>
      </div>
      <ToastContainer autoClose={1000} />
    </>
  );
};

export default UploadCV;

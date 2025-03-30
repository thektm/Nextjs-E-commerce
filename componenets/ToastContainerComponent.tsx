import { ToastContainer } from "react-toastify";

const ToastContainerComponent = () => {
  return (
    <ToastContainer
      className="translate-y-130 fixed z-40 transform md:left-1/2 md:-translate-x-1/2"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={true}
      theme="dark"
      pauseOnHover={false}
      closeOnClick
      pauseOnFocusLoss={false}
      rtl={false}
      draggable
    />
  );
};

export default ToastContainerComponent;

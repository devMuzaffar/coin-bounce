import { TailSpin } from "react-loader-spinner";

const Loader = ({ text }) => {
  return (
    <div className="h-[calc(100vh-200px)] w-full flex flex-col items-center justify-center gap-10">
      <div>
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#3861fb"
          ariaLabel="tail-spin-loading"
          radius="1"
        />
      </div>
      <h2 className="text-center text-lg">Loading {text}</h2>
    </div>
  );
};

export default Loader;

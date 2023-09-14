import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div
      style={{
        background:
          'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center',
      }}
      className="flex justify-center items-center h-screen "
    >
      <div className="shadow-lg border rounded-2xl p-8 flex flex-col items-center space-y-6 justify-center w-[300px] h-[450px] bg-gray-50 ">
        <p className="text-lg text-center ">OOPs! Your Payment was failed.</p>
        <Link to="/">
          <button className="bg-red-700 text-white px-3 py-2 transform transition duration-500 ease-in-out hover:scale-110 rounded-lg font-medium ">
            Try Again
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cancel;

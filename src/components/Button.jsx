const Button = ({ children, type, loading }) => {
  return (
    <button
      className={`bg-violet-600 text-white px-9 py-3 rounded-lg text-[15px] font-semibold hover:bg-violet-800 transition-all duration-200 ${
        loading && "opacity-60"
      }`}
      type={type ? type : "button"}
      disabled={loading}
    >
      {children}
    </button>
  );
};

export default Button;

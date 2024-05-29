const Spinner = () => {
  return (
    <div className="spinner">
      <div className="spinner__circle">
        <img
          src="/taylorHead.png" 
          alt="TayTay"
          className="animate-spin w-20 h-20 rounded-full"
        />
      </div>
    </div>
  );
};

export default Spinner;

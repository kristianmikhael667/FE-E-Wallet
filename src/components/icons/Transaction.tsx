const Transaction: React.FC<{ color?: string }> = ({ color = "#000000" }) => {
  return (
    <svg
      width="30px"
      height="30px"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style
          dangerouslySetInnerHTML={{
            __html: `.cls-1{fill:${color};}`,
          }}
        />
      </defs>
      <title />
      <path
        className="cls-1"
        d="M52,7H12a6,6,0,0,0-6,6V51a6,6,0,0,0,6,6H52a6,6,0,0,0,6-6V13A6,6,0,0,0,52,7Zm2,44a2,2,0,0,1-2,2H12a2,2,0,0,1-2-2V13a2,2,0,0,1,2-2H52a2,2,0,0,1,2,2Z"
      />
      <path
        className="cls-1"
        d="M45,29a2,2,0,0,0,0-4H22.83l2.58-2.59a2,2,0,0,0-2.82-2.82l-6,6a2,2,0,0,0-.44,2.18A2,2,0,0,0,18,29Z"
      />
      <path
        className="cls-1"
        d="M47,36H20a2,2,0,0,0,0,4H42.17l-2.58,2.59a2,2,0,1,0,2.82,2.82l6-6a2,2,0,0,0,.44-2.18A2,2,0,0,0,47,36Z"
      />
    </svg>
  );
};

export default Transaction;

import React from "react";

const DefaultCommunitiesIconLNNL = ({ fillcolor, height, community }) => {
  return (
    <svg
      viewBox='0 0 20 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{
        fill: fillcolor,
        height: `${height}px`,
        width: `${height}px`,
        borderRadius: "100%",
        background: "white",
        boxSizing: "border-box",
        marginRight: "4px",
        display: "flex",
      }}
      id={`comdefaulticon-${community?.id}lnnl`}
    >
      <path
        d='M8.56172 0.603796C10.8445 0.272499 13.1685 0.741262 15.1039 1.9094L9.54746 14.6633L9.24262 15.363H10.0058H11.3987H11.726L11.857 15.063L16.9592 3.3738C18.4665 4.91039 19.3628 6.90129 19.4855 9.00282C19.6212 11.3279 18.8003 13.6164 17.1884 15.3838C15.5758 17.1521 13.2972 18.2599 10.8323 18.4654C8.36712 18.6707 5.91787 17.9566 4.00278 16.4797C2.08845 15.0033 0.859835 12.8828 0.567444 10.5702C0.275103 8.25791 0.940188 5.92502 2.42863 4.06433C3.91784 2.20269 6.116 0.958728 8.56172 0.603796ZM12.1908 5.37638C12.0049 5.29251 11.8093 5.23113 11.6082 5.1935C11.341 5.1408 11.0687 5.11552 10.7961 5.11804C10.2143 5.10742 9.63651 5.21885 9.10364 5.4452L9.10355 5.44524C8.97153 5.50135 8.84346 5.56512 8.72003 5.63612V5.22461H8.22003H6.63069H6.13069V5.72461V12.8615V13.3615H6.63069H8.28998H8.78998V12.8615V8.75705H8.79005L8.78991 8.74854C8.78652 8.54958 8.84154 8.35191 8.95133 8.1775C9.06027 8.00872 9.21961 7.8691 9.41376 7.77801C9.65877 7.66572 9.92945 7.60925 10.2036 7.61419L10.2148 7.61439L10.2259 7.6141C10.5267 7.6061 10.8236 7.67146 11.0881 7.80262L11.5558 8.03457L11.7674 7.55728L12.4422 6.03471L12.6434 5.58068L12.1908 5.37638Z'
        fill={fillcolor}
        stroke={fillcolor}
      />
    </svg>
  );
};

export default DefaultCommunitiesIconLNNL;

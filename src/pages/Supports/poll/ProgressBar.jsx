const ProgressBar = (props) => {
    const { bgColor, completed } = props;
  
    const containerStyles = {
      height: 20,
      width: '80vw',
      backgroundColor: "#e0e0de",
      borderRadius: 50,
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: bgColor,
      borderRadius: 'inherit',
      textAlign: 'right'
    }
  
    const labelStyles = {
      padding: 5,
      color: 'white',
      fontWeight: 'bold',
      fontSize: "small"
    }
  
    return (
      <div style={containerStyles} className="suggestionBarContainer">
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${completed}%`}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;
  
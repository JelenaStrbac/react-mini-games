import background from "./images/background.jpg";
import Game from "./containers/Game";

const App = () => {
  return (
    <div className="App" style={styles.app}>
      <Game />
    </div>
  );
};

const styles = {
  app: {
    backgroundImage: `url("${background}")`,
    width: "100vw",
    height: "100vh",
    backgroundSize: "cover",
    display: "flex",
    // flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default App;

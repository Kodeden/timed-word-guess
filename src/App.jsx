import useGameSetup from "./hooks/use-game-setup";
import Layout from "./layout";
import { Game, Setup } from "./routes";

function App() {
  const [gameSetup, handleSubmit] = useGameSetup();

  return (
    <Layout>
      {gameSetup.word ? (
        <Game gameSettings={gameSetup} />
      ) : (
        <Setup handleSubmit={handleSubmit} />
      )}
    </Layout>
  );
}

export default App;

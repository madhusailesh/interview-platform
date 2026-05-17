import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

function Home() {
  const navigate = useNavigate();

  const createRoom = () => {
    const id = uuid();

    navigate(`/room/${id}`);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <button
        onClick={createRoom}
        className="bg-green-500 px-6 py-3 rounded-lg text-lg"
      >
        Create Interview Room
      </button>
    </div>
  );
}

export default Home;
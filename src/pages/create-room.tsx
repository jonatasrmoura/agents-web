import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type GetRoomsAPIResponse = Array<{
  id: string;
  name: string;
  description: string;
}>;

export function CreateRoom() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3333/rooms");
      const result: GetRoomsAPIResponse = await response.json();

      return result;
    },
  });

  return (
    <div>
      {isLoading && <p>Carregando...</p>}
      {/** biome-ignore lint/complexity/useOptionalChain: <explanation> */}
      <div className="flex flex-col gap-1">{data && data.map((room) => {
        return (
          <Link key={room.id} to={`/room/${room.id}`}>
            {room.name}
          </Link>
        );
      })}</div>

      <Link className="underline" to="/room">
        Acessar sala
      </Link>
    </div>
  );
}

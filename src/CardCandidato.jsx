import { BorderOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { Card } from "antd";

const CardCandidato = ({ item, idVote, onSelected }) => {
  return (
    <Card
      hoverable
      style={{
        width: 250,
        backgroundColor: idVote === item.id ? "#e5e5e5" : "",
        boxShadow: idVote === item.id ? "0 4px 12px  rgba(0, 0, 0, 0.5)" : "",
      }}
      cover={
        <img
          alt="example"
          src={
            item.img ||
            "https://media.istockphoto.com/id/1726213993/vector/default-avatar-profile-placeholder-abstract-vector-silhouette-element.jpg?s=612x612&w=0&k=20&c=nYlk0j076CBZ5xGCCaVXtISYGK2SzXRwuQBXPkfmMX4="
          }
          style={{
            height: 240,
            width: "100%",
            objectFit: "cover",
          }}
        />
      }
      className="text-center"
      onClick={() => onSelected(idVote === item.id ? null : item.id)}
    >
      <Card.Meta title={item.name} description={item.name_partido} />
      {idVote === item.id ? (
        <CheckSquareOutlined
          className="mt-8"
          style={{
            fontSize: "48px",
            color: "#52c41a", // verde más vibrante
          }}
        />
      ) : (
        <BorderOutlined
          className="mt-8"
          style={{
            fontSize: "48px",
            color: "#d9d9d9",
          }}
        />
      )}
    </Card>
  );
};
export default CardCandidato;

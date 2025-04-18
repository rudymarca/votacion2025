import { Card } from "antd";

const CardCandidato = ({ item }) => {
  return (
    <Card
      hoverable
      style={{
        width: 240,
        boxShadow: idVote === item.id ? "0 4px 12px  rgba(0, 0, 0, 0.5)" : "",
      }}
      actions={
        !verResultados
          ? []
          : [
              <h1 key={"porcentaje"}>
                {/* <EditOutlined key="edit" /> */}
                <span className="mr-2">
                  {infoResultado.items.find(
                    (item2) => parseInt(item2.candidato_id) === item.id
                  )
                    ? (
                        (infoResultado.items.find(
                          (item2) => parseInt(item2.candidato_id) === item.id
                        ).cantidad /
                          infoResultado.total) *
                        100
                      ).toFixed(1)
                    : 0}
                </span>
                % ,
              </h1>,
              <h1 key={"cantidad"}>
                {/* <EditOutlined key="edit" /> */}
                <span className="mr-2">
                  {infoResultado.items.find(
                    (item2) => parseInt(item2.candidato_id) === item.id
                  )
                    ? infoResultado.items.find(
                        (item2) => parseInt(item2.candidato_id) === item.id
                      ).cantidad
                    : 0}
                </span>
                Votos
              </h1>,
            ]
      }
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
      onClick={() => {
        setIdVote(idVote === item.id ? null : item.id);
      }}
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

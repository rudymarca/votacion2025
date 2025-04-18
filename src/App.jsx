import "./App.css";
import { Row, Col, Typography, Button, message, Layout } from "antd";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import CardCandidato from "./CardCandidato";
const { Header, Content, Footer } = Layout;

function App() {
  //? HOOKS
  const [messageApi, contextHolder] = message.useMessage();
  //? STATE
  const [idVote, setIdVote] = useState(null);
  const [candidatos, setCandidatos] = useState([]);
  const [submiting, setSubmiting] = useState(false);
  //? FUNCTION
  const onVotar = async () => {
    setSubmiting(true);
    const { error } = await supabase
      .from("votos")
      .insert([{ candidato_id: idVote }]);

    if (error) {
      console.error("Error al votar:", error.message);
      messageApi.open({
        type: "success",
        content: `Error al votar: ${error.message}`,
      });
      return;
    }
    messageApi.open({
      type: "success",
      content: "Se ha registrado el voto",
    });
    setSubmiting(false);
    setIdVote(null);
  };
  const getCantidatos = async () => {
    const { data, error } = await supabase
      .from("candidatos")
      .select("*")
      .order("orden", { ascending: true }); // o false si querés descendente

    if (error) {
      console.error("Error al obtener resultados:", error.message);
      return;
    }
    setCandidatos(data);
  };
  //? EFFECT
  useEffect(() => {
    getCantidatos();
  }, []);
  //? RENDER
  return (
    <>
      <div className="text-center mb-10">
        <Typography.Title level={2}>Votacion</Typography.Title>
      </div>

      <Row gutter={[8, 32]}>
        {candidatos.map((item) => (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={4}
            key={item.id}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <CardCandidato
              item={item}
              idVote={idVote}
              onSelected={(val) => setIdVote(val)}
            />
          </Col>
        ))}
      </Row>

      <Button
        type="primary"
        shape="round"
        size="large"
        onClick={onVotar}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
        }}
        disabled={idVote === null}
        loading={submiting}
      >
        Votar
      </Button>

      {contextHolder}
    </>
  );
}

export default App;

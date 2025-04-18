import {
  BorderOutlined,
  CheckSquareOutlined,
  EditOutlined,
  EllipsisOutlined,
  LoadingOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./App.css";
import {
  Card,
  Row,
  Col,
  Flex,
  Typography,
  FloatButton,
  Button,
  Modal,
  Result,
  Spin,
  message,
  Switch,
  Progress,
  Layout,
  theme,
  Breadcrumb,
  Menu,
} from "antd";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";
const { Header, Content, Footer } = Layout;

// votacion2025;

function App() {
  const [idVote, setIdVote] = useState(null);
  const [candidatos, setCandidatos] = useState([]);
  const [submiting, setSubmiting] = useState(false);
  const [verResultados, setVerResultados] = useState(false);
  const [infoResultado, setInfoResultado] = useState({ items: [], total: 0 });
  // const cantidatos = [
  //   {
  //     id: 1,
  //     nombre: "Jorge Tuto Quiroga",
  //     // img: "data:image/jpeg;base64,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",
  //     img: "https://www.eldia.com.bo/files/posts/2025-01-31/tuto-denuncia-que-intentan-inhabilitarlo-con-un-proceso-que-data-desde-hace-16-anos-31-01-2025.jpg",
  //   },
  //   {
  //     id: 2,
  //     nombre: "Samuel Doria Medina",
  //     img: "https://i0.wp.com/radiofides.com/es/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-07-at-15.01.00-scaled.jpeg?fit=2560%2C1706&ssl=1",
  //   },
  //   {
  //     id: 3,
  //     nombre: "Chi Hyun Chung",
  //     img: "https://vision360-s3.cdn.net.ar/s3i233/2024/09/vision360/images/98/88/988871_6605bf012ce49cdce79f549ae03d50ae590fcadab00abacc5caaf30b51e91ad3/md.webp",
  //   },
  //   {
  //     id: 4,
  //     nombre: "Manfred Reyes Villa",
  //     img: "data:image/jpeg;base64,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",
  //   },
  //   {
  //     id: 5,
  //     nombre: "Andrónico Rodríguez",
  //     img: "data:image/jpeg;base64,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",
  //   },
  //   {
  //     id: 6,
  //     nombre: "Jaime Dunn",
  //     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Jaime_Dunn.jpg/640px-Jaime_Dunn.jpg",
  //   },
  //   {
  //     id: 7,
  //     nombre: "No definido",
  //   },
  // ];
  const [messageApi, contextHolder] = message.useMessage();
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
    obtenerResultados();
  };
  const obtenerResultados = async () => {
    const { data, error } = await supabase.rpc("contar_votos");

    if (error) {
      console.error("Error al obtener resultados:", error.message);
      return;
    }

    let total = 0;
    data.forEach((item) => {
      total += item.cantidad;
    });
    setInfoResultado({ items: data, total });
  };
  const getCantidatos = async () => {
    const { data, error } = await supabase
      .from("candidatos")
      .select("*")
      .order("orden", { ascending: true }); // o false si querés descendente

    // const { data, error } = await supabase.select("contar_votos");

    if (error) {
      console.error("Error al obtener resultados:", error.message);
      return;
    }
    setCandidatos(data);
    let total = 0;
    data.forEach((item) => {
      total += item.cantidad;
    });
    setInfoResultado({ items: data, total });
  };
  useEffect(() => {
    getCantidatos();
    obtenerResultados();
  }, []);

  const headerStyle = {
    textAlign: "center",
    // color: "#fff",
    height: 64,
    paddingInline: 48,
    lineHeight: "64px",
    // backgroundColor: "#4096ff",
  };
  const contentStyle = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#0958d9",
  };
  const siderStyle = {
    textAlign: "center",
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#1677ff",
  };
  const footerStyle = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#4096ff",
  };
  const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    width: "calc(50% - 8px)",
    maxWidth: "calc(50% - 8px)",
  };
  // const items = Array.from({ length: 3 }).map((_, index) => ({
  //   key: String(index + 1),
  //   label: `nav ${index + 1}`,
  // }));
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Flex gap="middle" wrap>
      <Layout>
        <Content style={{ padding: "0 48px" }}>
          <div className="text-center">
            <Typography.Title className="my-10">
              Elecciones 2025
            </Typography.Title>
          </div>

          <div
            style={{
              // padding: 24,
              minHeight: 380,
            }}
          >
            <Row gutter={[8, 32]}>
              <Col span={24} className="text-center">
                <span className="float-right">
                  <Typography.Text className="mr-2">
                    Ver resultados
                  </Typography.Text>

                  <Switch
                    checked={verResultados}
                    onChange={(val) => {
                      setVerResultados(val);
                      if (val) {
                        obtenerResultados();
                      }
                    }}
                  />
                </span>
              </Col>

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
                  <Card
                    hoverable
                    style={{
                      width: 250,
                      boxShadow:
                        idVote === item.id
                          ? "0 4px 12px  rgba(0, 0, 0, 0.5)"
                          : "",
                    }}
                    actions={
                      !verResultados
                        ? []
                        : [
                            <h1 key={"porcentaje"}>
                              {/* <EditOutlined key="edit" /> */}
                              <span className="mr-2">
                                {infoResultado.items.find(
                                  (item2) =>
                                    parseInt(item2.candidato_id) === item.id
                                )
                                  ? (
                                      (infoResultado.items.find(
                                        (item2) =>
                                          parseInt(item2.candidato_id) ===
                                          item.id
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
                                  (item2) =>
                                    parseInt(item2.candidato_id) === item.id
                                )
                                  ? infoResultado.items.find(
                                      (item2) =>
                                        parseInt(item2.candidato_id) === item.id
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
                    <Card.Meta
                      title={item.name}
                      description={item.name_partido}
                    />
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
                </Col>
              ))}
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }} className="mt-8">
          Created by{" "}
          <a href="https://github.com/rudymarca" target="_blank">
            RM
          </a>
        </Footer>
      </Layout>

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
    </Flex>
  );
}

export default App;

import {
  Avatar,
  Button,
  Col,
  List,
  Progress,
  Row,
  Skeleton,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { ReloadOutlined } from "@ant-design/icons";

const Resultados = () => {
  //? HOOKS
  //? STATE
  const [loading, setLoading] = useState([]);
  const [candidatos, setCandidatos] = useState([]);
  //? FUNCTION
  const cargarCandidatosConResultados = async () => {
    setLoading(true);
    try {
      // Hacer ambas peticiones al mismo tiempo
      const [
        { data: candidatos, error: errorCandidatos },
        { data: resultados, error: errorResultados },
      ] = await Promise.all([
        supabase
          .from("candidatos")
          .select("*")
          .order("orden", { ascending: true }),
        supabase.rpc("contar_votos"),
      ]);

      if (errorCandidatos || errorResultados) {
        console.error(
          "Error al obtener datos:",
          errorCandidatos || errorResultados
        );
        return;
      }

      // Combinar resultados: agregar la cantidad de votos a cada candidato
      let totales = 0;
      const candidatosConVotos = candidatos.map((candidato) => {
        const resultado = resultados.find(
          (r) => parseInt(r.candidato_id) === parseInt(candidato.id)
        );

        const votos = resultado ? resultado.cantidad : 0;
        totales += votos;
        return { ...candidato, votos };
      });

      candidatosConVotos.forEach((candidato) => {
        candidato.porcentaje = ((candidato.votos / totales) * 100).toFixed(0);
      });

      const candidatosOrdenados = candidatosConVotos.toSorted(
        (a, b) => b.votos - a.votos
      );

      setCandidatos(candidatosOrdenados);
    } catch (e) {
      console.error("Error inesperado al cargar datos:", e);
    } finally {
      setLoading(false);
    }
  };
  //? EFFECT
  useEffect(() => {
    cargarCandidatosConResultados();
  }, []);
  //? RENDER
  return (
    <>
      <div className="text-center">
        <Typography.Title level={2}>Resultados</Typography.Title>
        <Button
          icon={<ReloadOutlined />}
          onClick={() => cargarCandidatosConResultados()}
          size="large"
        >
          Actualizar
        </Button>
      </div>

      <Row className="mt-10" justify="center">
        <Col xs={24} sm={20} xl={14}>
          <List
            bordered
            className="bg-white"
            loading={loading}
            itemLayout="horizontal"
            dataSource={candidatos}
            size="large"
            renderItem={(item) => {
              return (
                <List.Item className="hover:bg-gray-100 transition duration-200 rounded-lg cursor-pointer">
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                      avatar={<Avatar src={item.img} />}
                      title={
                        <span className="text-sm sm:text-base">
                          {item.name}
                        </span>
                      }
                      description={
                        <span className="text-xs sm:text-sm">
                          {item.name_partido}
                        </span>
                      }
                    />
                    <div className="w-full sm:w-[300px]">
                      <Progress
                        percent={item.porcentaje}
                        size={[300, 10]}
                        style={{ width: "100%", maxWidth: 300 }}
                      />
                      <div className="text-xs text-gray-600">
                        {item.votos} Votos
                      </div>
                    </div>
                  </Skeleton>
                </List.Item>
              );
            }}
          />
        </Col>
      </Row>
    </>
  );
};
export default Resultados;

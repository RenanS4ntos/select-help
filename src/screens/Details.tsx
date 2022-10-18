import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { VStack, Text, HStack, useTheme, ScrollView, Box } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  CircleWavyCheck,
  Hourglass,
  DesktopTower,
  ClipboardText,
} from "phosphor-react-native";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { CardDetails } from "../components/CardDetails";
import { OrderProps } from "../interfaces";
import { API } from "../services/api";

type RouteParams = {
  order: OrderProps;
  projectId: string;
};

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
};

export function Details() {
  const [solution, setSolution] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();

  const { order, projectId } = route.params as RouteParams;

  if (isLoading) {
    return <Loading />;
  }

  const Submit = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = {
        solution: solution,
      };

      if (!solution) {
        Alert.alert(
          "Solicitação",
          "Informa a solução para encerrar a solicitação"
        );
      } else {
        await API().post(`/solicitation/${order.id}/solution`, data, {
          headers: { id_project: projectId },
        });
        navigation.goBack();
      }
    } catch (err) {
      Alert.alert("Erro", "Ocorreu um erro ao criar a solução!");
    } finally {
      setIsLoading(false);
    }
  }, [solution]);

  return (
    <VStack flex={1} bg="gray.700">
      <Box px={6} bg="gray.600">
        <Header title="Solicitação" />
      </Box>

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}

        <Text
          fontSize="sm"
          color={order.status ? colors.green[300] : colors.secondary[700]}
          ml={2}
          textTransform="uppercase"
        >
          {order.status ? "finalizado" : "em andamento"}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="title"
          description={`${order.name}`}
          icon={DesktopTower}
        />

        <CardDetails
          title="descrição do problema"
          description={order.description}
          icon={ClipboardText}
          footer={`Registrado em ${
            order.solution_date ? order.solution_date : ""
          }`}
        />

        <CardDetails
          title="solução"
          icon={CircleWavyCheck}
          description={order.solution}
          footer={`Encerrado em ${
            order.solution_date ? order.solution_date : ""
          }`}
        >
          {!order.status && (
            <Input
              placeholder="Descrição da solução"
              onChangeText={setSolution}
              textAlignVertical="top"
              multiline
              h={24}
            />
          )}
        </CardDetails>
      </ScrollView>

      {!order.status && (
        <Button title="Encerrar solicitação" m={5} onPress={Submit} />
      )}
    </VStack>
  );
}

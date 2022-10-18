import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  HStack,
  IconButton,
  VStack,
  useTheme,
  Text,
  Heading,
  FlatList,
  Center,
} from "native-base";
import { SignOut } from "phosphor-react-native";
import { ChatTeardropText } from "phosphor-react-native";

import Logo from "../assets/logo_secondary.svg";

import { Filter } from "../components/Filter";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
import { Order } from "../components/Order";
import { OrderProps } from "../interfaces";
import { useAuth } from "../hooks";
import axios from "axios";
import { API } from "../services/api";

export interface RouteParams {
  projectId: string;
}

export function Issues() {
  const route = useRoute();
  const { projectId } = route.params as RouteParams;
  const { handleLogout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">(
    "open"
  );
  const [orders, setOrders] = useState<OrderProps[]>([]);

  const navigation = useNavigation();
  const { colors } = useTheme();

  useEffect(() => {
    async function LoadData() {
      await API()
        .get(`/solicitation/${projectId}`)
        .then((response) => setOrders(response.data));
    }

    LoadData();
  }, [orders]);

  function handleNewOrder() {
    navigation.navigate("new", { projectId });
  }

  function handleOpenDetails(order: OrderProps) {
    navigation.navigate("details", { order, projectId });
  }

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={() => {
            handleLogout();
          }}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Solicitações</Heading>

          <Text color="gray.200">{orders.length}</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="em andamento"
            onPress={() => setStatusSelected("open")}
            isActive={statusSelected === "open"}
          />

          <Filter
            type="closed"
            title="finalizados"
            onPress={() => setStatusSelected("closed")}
            isActive={statusSelected === "closed"}
          />
        </HStack>
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Order data={item} onPress={() => handleOpenDetails(item)} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText color={colors.gray[300]} size={40} />
                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                  Você ainda não possui {"\n"}
                  chamados{" "}
                  {statusSelected === "open" ? "em andamento" : "finalizadas"}
                </Text>
              </Center>
            )}
          />
        )}

        <Button title="Nova solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}

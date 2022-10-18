import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
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
import { Loading } from "../components/Loading";
import { Order } from "../components/Order";
import { OrderProps, ProjectsProps } from "../interfaces";
import { ProjectItems } from "../components/ProjectItems";
import { useAuth } from "../hooks";
import axios from "axios";
import { Alert } from "react-native";
import { API } from "../services/api";

export function Projects() {
  const { handleLogout, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<ProjectsProps[]>([]);

  const navigation = useNavigation();
  const { colors } = useTheme();

  useEffect(() => {
    async function LoadData() {
      setIsLoading(true);
      await API()
        .get("/user", {
          headers: { email: user?.email },
        })
        .then((response) => {
          setProjects(response.data.projects);
        })
        .catch((err) => {
          Alert.alert("Erro", "Ocorreu um erro ao buscar os projetos.");
        })
        .finally(() => setIsLoading(false));
    }

    LoadData();
  }, []);

  function handleOpenDetails(projectId: string) {
    navigation.navigate("issues", { projectId });
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
          mb={5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Projetos da empresa</Heading>

          <Text color="gray.200">{projects.length}</Text>
        </HStack>

        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={projects}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProjectItems
                data={item}
                onPress={() => handleOpenDetails(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText color={colors.gray[300]} size={40} />
                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                  Não foi encontrado projetos {"\n"}
                  para esta empresa
                </Text>
              </Center>
            )}
          />
        )}
      </VStack>
    </VStack>
  );
}

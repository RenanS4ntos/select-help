import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { VStack } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { API } from "../services/api";
import { RouteParams } from "./Issues";
import { useAuth } from "../hooks";

export function Register() {
  const { user } = useAuth();
  const route = useRoute();

  const { projectId } = route.params as RouteParams;

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation();

  const Submit = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = {
        email: user?.email,
        name: title,
        description: description,
      };

      await API().post(`/solicitation/${projectId}`, data);
    } catch (err) {
      Alert.alert("Erro", "Ocorreu um erro ao criar a solicitação!");
    } finally {
      setIsLoading(false);
      navigation.goBack();
    }
  }, [user, title, description]);

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Solicitação" />

      <Input
        placeholder="Título da Solicitação"
        mt={4}
        onChangeText={setTitle}
      />

      <Input
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription}
      />

      <Button title="Cadastrar" mt={5} isLoading={isLoading} onPress={Submit} />
    </VStack>
  );
}

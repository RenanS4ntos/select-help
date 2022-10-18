import {
  Box,
  Circle,
  HStack,
  Text,
  useTheme,
  VStack,
  Pressable,
  IPressableProps,
} from "native-base";
import {
  ClockAfternoon,
  Hourglass,
  CircleWavyCheck,
} from "phosphor-react-native";
import { ProjectsProps } from "../interfaces";

type Props = IPressableProps & {
  data: ProjectsProps;
};

export function ProjectItems({ data, ...rest }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable {...rest}>
      <HStack
        bg="gray.600"
        mb={4}
        alignItems="center"
        justifyContent="space-between"
        rounded="sm"
        overflow="hidden"
      >
        <Box h="full" w={2} bg={colors.primary[700]} />

        <VStack flex={1} my={5} ml={5} alignItems="center">
          <Text color="white" fontSize="md">
            {data?.name}
          </Text>
        </VStack>
      </HStack>
    </Pressable>
  );
}

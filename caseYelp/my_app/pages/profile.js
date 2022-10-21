import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    Badge,
    useColorModeValue,
} from '@chakra-ui/react';
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";

export default function SocialProfileWithImage() {
    return (
        <>
            <Header />
            <Flex flexDir='row' width='100%'>
                <Sidebar />
                <Center width='75%' margin={5} pos='sticky' bg='grey'>
                    <Box
                        maxW={'270px'}
                        w={'full'}
                        bg={useColorModeValue('white', 'gray.800')}
                        boxShadow={'2xl'}
                        rounded={'md'}
                        overflow={'hidden'}>
                        <Image
                            h={'120px'}
                            w={'full'}
                            src=
                            {'https://images.adsttc.com/media/images/5721/c139/e58e/ce5c/ad00/001a/large_jpg/CASE_ex_js_3256.jpg?1461829933'}
                            objectFit={'cover'}
                        />
                        <Flex justify={'center'} mt={-12}>
                            <Avatar
                                size={'xl'}
                                src={
                                    'https://media.istockphoto.com/vectors/user-avatar-profile-icon-black-vector-illustration-vector-id1209654046?s=612x612'
                                }
                                alt={'Author'}
                                css={{
                                    border: '2px solid white',
                                }}
                            />
                        </Flex>

                        <Box p={6}>
                            <Stack spacing={0} align={'center'} mb={5}>
                                <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                                    Yangheng Jizhe
                                </Heading>
                                <Text color={'gray.500'}>yxj432</Text>
                            </Stack>

                            <Stack direction={'row'} justify={'center'} spacing={6}>
                                <Stack spacing={0} align={'center'}>
                                    <Text fontWeight={600}>666k</Text>
                                    <Text fontSize={'sm'} color={'gray.500'}>
                                        reviews
                                    </Text>
                                </Stack>
                                <Stack spacing={0} align={'center'}>
                                    <Text fontWeight={600}>666k</Text>
                                    <Text fontSize={'sm'} color={'gray.500'}>
                                        photos
                                    </Text>
                                </Stack>
                            </Stack>

                            <Stack spacing={0} align={'center'} mb={5}>
                                <Heading fontSize={'m'} fontWeight={250} fontFamily={'body'}>
                                    joined Case Review since
                                </Heading>
                                <Text color={'gray.500'}>2019</Text>
                            </Stack>

                            <Stack spacing={0} align={'center'} mb={5}>
                                <Heading fontSize={'m'} fontWeight={250} fontFamily={'body'}>
                                    Your favorite is:
                                </Heading>
                                <Badge
                                    px={2}
                                    py={1}
                                    bg={useColorModeValue('gray.50', 'gray.800')}
                                    fontWeight={'400'}>
                                    #Mexican food
                                </Badge>
                            </Stack>



                            <Button
                                w={'full'}
                                mt={8}
                                bg={useColorModeValue('#151f21', 'gray.900')}
                                color={'white'}
                                rounded={'md'}
                                _hover={{
                                    transform: 'translateY(-2px)',
                                    boxShadow: 'lg',
                                }}>
                                Not your fav? Click to change.
                            </Button>
                        </Box>
                    </Box>
                </Center>
            </Flex>
        </>
    );
}
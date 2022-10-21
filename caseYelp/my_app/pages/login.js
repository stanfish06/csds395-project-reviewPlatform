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

export default function login_Page(){
    return(
        <div>
            <Header />
                <Flex flexDir='row' width='100%'>
                    <Sidebar />
                    <Box>
                        <label for="uname"><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" name="uname" required></input>

                        <label for="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="psw" required></input>
        
                        <Button type="submit">Login</Button>
                    </Box>
                </Flex>
        </div>
    )
}
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
    TextField
} from '@chakra-ui/react';
import Header from "../component/Header";

export default function login_Page(){
    return(
        <body style="background-image: url('../src/login-background.jpg');">
        <div>
            <Header />
                <Flex flexDir='row' width='100%'>
                    <Sidebar />
                    <Box sx={{  margin: auto,
                                width: '50%',
                                border: "3px solid green",
                                padding: '10%'}}>
                        <Text>Login</Text>
                        <label for="uname"><b>Username</b></label>
                        <TextField required
                                id="outlined-email"
                                label="Case Email"/>

                        <label for="psw"><b>Password</b></label>
                        <TextField id="outlined-password-input" label="Password" type="password" autoComplete="current-password"/>
        
                        <Button variant="contained" type="submit">Login</Button>
                    </Box>
                </Flex>
        </div>
        </body>
    )
}
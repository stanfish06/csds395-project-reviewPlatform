import { useRouter } from 'next/router'
import { Button, ButtonGroup, Flex } from '@chakra-ui/react'

export default function Login() {
  const router = useRouter()

  return (
    <>
      <Flex>
        <Button colorScheme='blue' onClick={() => router.push('/home')}>Login</Button>
      </Flex>
    </>
  )
}
import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Heading,
  Spinner,
  Center,
} from "@chakra-ui/react";
import axios from "axios";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/admin/users")
      .then(
        (response) => {
          setUsers(response.data.users);
          setLoading(false);
        },
        { withCredentials: true }
      )
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Box maxW="80vw" mx="auto" mt={8} p={4}>
      <Heading mb={6} textAlign="center">
        User Data
      </Heading>
      {loading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : (
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Email</Th>
                <Th>Name</Th>
                <Th>Department</Th>
                <Th>College</Th>
                <Th>Phone</Th>
                <Th>Year</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.department}</Td>
                  <Td>{user.college}</Td>
                  <Td>{user.phone}</Td>
                  <Td>{user.year}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default UsersTable;

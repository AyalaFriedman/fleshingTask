import { useEffect, useState } from "react";
import '../style/users.css';
import { getUsersList } from '../api/userService';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import { getPostFromApi } from "../api/userService";
import { useHistory } from "react-router-dom";

export default function Users() {

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const history = useHistory();
    const getUsersListFromApi = async () => {
        const usersFromApi = await getUsersList();
        return usersFromApi;
    }

    const filterByUserName = async (userNameInput) => {
        userNameInput = userNameInput.toLowerCase();
        let temp = [];
        users.forEach((user) => {
            let name = user.name.toLowerCase();
            if (name.includes(userNameInput)) {
                temp.push(user);
            }
        })
        setFilteredUsers(temp);
    }

    const filterByEmail = async (emailInput) => {
        emailInput = emailInput.toLowerCase();
        let temp = [];
        users.forEach((user) => {
            let email = user.email.toLowerCase();
            if (email.includes(emailInput)) {
                temp.push(user);
            }
        })
        setFilteredUsers(temp);
    }

    const getPost = async (userId) => {
        const posts = await getPostFromApi(userId);
        debugger
        history.push("/posts", { postsList: posts });
    }
    useEffect(() => {
        async function fetchUsers() {
            const list = await getUsersListFromApi();
            await setUsers(list);
            await setFilteredUsers(list);
        };
        fetchUsers();
    }, []);

    return (
        <div id="main">
            <div id="filters">
                <div className="A">
                    <TextField
                        className="A"
                        id="input-with-icon-textfield"
                        label="filter by userName"
                        onChange={(e) => filterByUserName(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }} /></div>{`                ${'   '} `}<div className="A">
                    <TextField
                        className="A"
                        id="input-with-icon-textfield"
                        label="filter by email"
                        onChange={(e) => filterByEmail(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            )
                        }} /></div>{`                ${'   '} `}
                <div className="A">
                    <Button variant="contained" size="large">
                        see the last posts
                    </Button>
                </div>

            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" options={{
                    filtering: true
                }}>
                    <TableHead>
                        <TableRow>
                            <TableCell className="tableCall">id</TableCell>
                            <TableCell className="tableCall" align="left">name</TableCell>
                            <TableCell className="tableCall" align="left">email&nbsp;</TableCell>
                            <TableCell className="tableCall" align="left">CompanyName&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.company.name}</TableCell>
                                <TableCell align="right"><button onClick={() => getPost(row.id)}>get posts</button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import '../style/dialog.css';
import TitleIcon from '@mui/icons-material/Title';


export default function PostsForOneUser() {

    const history = useHistory();
    const [postsList, setPostsList] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0);
    const [body, setBody] = useState("");
    const [title, setTitle] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const list = history.location.state.postsList;
        setPostsList(list);
        setUserId(list[0].userId);
    }, [])

    useEffect(() => {
        console.log(postsList, id, body, title);
    }, [postsList, id, body, title])

    

    const handleClickToOpen = () => {
        setOpen(true);
    };

    const handleToClose = () => {
        setOpen(false);
        let post = {
            id : id,
            body : body,
            title : title,
            userId, userId
        }
        debugger;
        let listToAdd = postsList;
        listToAdd.push(post);
        setPostsList(listToAdd);
    };

    return (
        <div>
            <div id="filters">
                <div className="A">
                    <Button variant="outlined" color="primary"
                        onClick={handleClickToOpen}>
                        create new post
                    </Button>
                    <dialog open={open} onClose={handleToClose}>
                        <TextField
                            id="input-with-icon-textfield"
                            label="id"
                            onChange={(e) => setId(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PlayArrowIcon />
                                    </InputAdornment>
                                ),
                            }} />
                        {'      '}
                        <TextField
                            id="input-with-icon-textfield"
                            label="body"
                            onChange={(e) => setBody(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <TextFormatIcon />
                                    </InputAdornment>
                                ),
                            }} />{'      '}
                        <TextField
                            id="input-with-icon-textfield"
                            label="title"
                            onChange={(e) => setTitle(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <TitleIcon />
                                    </InputAdornment>
                                ),
                            }} />
                        {"     "}

                        <Button onClick={handleToClose}
                            color="primary" autoFocus>
                            save
                        </Button>
                    </dialog>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" options={{
                    filtering: true
                }}>
                    <TableHead>
                        <TableRow>
                            <TableCell className="tableCall">id</TableCell>
                            <TableCell className="tableCall" align="left">title</TableCell>
                            <TableCell className="tableCall" align="left">body&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {postsList.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.title}</TableCell>
                                <TableCell align="right">{row.body}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
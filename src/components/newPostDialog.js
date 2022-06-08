import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import '../style/dialog.css';
import TitleIcon from '@mui/icons-material/Title';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {

    const { onClose, selectedValue, open, parentCallback } = props;
    const [id, setId] = useState(0);
    const [body, setBody] = useState("");
    const [title, setTitle] = useState("");

    const handleClose = (event) => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    const onTrigger = (event) => {
        handleClose();
        props.parentCallback(id, body, title);
        event.preventDefault();
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>create new post</DialogTitle>
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
            <Button variant="contained" size="large" onClick={onTrigger}>
                save
            </Button>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo(props) {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const onTrigger = (event, id, body, title) => {
        props.parentCallback(id, body, title);
        event.preventDefault();
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };
    const fromDialog = (event, id, body, title) => {
        onTrigger(event, id, body, title);
    }
    return (
        <div>
            <br />
            <Button variant="outlined" onClick={handleClickOpen}>
                create New post
            </Button>
            <SimpleDialog
                parentCallback={fromDialog}
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}

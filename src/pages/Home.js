import React, { useEffect, useState } from "react";
import api from "../services/api"
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import GitHubIcon from '@mui/icons-material/GitHub';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


import "./Home.css"

function Home() {
    const theme = createTheme();
    const [repos, setRepos] = useState([]);
    const [search, setSearch] = useState("");
    const [checked, setChecked] = React.useState(false)
    const [checked1, setChecked1] = React.useState(false)
    const [checked2, setChecked2] = React.useState(false)




    useEffect(() => {
        api.get("/users/DanielMinas/repos")
            .then((response) => setRepos(response.data));
    }, [])
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" id="appbar">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: 'black' }}
                        >
                            Repositórios do GitHub
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} >
                            <SearchIcon sx={{ color: 'black', mr: 1, my: 0.5 }} />
                            <TextField label="Pesquisar" variant="standard" onChange={(event) => {
                                setSearch(event.target.value);
                            }} />
                        </Box>


                    </Toolbar>
                </AppBar>
            </Box>


            <main>

                <Container sx={{ py: 3 }} maxWidth="md">
                    <Box id="filtro" xs={12} sm={6} md={6}
                    >  <Typography variant="h5" component="h3">
                            Filtros
                        </Typography>
                        <FormGroup>
                            <Typography>
                                Linguagens
                            </Typography>
                            <FormControlLabel control={<Switch id="check" checked={checked}
                                onChange={(event) => {
                                    setChecked(event.target.checked);
                                }} />} label="JavaScript" />
                            <FormControlLabel control={<Switch id="check" checked={checked1}
                                onChange={(event) => {
                                    setChecked1(event.target.checked);
                                }} />} label="Vue" />
                            <Typography>
                                Datas
                            </Typography>
                            <FormControlLabel control={<Switch id="check" checked={checked2}
                                onChange={(event) => {
                                    setChecked2(event.target.checked);
                                }} />} label="06-10-2021" />
                        </FormGroup>

                    </Box>

                    <Grid container spacing={1} sx={{ py: 1 }} >
                        {repos.filter((card) => {
                            if (checked2 === true) {
                                return card.updated_at === "2021-10-06T22:05:45Z"
                            } else {
                                return card
                            };
                        })
                            .filter((card) => {
                                if (checked1 === true) {
                                    return card.language === "Vue"
                                } else {
                                    return card
                                };
                            })
                            .filter((card) => {
                                if (checked === true) {
                                    return card.language === "JavaScript"
                                } else {
                                    return card
                                };
                            })
                            .filter((card) => {
                                if (search === "") {
                                    return card
                                } else if (card.name.toLowerCase().includes(search.toLowerCase())) {
                                    return card
                                } else if (card.language.toLowerCase().includes(search.toLowerCase())) {
                                    return card
                                } else if (card.owner.login.toLowerCase().includes(search.toLowerCase())) {
                                    return card
                                }
                                return false
                            }).map((card) => {
                                return <Grid item key={card.id} xs={12} sm={6} md={6}>

                                    <Card
                                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                        id="card"
                                    >

                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {card.name}
                                            </Typography>
                                            <Typography>
                                                Login: {card.owner.login}
                                            </Typography>
                                            <Typography>
                                                Linguagem: {card.language}
                                            </Typography>
                                            <Typography>
                                                Data Commit: {card.updated_at}
                                            </Typography>

                                        </CardContent>
                                        <Box sx={{ display: 'flex', }}>
                                            <CardActions>
                                                <Button variant="outlined" size="small" sx={{ borderRadius: 2 }} href={card.html_url} endIcon={<GitHubIcon />} >Repositório </Button>
                                            </CardActions>
                                        </Box>
                                    </Card>
                                </Grid>

                            })}
                    </Grid>

                </Container>


            </main>
        </ThemeProvider>
    );
}
export default Home;

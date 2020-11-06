import React, {useContext} from 'react';
import Container from '@material-ui/core/Container';
import AppLayout from "../component/AppLayout";
import {Box, Grid} from "@material-ui/core";
import ProjectCard from "../component/Cards/ProjectCard";
import {Project} from "../src/types/project";
import {AuthContext} from "../src/AuthContext";
import {useQuery} from "urql";



export default function Index() {
    const sampleData : Project[] = [
        {id: "123123", title: "Venture at Brown", color: "9, 175, 0"},
        {id: "12233", title: "Startup at Brown", color: "238, 96, 2"}
    ]

    const {authState} = useContext(AuthContext)



    return (<>
            <AppLayout title="My Projects">
                <Box pt={4}>
                    <Container maxWidth="xl">
                        <Grid container spacing={3}>
                            {sampleData.map(project => <Grid key={project.id} item xs={12} sm={6} md={4} xl={3}>
                                <ProjectCard project={project} />
                            </Grid>)}
                        </Grid>
                    </Container>
                </Box>
            </AppLayout>
        </>);
}

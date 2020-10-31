import {
    Box,
    Card,
    CardActions,
    CardContent, IconButton,
    LinearProgress, Link, Tooltip,
    Typography
} from "@material-ui/core";
import React, {useState} from "react";
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined'
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import {makeStyles} from "@material-ui/core/styles";
import {Project} from "../../src/types/project";
import RGBProgressBar from "../Feedback/RGBProgressBar";

interface Props {
    project: Project
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    bar: {
        colorPrimary: {
            background: '#00695C'
        }
    }
}));

const ProjectCard: React.FC<Props> = ({project}) => {
    const [isHovered, toggleHovered] = useState(false)
    const classes = useStyles({color: project.color})

    return <Card elevation={isHovered ? 4 : 1} onMouseEnter={() => toggleHovered(true)}
                 onMouseLeave={() => toggleHovered(false)}>
        <RGBProgressBar value={90} variant="determinate" hue={project.color}/>

        <CardContent>
            <Link variant="h5" component="h2" color="inherit" gutterBottom>
                {project.title}
            </Link>
            <Typography variant="body2" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque enim explicabo iusto.
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <Box marginRight="auto">
                <AvatarGroup max={4}>
                    <Avatar>H</Avatar>
                    <Avatar>H</Avatar>
                    <Avatar>H</Avatar>
                    <Avatar>H</Avatar>
                </AvatarGroup>
            </Box>
            <Tooltip title="Open chat">
                <IconButton>
                    <QuestionAnswerOutlinedIcon/>
                </IconButton>
            </Tooltip>
        </CardActions>
    </Card>


}

export default ProjectCard
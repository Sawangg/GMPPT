import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useSelector } from "react-redux";
import { selectUserName } from "../slice/UserSlice"

export default function Profile(){

    const user = useSelector(selectUserName);

    return(
            <Card className="center" style={{width : "30%"}}>
                <CardActionArea>
                    <CardMedia
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography align="center" gutterBottom variant="h5" component="h2">{user.name}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">Mot de passe : ****</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">Status : {user.isProf ? "professeur" : "étudiant"}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">Changer mot de passe</Button>
                </CardActions>
            </Card>
    );

}
import React from 'react'
import Table from '../../components/correction/TableConsulter'
import {makeStyles, Typography} from "@material-ui/core";

export default function Correction(){
    const useStyles = makeStyles((theme) => ({
        hr: {
            width: "80%",
            marginBottom: "2%"
        },
        divTable: {
            width: "90%",
            margin: "0 auto 2% auto",
            boxShadow : "0px 8px 20px -5px rgba(0,0,0,0.69)",
        }
    }));
    const classes = useStyles();

    return(
        <div>
            <Typography variant="h1">Correction</Typography>
            <hr className={classes.hr}/>
            <div className={classes.divTable}>
                <Table/>
            </div>
        </div>
    )

}
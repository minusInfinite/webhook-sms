import React from "react"
import Link from "@mui/material/Link"
import {Link as RouterLink} from "react-router-dom"

function NoRoute() {
    return (
        <>
        <div>
            <h1>Opps... </h1>
            <Link component={RouterLink} to="/">Go Home</Link>
        </div>
        </>
    )
}

export default NoRoute
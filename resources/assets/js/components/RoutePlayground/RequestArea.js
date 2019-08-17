import React, { Fragment, useState } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Button from "@material-ui/core/Button"

import Panel from "./Panel"
import ArgumentsList from "../ArgumentsList"
import { argumentsList as argumentsListPropTypes } from "../../utils/sharedPropTypes"

const useStyles = makeStyles(theme => ({
    wrapper: {
        margin: theme.spacing(2)
    },
    button: {
        margin: theme.spacing(1)
    }
}))

const TabPanel = ({ children, value, index }) =>
    value === index ? (
        <Box
            m={1}
            role="tabpanel"
            id={`request-tabpanel-${index}`}
            ria-labelledby={`request-tab-${index}`}
        >
            {children}
        </Box>
    ) : null
TabPanel.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired
}

function a11yProps(index) {
    return {
        id: `request-tab-${index}`,
        "aria-controls": `request-tabpanel-${index}`
    }
}

function RequestArea({
    onMakeRequest,
    onCancelRequest,
    isRequesting,
    parameters,
    queryStrings,
    headers,
    onEditArgument
}) {
    const classes = useStyles()
    const [currentTab, setCurrentTab] = useState(0)
    const handleChangeTab = (_, newValue) => setCurrentTab(newValue)

    const handleChangeParameter = e => onEditArgument("parameters", e)
    const handleChangeQuerystring = e => onEditArgument("queryStrings", e)
    const handleChangeHeader = e => onEditArgument("headers", e)

    return (
        <Panel
            title="Request"
            actions={
                <Fragment>
                    <Button
                        className={classes.button}
                        color="primary"
                        variant="outlined"
                        onClick={onMakeRequest}
                        disabled={isRequesting}
                    >
                        Make request
                    </Button>
                    <Button
                        className={classes.button}
                        color="secondary"
                        variant="outlined"
                        onClick={onCancelRequest}
                        disabled={!isRequesting}
                    >
                        Cancel request
                    </Button>
                </Fragment>
            }
        >
            <Tabs
                value={currentTab}
                onChange={handleChangeTab}
                aria-label="simple tabs example"
            >
                <Tab label="Body" {...a11yProps(0)} />
                <Tab label="Route parameters" {...a11yProps(1)} />
                <Tab label="Query string" {...a11yProps(2)} />
                <Tab label="Headers" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={currentTab} index={0}>
                Body
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
                <ArgumentsList
                    items={parameters}
                    onChangeValue={handleChangeParameter}
                    enabledAddArgument={false}
                />
            </TabPanel>
            <TabPanel value={currentTab} index={2}>
                <ArgumentsList
                    items={queryStrings}
                    onChangeValue={handleChangeQuerystring}
                />
            </TabPanel>
            <TabPanel value={currentTab} index={3}>
                <ArgumentsList
                    items={headers}
                    onChangeValue={handleChangeHeader}
                />
            </TabPanel>
        </Panel>
    )
}
RequestArea.propTypes = {
    onMakeRequest: PropTypes.func.isRequired,
    onCancelRequest: PropTypes.func.isRequired,
    isRequesting: PropTypes.bool.isRequired,
    parameters: argumentsListPropTypes.isRequired,
    queryStrings: argumentsListPropTypes.isRequired,
    headers: argumentsListPropTypes.isRequired,
    onEditArgument: PropTypes.func.isRequired
}

export default RequestArea
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import { useStyles } from '../hooks';
import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 400px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const ContentPaper = styled(Paper)`
  height: 100px;
  padding: 2em;
  overflow: auto;
`;

/*----------------------------------------TAB----------------------------------------*/
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
/*----------------------------------------TAB----------------------------------------*/

/*---------------------------------------TABLE---------------------------------------*/
function createData(name, subject, score) {
  return { name, subject, score };
}


/*---------------------------------------TABLE---------------------------------------*/

const Body = () => {
  const classes = useStyles();

  const { messages, addCardMessage, addRegularMessage, addErrorMessage } =
    useScoreCard();

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);

  const [queryType, setQueryType] = useState('name');
  const [queryString, setQueryString] = useState('');

  const [tabValue, setTabValue] = useState('ADD');

  const [allData, setAllData] = useState([]);
  const [addTableData, setAddTableData] = useState();
  const [queryData, setQuerylData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    // console.log(event.target.value,newValue)
    setTabValue(newValue);
  }

  const handleAdd = async () => {
    const {
      data: { message, card },
    } = await axios.post('/card', {
      name,
      subject,
      score,
    });

    if (!card) addErrorMessage(message);
    else {
      addCardMessage(message);
      setAddTableData(createData(name, subject, score));
    }
  };

  const handleQuery = async () => {
    const {
      data: { messages, message, querydata },
    } = await axios.get('/cards', {
      params: {
        type: queryType,
        queryString,
      }
    });

    if (!messages) addErrorMessage(message);
    else addRegularMessage(...messages);
    // console.log(querydata);
    setQuerylData(querydata);
  };

  const handleShowAll = async () => {
    console.log("show all")
    const {
      data: { alldata }
    } = await axios.get('/allcards', {});
    // console.log(messages);
    setAllData(alldata);
    addRegularMessage("show all")
  }

  return (
    <>
      <Wrapper >
        <Box style={{ width: '100%' }}>
          <Box style={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
              <Tab label="ALL" value={'ALL'} {...a11yProps(0)} onClick={handleShowAll} />
              <Tab label="ADD" value={'ADD'} {...a11yProps(1)} />
              <Tab label="QUERY" value={'QUERY'} {...a11yProps(2)} />
            </Tabs>
          </Box>
          {/*-------------------------------ALL VIEW-------------------------------*/}
          <TabPanel value={tabValue} index={'ALL'}>
            <Paper style={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer style={{ maxHeight: 294 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Subject</TableCell>
                      <TableCell>Score</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{ maxHeight: 440 }}>
                    {allData
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((data) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={data.name + data.subject} >
                            <TableCell component="th" scope="row">{data.name}</TableCell>
                            <TableCell >{data.subject}</TableCell>
                            <TableCell >{data.score}</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={allData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </TabPanel>
          {/*-----------------------------ALL VIEW END-----------------------------*/}
          {/*-------------------------------ADD VIEW-------------------------------*/}
          <TabPanel value={tabValue} index={'ADD'}>
            <Row>
              {/* Could use a form & a library for handling form data here such as Formik, but I don't really see the point... */}
              <TextField
                className={classes.input}
                placeholder="Name"
                value={name}
                onChange={handleChange(setName)}
              />
              <TextField
                className={classes.input}
                placeholder="Subject"
                style={{ width: 240 }}
                value={subject}
                onChange={handleChange(setSubject)}
              />
              <TextField
                className={classes.input}
                placeholder="Score"
                value={score}
                onChange={handleChange(setScore)}
                type="number"
              />
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                disabled={!name || !subject}
                onClick={handleAdd}
              >
                Add
              </Button>
            </Row>
            <TableContainer component={Paper}>
              <Table style={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    addTableData ?
                      <TableRow
                        hover role="checkbox" tabIndex={-1}
                        key={addTableData.name}
                        style={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{addTableData.name}</TableCell>
                        <TableCell>{addTableData.subject}</TableCell>
                        <TableCell>{addTableData.score}</TableCell>
                      </TableRow>
                      : <></>
                  }

                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/*-----------------------------ADD VIEW END-----------------------------*/}

          {/*------------------------------QUERY VIEW------------------------------*/}
          <TabPanel value={tabValue} index={'QUERY'}>
            <Row>
              <StyledFormControl>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    value={queryType}
                    onChange={handleChange(setQueryType)}
                  >
                    <FormControlLabel
                      value="name"
                      control={<Radio color="primary" />}
                      label="Name"
                    />
                    <FormControlLabel
                      value="subject"
                      control={<Radio color="primary" />}
                      label="Subject"
                    />
                  </RadioGroup>
                </FormControl>
              </StyledFormControl>
              <TextField
                placeholder="Query string..."
                value={queryString}
                onChange={handleChange(setQueryString)}
                style={{ flex: 1 }}
              />
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                disabled={!queryString}
                onClick={handleQuery}
              >
                Query
              </Button>
            </Row>
            <Paper style={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer style={{ maxHeight: 220 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Subject</TableCell>
                      <TableCell>Score</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{ maxHeight: 440 }}>
                    {queryData
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((data) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={data.name + data.subject} >
                            <TableCell component="th" scope="row">{data.name}</TableCell>
                            <TableCell >{data.subject}</TableCell>
                            <TableCell >{data.score}</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={queryData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </TabPanel>

          {/*----------------------------QUERY VIEW END----------------------------*/}
        </Box>
      </Wrapper>
      <ContentPaper variant="outlined">
        {messages.map((m, i) => (
          <Typography variant="body2" key={m + i} style={{ color: m.color }}>
            {m.message}
          </Typography>
        ))}
      </ContentPaper>
    </>

  );
};

export default Body;

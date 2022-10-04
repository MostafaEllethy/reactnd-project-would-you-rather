import { Box, Tabs, Tab, CardContent } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import {
  selectAnsweredQuestions,
  selectUnansweredQuestions,
} from "../features/question/questionSlice";
import QuestionsList from "../features/question/QuestionsList";

const Home = () => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newTab) => {
    setTab(newTab);
  };

  const questions = useSelector(
    tab === 0 ? selectUnansweredQuestions : selectAnsweredQuestions
  );

  return (
    <Fragment>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          aria-label="questions tab"
          variant="fullWidth"
        >
          <Tab
            icon={<QuestionAnswerIcon />}
            iconPosition="start"
            label="Unanswered Questions"
            aria-controls="unanswered questions tab"
          />
          <Tab
            label="Answered Questions"
            icon={<CheckCircleOutlineIcon />}
            iconPosition="start"
            aria-controls="answered questions tab"
          />
        </Tabs>
      </Box>
      <CardContent>
        <QuestionsList questions={questions} />
      </CardContent>
    </Fragment>
  );
};

export default Home;

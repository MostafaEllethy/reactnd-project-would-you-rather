import { Fragment, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Divider,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSnackBarText } from "../app/appSlice";
import { saveQuestion, selectSaving } from "../features/question/questionSlice";

const NewQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const saving = useSelector(selectSaving);
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!optionOneText || !optionTwoText) {
      dispatch(setSnackBarText("Please enter option text before submit!"));
      return;
    }
    dispatch(saveQuestion({ optionOneText, optionTwoText })).then(() =>
      navigate("/")
    );
  };

  return (
    <Fragment>
      <CardHeader
        component={() => (
          <Typography
            variant="h5"
            sx={{
              fontWeight: 500,
              textAlign: "center",
              paddingY: 1.25,
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: grey[50],
            }}
          >
            Create New Question
          </Typography>
        )}
      />
      <CardContent>
        <Typography sx={{ mb: 1 }}>Complete the question.</Typography>

        <Typography variant="h6" sx={{ mb: 1.5 }}>
          Would you rather ...
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            placeholder="Enter Option One Text Here"
            size="small"
            value={optionOneText}
            onChange={(e) => setOptionOneText(e.target.value)}
            disabled={saving}
            fullWidth
          />
          <Divider sx={{ my: 1.5, fontSize: "1em", fontWeight: "bold" }}>
            OR
          </Divider>
          <TextField
            placeholder="Enter Option Two Text Here"
            size="small"
            sx={{ mb: 2 }}
            value={optionTwoText}
            onChange={(e) => setOptionTwoText(e.target.value)}
            fullWidth
            disabled={saving}
          />
          <LoadingButton
            variant="contained"
            type="submit"
            loading={saving}
            fullWidth
          >
            Submit
          </LoadingButton>
        </form>
      </CardContent>
    </Fragment>
  );
};

export default NewQuestion;
